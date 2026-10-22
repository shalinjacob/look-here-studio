#!/usr/bin/env python3
"""Weekly site health check for www.lookherestudio.in (standard library only).

Crawls the live sitemap and checks what search engines and AI answer engines care about:
status codes, redirects, canonicals, noindex, titles / descriptions / one H1, structured
data, image alt text, broken internal links, robots.txt, llms.txt. Prints a short report;
exit code 1 when something needs attention. Run: python3 scripts/site-health.py
"""
import json, re, sys, urllib.error, urllib.request
from concurrent.futures import ThreadPoolExecutor

BASE = "https://www.lookherestudio.in"
UA = {"User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"}


class _NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


def fetch(url, follow=True):
    opener = urllib.request.build_opener() if follow else urllib.request.build_opener(_NoRedirect)
    try:
        r = opener.open(urllib.request.Request(url, headers=UA), timeout=30)
        return r.status, r.read().decode("utf8", "ignore"), r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, "", e.headers.get("Location", url)
    except Exception as e:  # network trouble
        return 0, str(e), url


def check_page(url):
    issues = []
    status, html, final = fetch(url)
    if status != 200:
        return [f"returns {status}"], ""
    if final.rstrip("/") != url.rstrip("/"):
        issues.append(f"redirects to {final}")
    canon = re.search(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"', html)
    if not canon:
        issues.append("no canonical tag")
    elif canon.group(1).rstrip("/") != url.rstrip("/"):
        issues.append(f"canonical points elsewhere: {canon.group(1)}")
    if re.search(r'<meta[^>]+name="robots"[^>]+noindex', html):
        issues.append("has noindex")
    title = re.search(r"<title[^>]*>([^<]*)</title>", html)
    if not title or not title.group(1).strip():
        issues.append("missing <title>")
    elif len(title.group(1)) > 80:
        issues.append(f"title long ({len(title.group(1))} chars; Google cuts off around 60-70)")
    desc = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', html)
    if not desc or len(desc.group(1).strip()) < 50:
        issues.append("meta description missing or very short")
    h1 = len(re.findall(r"<h1[\s>]", html))
    if h1 != 1:
        issues.append(f"{h1} H1 tags (want exactly 1)")
    path = url.replace(BASE, "")
    if (path.startswith("/objects/") or path.startswith("/journal/")) and 'application/ld+json' not in html:
        issues.append("no structured data (JSON-LD)")
    for block in re.findall(r'<script type="application/ld\\+json"[^>]*>(.*?)</script>', html, re.S):
        try:
            json.loads(block)
        except Exception:
            issues.append("JSON-LD block is not valid JSON")
    no_alt = len(re.findall(r"<img(?![^>]*\balt=)[^>]*>", html))
    if no_alt:
        issues.append(f"{no_alt} image(s) without alt text")
    return issues, html


def main():
    problems = []
    st, xml, _ = fetch(BASE + "/sitemap.xml")
    if st != 200:
        print(f"PROBLEM: sitemap.xml returns {st}")
        return 1
    urls = re.findall(r"<loc>([^<]+)</loc>", xml)
    print(f"Checked {len(urls)} sitemap URLs on {BASE}")

    pages = {}
    with ThreadPoolExecutor(max_workers=8) as ex:
        for url, (issues, html) in zip(urls, ex.map(check_page, urls)):
            pages[url] = html
            for i in issues:
                problems.append(f"{url.replace(BASE, '') or '/'}: {i}")

    # broken internal links found on the main hubs
    seen, broken = set(), []
    for hub in ["/", "/objects", "/gift-guide", "/journal", "/faq", "/size-guide"]:
        html = pages.get(BASE + hub) or fetch(BASE + hub)[1]
        for link in set(re.findall(r'href="(/[^"#?]*)"', html)):
            if link in seen or link.startswith(("/_next", "/api")):
                continue
            seen.add(link)
            s = fetch(BASE + link)[0]
            if s >= 400 or s == 0:
                broken.append(f"{link} ({s}) linked from {hub}")
    problems += [f"broken link: {b}" for b in broken]
    print(f"Followed {len(seen)} internal links from the main pages")

    # old removed URLs must still redirect, not 404
    for old, want in {
        "/collections": "/collections/editions",
        "/collections/festival-01": "/gift-guide",
        "/gift-promise": "/gift-guide",
        "/process": "/why-look-here",
    }.items():
        s, _, loc = fetch(BASE + old, follow=False)
        if s not in (301, 308) or want not in loc:
            problems.append(f"old URL {old} should redirect to {want} but returns {s} {loc}")

    for path in ["/robots.txt", "/llms.txt", "/feed.xml"]:
        s, body, _ = fetch(BASE + path)
        if s != 200 or len(body) < 100:
            problems.append(f"{path} returns {s} or is empty")
    if "Disallow: /" in fetch(BASE + "/robots.txt")[1].replace("Disallow: /api", "").replace("Disallow: /_next", "") and "Disallow: /\n" in fetch(BASE + "/robots.txt")[1]:
        problems.append("robots.txt blocks the whole site")

    # wording that must not come back (see CLAUDE-side rules: no free shipping, no Diwali, no wishlist-only)
    for path in ["/", "/objects", "/faq", "/shipping-returns", "/gift-guide"]:
        text = pages.get(BASE + path, "")
        for bad in [r"free shipping", r"shipped free", r"diwali", r"Gift Promise"]:
            if re.search(bad, text, re.I):
                problems.append(f"{path}: contains retired wording /{bad}/")

    if problems:
        print(f"\n{len(problems)} thing(s) need attention:")
        for p in problems:
            print(" -", p)
        return 1
    print("\nAll clear: status, canonicals, titles, descriptions, H1s, structured data, links and redirects look healthy.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
