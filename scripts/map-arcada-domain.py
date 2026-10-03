import json
import subprocess
import urllib.request

DOMAIN = "arcada.devoutshaman.com"
PROJECT = "devo-holding"
REGION = "us-west1"
SERVICE = "arcada-web"


def run(args):
    proc = subprocess.run(args, text=True, capture_output=True)
    return proc.returncode, proc.stdout, proc.stderr


def shorten(value):
    text = value if isinstance(value, str) else json.dumps(value, default=str)
    return text[:800]


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


def mapping_urls():
    return [
        "https://{region}-run.googleapis.com/apis/domains.cloudrun.com/v1/namespaces/{project}/domainmappings".format(
            region=REGION, project=PROJECT
        ),
        "https://run.googleapis.com/v1/projects/{project}/locations/{region}/domainmappings".format(
            project=PROJECT, region=REGION
        ),
    ]


def get_mapping(bearer):
    for base in mapping_urls():
        status, data = api("GET", base + "/" + DOMAIN, bearer=bearer)
        print("get", status, base.split(".com/")[-1][:80], shorten(data))
        if status == 200:
            return True
    return False


def create_mapping(bearer):
    body = {
        "apiVersion": "domains.cloudrun.com/v1",
        "kind": "DomainMapping",
        "metadata": {"name": DOMAIN, "namespace": PROJECT},
        "spec": {"routeName": SERVICE},
    }
    for url in mapping_urls():
        status, data = api("POST", url, body, bearer)
        print("create", status, url.split(".com/")[-1][:80], shorten(data))
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

    if get_mapping(bearer):
        print("MAPPING_READY existing")
        return

    if create_mapping(bearer) and get_mapping(bearer):
        print("MAPPING_READY")
        return

    raise SystemExit("domain mapping was not created")


if __name__ == "__main__":
    main()
