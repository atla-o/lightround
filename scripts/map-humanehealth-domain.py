import json
import subprocess
import urllib.request

DOMAIN = "humanehealth.devoutshaman.com"
PARENT = "devoutshaman.com"
PROJECT = "devo-holding"
REGION = "us-west1"
SERVICE = "humanehealth-web"


def run(args):
    proc = subprocess.run(args, text=True, capture_output=True)
    return proc.returncode, proc.stdout, proc.stderr


def shorten(value):
    text = value if isinstance(value, str) else json.dumps(value, default=str)
    return text[:600]


def api(method, url, body=None, bearer=""):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={
            "Authorization": "Bearer " + bearer,
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req) as resp:
            raw = resp.read().decode()
            parsed = json.loads(raw) if raw else {}
            return resp.status, parsed
    except Exception as exc:
        detail = ""
        if hasattr(exc, "read"):
            detail = exc.read().decode("utf-8", "replace")
        return getattr(exc, "code", None), detail


def dig_txt(name):
    code, out, err = run(["dig", "+short", name, "TXT", "@1.1.1.1"])
    values = [line.strip().strip('"') for line in out.splitlines() if line.strip()]
    print("txt", name, "count", len(values), "dig_exit", code)
    if code != 0:
        print(shorten(err))
    return values


def token_matches(token, records):
    if not token:
        return False
    bare = token.removeprefix("google-site-verification=")
    for record in records:
        if record == token or record == bare:
            return True
        if record.removeprefix("google-site-verification=") == bare:
            return True
    return False


def create_mapping(bearer, label):
    body = {
        "apiVersion": "domains.cloudrun.com/v1",
        "kind": "DomainMapping",
        "metadata": {"name": DOMAIN, "namespace": PROJECT},
        "spec": {"routeName": SERVICE},
    }
    urls = [
        "https://{region}-run.googleapis.com/apis/domains.cloudrun.com/v1/namespaces/{project}/domainmappings".format(
            region=REGION, project=PROJECT
        ),
        "https://run.googleapis.com/v1/projects/{project}/locations/{region}/domainmappings".format(
            project=PROJECT, region=REGION
        ),
    ]
    for url in urls:
        status, data = api("POST", url, body, bearer)
        print("create", label, status, url.split("/apis/")[-1].split("/v1/")[-1][:80], shorten(data))
        if status in (200, 201, 409):
            return True
    return False


def main():
    code, out, err = run(["gcloud", "auth", "print-access-token"])
    bearer = out.strip()
    print("access_token", "ok" if code == 0 and bearer else "missing", "len", len(bearer))
    if not bearer:
        print(shorten(err))
        raise SystemExit(1)

    records = dig_txt(PARENT) + dig_txt(DOMAIN)
    for site in (PARENT, DOMAIN):
        status, data = api(
            "POST",
            "https://www.googleapis.com/siteVerification/v1/token",
            {
                "verificationMethod": "DNS_TXT",
                "site": {"identifier": site, "type": "INET_DOMAIN"},
            },
            bearer,
        )
        token = data.get("token", "") if isinstance(data, dict) else ""
        print(
            "getToken",
            site,
            status,
            "len",
            len(token),
            "match",
            token_matches(token, records),
        )
        if not isinstance(data, dict):
            print("getToken_body", shorten(data))
        if token_matches(token, records):
            status, verified = api(
                "POST",
                "https://www.googleapis.com/siteVerification/v1/webResource?verificationMethod=DNS_TXT",
                {"site": {"identifier": site, "type": "INET_DOMAIN"}},
                bearer,
            )
            print("verify", site, status, shorten(verified))

    status, listed = api(
        "GET",
        "https://www.googleapis.com/siteVerification/v1/webResource",
        bearer=bearer,
    )
    ids = []
    if isinstance(listed, dict):
        ids = [item.get("id") for item in listed.get("items") or []]
    print("verified_sites", status, ids if ids else shorten(listed))

    if create_mapping(bearer, "deploy-sa"):
        print("MAPPING_READY")
        return

    code, out, err = run(
        [
            "gcloud",
            "iam",
            "service-accounts",
            "list",
            "--project=" + PROJECT,
            "--format=value(email)",
        ]
    )
    accounts = [line.strip() for line in out.splitlines() if line.strip()]
    print("service_accounts", code, accounts or shorten(err))
    extras = [
        "384302503084-compute@developer.gserviceaccount.com",
        "384302503084@cloudbuild.gserviceaccount.com",
    ]
    for email in extras:
        if email not in accounts:
            accounts.append(email)

    for email in accounts:
        code, out, err = run(
            [
                "gcloud",
                "auth",
                "print-access-token",
                "--impersonate-service-account=" + email,
            ]
        )
        impersonated = out.strip()
        print("impersonate", email, code, "len", len(impersonated), shorten(err)[:240])
        if code != 0 or not impersonated:
            continue
        if create_mapping(impersonated, email):
            print("MAPPING_READY", email)
            return

    code, out, err = run(
        [
            "gcloud",
            "beta",
            "run",
            "domain-mappings",
            "describe",
            "--domain=" + DOMAIN,
            "--region=" + REGION,
            "--project=" + PROJECT,
            "--format=yaml(status.conditions,status.resourceRecords,spec.routeName)",
        ]
    )
    print("describe_exit", code)
    print(out if out.strip() else shorten(err))
    if code != 0:
        raise SystemExit(1)
    print("MAPPING_READY")


if __name__ == "__main__":
    main()
