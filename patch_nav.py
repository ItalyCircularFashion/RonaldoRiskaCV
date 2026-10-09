import os
FIX = "/home/indigo/RonaldoRiskaCV-fix"
os.chdir(FIX)

def patch(fn, anchor, new_link):
    p = os.path.join(FIX, fn)
    t = open(p, encoding="utf-8").read()
    if "settore-tessile-abbigliamento" in t:
        print(fn, "-> already patched")
        return
    if anchor not in t:
        print(fn, "-> WARN anchor not found")
        return
    t = t.replace(anchor, anchor + new_link, 1)
    open(p, "w", encoding="utf-8").write(t)
    print("patched:", fn)

new_link = '<a class="sb-link" href="settore-tessile-abbigliamento.html"><span class="sb-icon" aria-hidden="true">◈</span> Settore Tessile</a>\n'

# index.html: anchor = "<span class=\"sb-icon\" aria-hidden=\"true\"></span> Home</a>\n<a class=\"sb-link\""
patch("index.html",
    '<span class="sb-icon" aria-hidden="true"></span> Home</a>',
    new_link)

# cad-moda.html, cad.html, forum.html, news.html, research.html
for fn in ["cad-moda.html", "cad.html", "forum.html", "news.html", "research.html"]:
    patch(fn,
        '<span class="sb-icon"></span> Home Platform</a>',
        new_link)

print("done")
