import os, re
FIX = "/home/indigo/RonaldoRiskaCV-fix"
os.chdir(FIX)

new_link = '<a class="sb-link" href="settore-tessile-abbigliamento.html"><span class="sb-icon" aria-hidden="true">◈</span> Settore Tessile</a>\n'

def patch(fn):
    p = os.path.join(FIX, fn)
    t = open(p, encoding="utf-8").read()
    if "settore-tessile-abbigliamento" in t:
        print(fn, "-> already patched"); return
    m = re.search(r'<a[^>]*>[^<]*Ciclo Tessile</a>', t)
    if not m:
        print(fn, "-> WARN no match"); return
    anchor = m.group(0)
    t2 = t.replace(anchor, new_link + anchor, 1)
    open(p, "w", encoding="utf-8").write(t2)
    print("patched:", fn)

for fn in ["index.html", "cad-moda.html", "cad.html", "forum.html", "news.html", "research.html"]:
    patch(fn)
print("done")
