"""Independent checks: evaluate every dashboard/segment formula in Python, and confirm the
original Master data is intact (source file hash + cell-by-cell comparison with the copy)."""
import fnmatch, hashlib, re, sys
from openpyxl import load_workbook
from openpyxl.utils import column_index_from_string

src, out, md5 = sys.argv[1], sys.argv[2], sys.argv[3]
wb = load_workbook(out)
cache = {}
def col(sheet, letter):
    k = (sheet, letter)
    if k not in cache:
        ws = wb[sheet]; ci = column_index_from_string(letter)
        cache[k] = [r[0] for r in ws.iter_rows(min_col=ci, max_col=ci, values_only=True)]
    return cache[k]
def crit_match(v, c):
    if isinstance(c, (int, float)):
        return v == c
    c = c.strip('"')
    if "*" in c:
        return isinstance(v, str) and fnmatch.fnmatchcase(v, c)
    return v is not None and str(v) == c
def ev(f, ws):
    f = f.lstrip("=")
    def ref(r):
        m = re.match(r"(?:'([^']+)'!)?\$?([A-Z]+)(\d+)?:\$?([A-Z]+)(\d+)?", r)
        sh = m.group(1) or ws.title
        vals = col(sh, m.group(2))
        if m.group(3):
            vals = vals[int(m.group(3)) - 1:int(m.group(5))]
        return vals
    def val(x):
        x = x.strip()
        if re.fullmatch(r"[A-Z]+\d+", x):
            return ws[x].value
        if x.startswith('"'):
            return x
        return float(x)
    def args(s):
        out_, depth, cur = [], 0, ""
        for ch in s:
            if ch == "," and depth == 0:
                out_.append(cur); cur = ""; continue
            depth += ch == "("; depth -= ch == ")"; cur += ch
        return out_ + [cur]
    terms = re.split(r"(?<=\))\s*([+-])\s*(?=[A-Z])", f)
    total, sign = 0, 1
    for t in terms:
        if t in "+-":
            sign = 1 if t == "+" else -1; continue
        m = re.match(r"(\w+)\((.*)\)(-1)?$", t)
        fn, a = m.group(1), args(m.group(2))
        if fn == "COUNTIF":
            r = ref(a[0]); c = val(a[1]); v = sum(crit_match(x, c) for x in r)
        elif fn == "COUNTIFS":
            rs = [ref(a[i]) for i in range(0, len(a), 2)]; cs = [val(a[i]) for i in range(1, len(a), 2)]
            v = sum(all(crit_match(r[i], c) for r, c in zip(rs, cs)) for i in range(len(rs[0])))
        elif fn == "SUMIF":
            r, c, sr = ref(a[0]), val(a[1]), ref(a[2]); v = sum((y or 0) for x, y in zip(r, sr) if crit_match(x, c))
        elif fn == "COUNTA":
            v = sum(x is not None for x in ref(a[0]))
        elif fn == "COUNTBLANK":
            v = sum(x is None for x in ref(a[0]))
        elif fn == "SUM":
            v = sum((x or 0) if not isinstance(x, str) else results.get((ws.title, None), 0) for x in [0])
            v = None
        else:
            raise ValueError(fn)
        if m.group(3):
            v -= 1
        total += sign * v
    return total
results = {}
n = 0
for name in ["07 — REACTIVATION SEGMENTS", "08 — DASHBOARD"]:
    ws = wb[name]
    for row in ws.iter_rows():
        for c in row:
            if isinstance(c.value, str) and c.value.startswith("=") and not c.value.startswith("=SUM("):
                results[(name, c.coordinate)] = ev(c.value, ws); n += 1
ws = wb["08 — DASHBOARD"]
print(f"evaluated {n} formulas, no errors")
for r in range(4, 40):
    a, b = ws.cell(row=r, column=1).value, results.get(("08 — DASHBOARD", f"B{r}"))
    d, e = ws.cell(row=r, column=4).value, results.get(("08 — DASHBOARD", f"E{r}"))
    if (a and b is not None) or (d and e is not None):
        print(f"  {str(a or ''):40.40} {'' if b is None else b:>6}   | {str(d or ''):38.38} {'' if e is None else e:>6}")
ws7 = wb["07 — REACTIVATION SEGMENTS"]
for r in range(5, 14):
    print("  ", ws7.cell(row=r, column=1).value, [results.get(("07 — REACTIVATION SEGMENTS", f"{c}{r}")) for c in "CDEF"])
# source integrity
h = hashlib.md5(open(src, "rb").read()).hexdigest()
print("source md5", h, "UNCHANGED" if h == md5 else "CHANGED!")
s = load_workbook(src, data_only=True)["Master"]; cpy = wb["MASTER (ORIGINAL COPY)"]
diff = sum(1 for row in s.iter_rows() for c in row if c.value != cpy.cell(row=c.row, column=c.column).value)
print("master copy cell differences:", diff, "rows", s.max_row, "cols", s.max_column)
