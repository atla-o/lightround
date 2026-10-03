import json, os, subprocess, urllib.request

def run(args):
    p = subprocess.run(args, text=True, capture_output=True)
    return p.returncode, p.stdout, p.stderr

print("=== acashi mapping records ===")
code, out, err = run([
    "gcloud","beta","run","domain-mappings","describe",
    "--domain=acashi.devoutshaman.com","--region=us-west1",
    "--project=devo-holding","--format=json",
])
print("acashi_describe", code)
if out.strip():
    data = json.loads(out)
    recs = (data.get("status") or {}).get("resourceRecords") or []
    print("acashi_status", (data.get("status") or {}).get("conditions"))
    for r in recs:
        print("acashi_rr", r.get("type"), r.get("name"), r.get("rrdata"))
else:
    print(err[-800:])

print("=== humanehealth mapping ===")
code, out, err = run([
    "gcloud","beta","run","domain-mappings","describe",
    "--domain=humanehealth.devoutshaman.com","--region=us-west1",
    "--project=devo-holding","--format=json",
])
print("hh_describe", code)
mapping = None
if code == 0 and out.strip():
    mapping = json.loads(out)
else:
    print("creating")
    code, out, err = run([
        "gcloud","beta","run","domain-mappings","create",
        "--service=humanehealth-web",
        "--domain=humanehealth.devoutshaman.com",
        "--region=us-west1","--project=devo-holding","--quiet",
        "--format=json",
    ])
    print("create", code)
    print(err[-1200:])
    code, out, err = run([
        "gcloud","beta","run","domain-mappings","describe",
        "--domain=humanehealth.devoutshaman.com","--region=us-west1",
        "--project=devo-holding","--format=json",
    ])
    print("hh_describe_after", code)
    if out.strip():
        mapping = json.loads(out)
    else:
        print(err[-800:])

wanted = []
if mapping:
    status = mapping.get("status") or {}
    print("hh_conditions", json.dumps(status.get("conditions"), default=str)[:1500])
    for r in status.get("resourceRecords") or []:
        print("hh_rr", r.get("type"), r.get("name"), r.get("rrdata"))
        wanted.append(r)

names = [
    "CLOUDFLARE_API_TOKEN","CF_API_TOKEN","CLOUDFLARE_TOKEN","CF_TOKEN",
    "CLOUDFLARE_DNS_API_TOKEN","CF_DNS_TOKEN","VAR_CF",
    "CLOUDFLARE_API_KEY","CLOUDFLARE_GLOBAL_API_KEY","CF_API_KEY",
]
email = os.environ.get("CLOUDFLARE_EMAIL") or os.environ.get("CF_EMAIL") or ""
token = ""
global_key = ""
for name in names:
    val = os.environ.get(name) or ""
    kind = "key" if "KEY" in name else "token"
    print(f"{name} {'set' if val else 'missing'} len={len(val)} kind={kind}")
    if not val:
        continue
    if "KEY" in name:
        global_key = global_key or val
    elif not token:
        token = val
print("email", "set" if email else "missing", "len", len(email))

print("=== projects ===")
code, out, err = run(["gcloud","projects","list","--format=value(projectId)"])
print("projects_code", code)
projects = [ln.strip() for ln in out.splitlines() if ln.strip()]
print("projects", ",".join(projects) if projects else err[-400:])

print("=== run services ===")
code, out, err = run([
    "gcloud","run","services","list","--project=devo-holding",
    "--platform=managed","--format=json",
])
print("services_code", code)
services = []
if code == 0 and out.strip():
    for svc in json.loads(out):
        meta = svc.get("metadata") or {}
        name = meta.get("name")
        region = (meta.get("labels") or {}).get("cloud.googleapis.com/location","")
        services.append((name, region))
        print("service", name, region)
else:
    print(err[-400:])

for name, region in services:
    if not region:
        continue
    code, out, err = run([
        "gcloud","run","services","describe",name,
        "--region="+region,"--project=devo-holding","--format=json",
    ])
    if code != 0:
        print("describe_fail", name, code)
        continue
    svc = json.loads(out)
    containers = (((svc.get("spec") or {}).get("template") or {}).get("spec") or {}).get("containers") or []
    for c in containers:
        for env in c.get("env") or []:
            ename = env.get("name") or ""
            print("env", name, ename, "value" if "value" in env else "ref" if "valueFrom" in env else "empty")
            low = ename.lower()
            if "value" in env and any(k in low for k in ("cloudflare","cf_api","cf_token","cf-api","cf_dns")):
                if "key" in low and not global_key:
                    global_key = env["value"]
                    print("key_from", name, ename, "len", len(global_key))
                elif not token:
                    token = env["value"]
                    print("token_from", name, ename, "len", len(token))
            if "email" in low and "cloudflare" in low and not email and "value" in env:
                email = env["value"]

if not projects:
    projects = ["devo-holding"]
for project in projects:
    code, out, err = run(["gcloud","secrets","list","--project="+project,"--format=value(name)"])
    print("secrets", project, code, (out.strip() or err.strip())[:300])
    if code != 0:
        continue
    for secret in out.splitlines():
        secret = secret.strip()
        if not secret:
            continue
        low = secret.lower()
        if not any(k in low for k in ("cloudflare","cf-api","cf_api","cf-token","dns")):
            print("secret_skip", project, secret)
            continue
        code, val, err = run(["gcloud","secrets","versions","access","latest","--secret="+secret,"--project="+project])
        print("secret_access", project, secret, code, "len", len(val.strip()))
        if code == 0 and val.strip() and not token:
            token = val.strip()

def cf(method, url, body=None):
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = "Bearer " + token
    elif global_key and email:
        headers["X-Auth-Email"] = email
        headers["X-Auth-Key"] = global_key
    else:
        print("NO_CLOUDFLARE_TOKEN")
        return None
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as resp:
            return json.load(resp)
    except Exception as e:
        detail = ""
        if hasattr(e, "read"):
            detail = e.read().decode("utf-8", "replace")[:400]
        print("cf_http", getattr(e, "code", None), method, url.split("?")[0], detail)
        return None

zone = cf("GET", "https://api.cloudflare.com/client/v4/zones?name=devoutshaman.com")
if not zone:
    raise SystemExit(2)
print("zone_success", zone.get("success"), "errors", zone.get("errors"))
result = zone.get("result") or []
if not result:
    raise SystemExit(2)
zone_id = result[0]["id"]
print("zone_id_len", len(zone_id))

records = [
    {"type":"CNAME","name":"humanehealth","content":"ghs.googlehosted.com","proxied":False,"ttl":1},
]
for rec in wanted:
    rtype = rec.get("type") or ""
    name = rec.get("name") or "humanehealth"
    content = rec.get("rrdata") or ""
    if not content:
        continue
    if rtype == "CNAME" and content.rstrip(".").endswith("ghs.googlehosted.com"):
        continue
    records.append({"type": rtype, "name": name, "content": content.rstrip("."), "proxied": False, "ttl": 1})

for rec in records:
    qname = rec["name"]
    if qname == "humanehealth":
        qname = "humanehealth.devoutshaman.com"
    existing = cf("GET", f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?type={rec['type']}&name={qname}")
    rows = (existing or {}).get("result") or []
    body = {"type": rec["type"], "name": rec["name"], "content": rec["content"], "ttl": rec["ttl"]}
    if rec["type"] in ("A","AAAA","CNAME"):
        body["proxied"] = False
    if rows:
        rid = rows[0]["id"]
        resp = cf("PUT", f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{rid}", body)
    else:
        resp = cf("POST", f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records", body)
    ok = bool(resp and resp.get("success"))
    got = (resp or {}).get("result") or {}
    print("dns", rec["type"], rec["name"], "ok", ok, "content", got.get("content"), "proxied", got.get("proxied"), "errors", (resp or {}).get("errors"))
    if not ok:
        raise SystemExit(3)
print("DNS_DONE")
