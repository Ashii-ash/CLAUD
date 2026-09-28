"""Crystal Arc - old online lead reactivation analysis.

Reads the MASTER sheet (read-only), classifies every company independently, scores reactivation
priority and writes a new workbook. The source workbook is never modified.

usage: python analyze.py <source.xlsx> <output.xlsx>
"""
import re
import sys
from collections import Counter, defaultdict
from datetime import datetime

import pandas as pd
from openpyxl import Workbook, load_workbook
from openpyxl.formatting.rule import FormulaRule
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

from company_kb import ALIASES, KB

TODAY = datetime(2026, 9, 28)
SRC, OUT = sys.argv[1], sys.argv[2]

FREEMAIL = {"gmail.com", "hotmail.com", "yahoo.com", "outlook.com", "icloud.com", "live.com", "hotmail.it",
            "yahoo.ca", "yahoo.co.in", "msn.com", "aol.com", "protonmail.com", "me.com", "ymail.com", "rediffmail.com"}
# group-wide domains shared by separate properties/brands - do not merge companies on these
SHARED_GROUP_DOMAINS = {"mohg.com", "accor.com"}
LEGAL = {"llc", "fze", "fzco", "fz", "fzc", "fzllc", "fzlle", "lle", "ltd", "limited", "plc", "inc", "spc", "co", "company",
         "est", "establishment", "sole", "proprietorship", "pvt", "sprl", "se", "gmbh", "ltda", "wll"}
TRAIL = {"group", "holding", "holdings", "international", "intl", "trading", "general", "gen", "tr", "uae", "dubai",
         "ksa", "of", "companies", "and", "llc"}
GENERIC_REQ = {"", "-", "enquiry", "inquiry", "quotation", "quotation submission", "rfq", "catalogue", "catalogue request",
               "need catalogue", "company portfolio", "company profile sharing", "office visit", "showroom visit",
               "design", "design preview", "meet up", "urgent call back", "price requirement", "costing enquiry",
               "preview of previous work done", "sample photo", "collaboration", "proposals", "intrested in some products",
               "needs best prices", "gift requirement", "gift ideas", "nan", "none"}
NEG_COMMENT = re.compile(r"fake|spam|looking for (a )?job|job seeker|\bcv\b|not (in )?our scope|out of scope|wrong number", re.I)
POS_COMMENT = re.compile(r"quot|price|sample|design|artwork|meeting|visit|approv|proposal|mail sent|mock|file|sizes|budget is|close", re.I)
SERIOUS_COMMENT = re.compile(r"sample|meeting|visit|artwork|approv|mock|design|future order|more \d+|good client", re.I)
QUOTE_COMMENT = re.compile(r"quot|price|proposal|gave price|our price|we gave", re.I)

GOV_RX = re.compile(r"ministry|authority|council|municipality|government|federal|embassy|consulate|police|courts?\b|"
                    r"\bgov\b|federation|armed forces|naval|executive office|department of", re.I)
INDUSTRY_RULES = [
    ("Government", GOV_RX),
    ("Gifting / Promotional Reseller", re.compile(r"gift|promotion|novelt|souvenir|trophy|trophies|award|crystal|merchandis|momento|memento", re.I)),
    ("Events & Exhibitions", re.compile(r"event|exhibition|conference|production|wedding|\bmice\b|activation|entertainment|balloon|celebrat", re.I)),
    ("Printing / Signage", re.compile(r"print|press\b|\bsigns?\b|signage|neon|laser|3d|acrylic|engrav", re.I)),
    ("Advertising / Marketing", re.compile(r"advertis|\badv\b|marketing|media|brand|creative|agency|\bpr\b|communicat|digital|graphic|design|studio|publicity|marcom", re.I)),
    ("Real Estate", re.compile(r"real ?estate|propert|realty|developer|development|broker|homes\b|estates?\b", re.I)),
    ("Education", re.compile(r"school|universit|academy|college|institute|education|learning|training|kids|lyc[eé]e", re.I)),
    ("Healthcare", re.compile(r"hospital|clinic|medical|health|pharma|dental|wellness|aesthetic|veterinary|medicine", re.I)),
    ("Sports", re.compile(r"sport|\bclub\b|padel|cricket|football|golf|fitness|\bgym\b|championship|racing|rally|belt|tennis|yacht club", re.I)),
    ("Food & Beverage", re.compile(r"restaurant|\bcafe\b|caf[eé]|food|dhaba|chocolate|snack|bakery|coffee|kitchen|pulses|vending|bar\b", re.I)),
    ("Hospitality / Hotels", re.compile(r"hotel|resort|hospitality", re.I)),
    ("Banking / Finance / Insurance", re.compile(r"\bbank|capital|financ|invest|insurance|markets|fintech|\bpay|wealth|asset|mortgage|funded", re.I)),
    ("Logistics / Shipping / Aviation", re.compile(r"shipping|logistic|freight|maritime|marine|\bport\b|aviation|aero|cargo|relocation|delivery|jet\b", re.I)),
    ("Tourism", re.compile(r"touris|travel|\btrip|vacation|tours", re.I)),
    ("Automotive", re.compile(r"motor|\bauto|\bcars?\b|vehicle|truck|detailing|spare parts", re.I)),
    ("Energy / Oil & Gas", re.compile(r"energy|petro|\boil\b|\bgas\b|solar|power|utilit|lubri", re.I)),
    ("Construction / Engineering", re.compile(r"contract|construct|scaffold|engineer|technical|electromech|interior|fit ?out|decorat|landscap|steel|metal|building|gabion|doors|irrigation|hardware|furnish", re.I)),
    ("Manufacturing / Industrial", re.compile(r"industr|factory|manufactur|packag|plastic|mills|equipment|machin", re.I)),
    ("Retail / Consumer / Luxury", re.compile(r"perfume|parfum|fashion|jewel|diamond|beauty|luxury|salon|\bspa\b|store|boutique|\boud|scent|watch|timepiece|aroma|shop|wear|home\b|flower|decor", re.I)),
    ("Technology", re.compile(r"tech|software|\bai\b|systems|cyber|\bapp\b|\bit\b|data|cloud|labs?\b|\bxr\b", re.I)),
    ("Associations / Non-profit", re.compile(r"association|foundation|society|network|chamber|\bngo\b|church|organi[sz]ation|community|toastmasters|council", re.I)),
    ("Professional Services", re.compile(r"consult|legal|\blaw\b|audit|account|management|services|\bhr\b|recruit|documents|corporate", re.I)),
    ("Trading / Distribution", re.compile(r"trading|traders|distribut|import|export|supplies|general trad", re.I)),
]
TRADE_INDUSTRIES = {"Gifting / Promotional Reseller", "Events & Exhibitions", "Printing / Signage", "Advertising / Marketing"}
RECURRING_INDUSTRIES = TRADE_INDUSTRIES | {"Sports", "Education", "Government", "Associations / Non-profit"}

TIER_NAME = {"A": "A — Major / High-Value", "B": "B — Strong / Established", "C": "C — Good Potential",
             "D": "D — Small / Limited Potential", "E": "E — Unclear / Needs Verification", "F": "F — Not Suitable / Low-Value"}
PRIO_NAME = {1: "🔥 Priority 1 — Reactivate First", 2: "🟠 Priority 2 — Reactivate", 3: "🟡 Priority 3 — Consider Later",
             4: "⚪ Priority 4 — Low Priority"}


# ------------------------------------------------------------------ helpers
def clean(v):
    if v is None or (isinstance(v, float) and pd.isna(v)):
        return ""
    s = str(v).replace("\xa0", " ").replace("‬", "").replace("‪", "").strip()
    return "" if s in {"-", "--", "nan", "NaN", "None", "N/A", "n/a", "NA"} else re.sub(r"\s+", " ", s)


def core_key(name):
    s = clean(name).lower().replace("&", " and ").replace("’", "'")
    s = re.sub(r"\bl\.?\s?l\.?\s?c\.?\b", " llc ", s)
    s = s.replace("middle east", " ")
    s = re.sub(r"[^a-z0-9\s]", "", s)
    toks = [t for t in s.split() if t not in LEGAL]
    if toks and toks[0] == "the" and len(toks) > 1:
        toks = toks[1:]
    toks = [t for i, t in enumerate(toks) if not (t in {"uae", "me"} and i > 0)]
    while len(toks) > 1 and toks[-1] in TRAIL:
        cand = toks[:-1]
        if len(cand) == 1 and cand[0] in TRAIL:
            break
        toks = cand
    k = " ".join(toks)
    return ALIASES.get(k, k)


def norm_phone(p):
    d = re.sub(r"\D", "", clean(p))
    if d.startswith("00"):
        d = d[2:]
    if len(d) == 10 and d.startswith("05"):
        d = "971" + d[1:]
    if len(d) == 9 and d.startswith("5"):
        d = "971" + d
    return d


def phone_valid(d):
    return 9 <= len(d) <= 15


EMAIL_RX = re.compile(r"^[\w.+'-]+@[\w-]+(\.[\w-]+)+$")


def num(v):
    try:
        f = float(str(v).replace(",", "").strip())
        return f if f > 0 else None
    except (TypeError, ValueError):
        return None


def age_bucket(days):
    if days is None:
        return "Unknown date"
    if days <= 91:
        return "0–3 months"
    if days <= 182:
        return "3–6 months"
    if days <= 365:
        return "6–12 months"
    if days <= 730:
        return "1–2 years"
    return "2+ years"


PRODUCT_FAMILIES = [
    ("Out of scope / other", re.compile(r"door|bottle|perfume bottle|powerbank|paper bag|stand\b|coffee table|dining|leather|jewel|repair|restor|rectif|sliding", re.I)),
    ("Medals / Coins / Pins", re.compile(r"medal|coin|pin\b|badge|batch", re.I)),
    ("Plaques / Shields", re.compile(r"plaque|shield|plate|frame|certificate", re.I)),
    ("3D Models / Sculptures / Bespoke pieces", re.compile(r"model|sculpt|replica|3d|globe|burj|figurine|chess|hour ?glass|sand ?timer|lamp|vase|bowl|cube|bukhoor|mabkhara", re.I)),
    ("Crystal / Custom Awards & Trophies", re.compile(r"crystal|custom|bespoke|glass|award", re.I)),
    ("Trophies (general)", re.compile(r"troph|tropi|trohp|cup", re.I)),
    ("Gifts / Mementos / VIP", re.compile(r"gift|memento|momento|souvenir|giveaway|give aways|hamper|vip|novelt|premium", re.I)),
    ("Boxes / Packaging", re.compile(r"box|packag|case|velvet", re.I)),
    ("Engraving / Printing service", re.compile(r"engrav|etch|laser|print|uv", re.I)),
    ("Catalogue / general enquiry", re.compile(r"catalog|enquiry|inquiry|quotation|rfq|portfolio|profile|visit|meet|call", re.I)),
]


def product_family(req):
    for fam, rx in PRODUCT_FAMILIES:
        if rx.search(req or ""):
            return fam
    return "Not recorded" if not req else "Other"


def industry_for(name, reqs):
    for ind, rx in INDUSTRY_RULES:
        if rx.search(name):
            return ind
    return "Other / Unclear"


# ------------------------------------------------------------------ load
raw = pd.read_excel(SRC, sheet_name="Master", dtype=object)
n_rows_sheet = len(raw)
blank_mask = raw.drop(columns=["Sr. No"]).isna().all(axis=1)
df = raw[~blank_mask].copy().reset_index(drop=True)
n_blank = int(blank_mask.sum())

ex = pd.read_excel(SRC, sheet_name="Exibition Leads", dtype=object)
exhibition_keys = {core_key(c): clean(ch) for c, ch in zip(ex["Company Name"], ex["Channel"]) if clean(c)}

L = []  # lead dicts
for i, r in df.iterrows():
    comp = clean(r["Company Name"])
    email = clean(r["Email ID"]).lower()
    email_ok = bool(EMAIL_RX.match(email)) if email else False
    dom = email.split("@")[1] if email_ok else ""
    ph_raw = clean(r["Client Phone number"])
    ph = norm_phone(ph_raw)
    date = r["Date of Enquiry (dd/mm/yy)"]
    date = date.to_pydatetime() if isinstance(date, pd.Timestamp) else (date if isinstance(date, datetime) else None)
    days = (TODAY - date).days if date else None
    status = clean(r["Status"]).title().replace("Not Our Scope", "Not our scope")
    big = clean(r["BIG Name"]).lower()
    esc = clean(r["Escalation"]).lower()
    if "decent" in big:
        existing = "Decent Name"
    elif "big" in big or "big name" in esc:
        existing = "Big Name"
    else:
        existing = "Not classified"
    L.append(dict(
        idx=i, sr=int(r["Sr. No"]) if pd.notna(r["Sr. No"]) else None, channel=clean(r["Channel"]), contact=clean(r["Client Name"]),
        company=comp, phone_raw=ph_raw, phone=ph, phone_ok=phone_valid(ph), email=email, email_raw=clean(r["Email ID"]),
        email_ok=email_ok, domain=dom, corp_domain=dom if dom and dom not in FREEMAIL else "", country=clean(r["Country"]),
        date=date, days=days, sales=clean(r["Sales Person Name"]), req=clean(r["Requirement"]), qty_raw=clean(r["Units (QTY)"]),
        qty=num(r["Units (QTY)"]), msg=clean(r["Message"]), status=status, value=num(r["Deal Value (AED)"]),
        lost=clean(r["Lost Reason"]), comments=clean(r["Management Comments"]), warm=clean(r["Warm or Cold"]),
        meeting=clean(r["Physical Meeting'"]), followup=clean(r["Last follow up"]), escalation=clean(r["Escalation"]),
        big_raw=clean(r["BIG Name"]), existing=existing, key=core_key(comp) if comp else "",
    ))

# ------------------------------------------------------------------ grouping (union-find)
parent = list(range(len(L)))


def find(x):
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x


basis = defaultdict(set)


def union(a, b, why):
    ra, rb = find(a), find(b)
    if ra != rb:
        parent[rb] = ra
    basis[a].add(why)
    basis[b].add(why)


def first_tok(k):
    return k.split()[0] if k else ""


by = defaultdict(list)
for l in L:
    if l["key"]:
        by[("name", l["key"])].append(l["idx"])
    if l["corp_domain"] and l["corp_domain"] not in SHARED_GROUP_DOMAINS:
        by[("domain", l["corp_domain"])].append(l["idx"])
    if l["email_ok"]:
        by[("email", l["email"])].append(l["idx"])
    if l["phone_ok"]:
        by[("phone", l["phone"])].append(l["idx"])
shared_phone_conflicts = []
for (kind, val), ids in by.items():
    if len(ids) < 2:
        continue
    for j in ids[1:]:
        a, b = L[ids[0]], L[j]
        if kind == "phone" and a["key"] and b["key"] and a["key"] != b["key"] and first_tok(a["key"]) != first_tok(b["key"]):
            shared_phone_conflicts.append((a["sr"], a["company"], b["sr"], b["company"], val))
            continue
        union(ids[0], j, {"name": "Same normalized name", "domain": "Same email domain", "email": "Same email",
                          "phone": "Same phone"}[kind])

groups = defaultdict(list)
for l in L:
    groups[find(l["idx"])].append(l)

# exact duplicate rows (all business fields identical)
sig = Counter()
for l in L:
    l["sig"] = (l["contact"].lower(), l["company"].lower(), l["phone"], l["email"], l["date"], l["req"].lower(), l["status"])
    sig[l["sig"]] += 1


# ------------------------------------------------------------------ lead-level enquiry quality
def lead_quality(l):
    txt = " ".join([l["comments"], l["lost"], l["status"]])
    if l["status"] != "Won" and (l["status"] == "Not our scope" or l["lost"] == "Out of scope" or NEG_COMMENT.search(l["comments"])):
        return "Low", True
    pts, info = 0, 0
    req = l["req"].lower()
    if req and req not in GENERIC_REQ:
        pts += 1; info += 1
        if re.search(r"custom|bespoke|3d|sculpt|model|vip|premium|crystal|replica|swarovski|led|engrav", req):
            pts += 1
    if l["qty"]:
        info += 1; pts += 1 + (l["qty"] >= 20) + (l["qty"] >= 100)
    if l["status"] == "Won":
        pts += 3; info += 1
    elif l["status"] in ("Quoted", "In Progress", "In Discussion"):
        pts += 2; info += 1
    if l["value"]:
        pts += 2 + (l["value"] >= 5000); info += 1
    if POS_COMMENT.search(l["comments"]):
        pts += 1; info += 1
    if l["meeting"].lower() == "yes":
        pts += 1
    if l["lost"] == "Ready Piece":
        pts -= 1
    if info == 0:
        return "Unknown", False
    return ("High" if pts >= 5 else "Medium" if pts >= 3 else "Low"), False


for l in L:
    l["family"] = product_family(l["req"])
    l["quality"], l["irrelevant"] = lead_quality(l)
    l["quote"] = "Yes" if (l["status"] in ("Quoted", "Won") or l["value"] or QUOTE_COMMENT.search(l["comments"])) else "No evidence"
    if l["status"] == "Won":
        l["serious"] = "Yes — ordered"
    elif l["status"] in ("Quoted", "In Progress", "In Discussion") or SERIOUS_COMMENT.search(l["comments"]) or l["meeting"].lower() == "yes":
        l["serious"] = "Yes"
    else:
        l["serious"] = "No evidence"
    l["followed"] = bool(l["comments"] or l["followup"] or l["lost"])
    has_co, has_ct = bool(l["company"]), bool(l["contact"])
    if has_co and has_ct and l["phone_ok"] and l["email_ok"]:
        l["cq"] = "Excellent"
    elif has_ct and l["phone_ok"] and (l["email_ok"] or has_co):
        l["cq"] = "Good"
    elif l["phone_ok"] or l["email_ok"]:
        l["cq"] = "Partial"
    else:
        l["cq"] = "Poor"

QRANK = {"High": 3, "Medium": 2, "Low": 1, "Unknown": 0}
CQRANK = {"Excellent": 3, "Good": 2, "Partial": 1, "Poor": 0}

# ------------------------------------------------------------------ company-level analysis
companies = []
for gi, (root, ls) in enumerate(sorted(groups.items(), key=lambda kv: min(x["idx"] for x in kv[1]))):
    ls.sort(key=lambda x: (x["date"] or datetime(1900, 1, 1)))
    named = [x["company"] for x in ls if x["company"]]
    name = Counter(named).most_common(1)[0][0] if named else ""
    keys = [x["key"] for x in ls if x["key"]]
    kb = None
    for k in [core_key(name)] + keys:
        if k in KB:
            kb = KB[k]; break
    reqs = [x["req"] for x in ls if x["req"]]
    n = len(ls)
    won = [x for x in ls if x["status"] == "Won"]
    won_val = sum(x["value"] or 0 for x in won)
    max_val = max([x["value"] or 0 for x in ls])
    max_qty = max([x["qty"] or 0 for x in ls])
    best_q = max(ls, key=lambda x: QRANK[x["quality"]])["quality"]
    all_irrel = all(x["irrelevant"] for x in ls)
    latest = ls[-1]
    days = min([x["days"] for x in ls if x["days"] is not None], default=None)
    best_contact = max(ls, key=lambda x: (CQRANK[x["cq"]], x["date"] or datetime(1900, 1, 1)))
    existing = "Big Name" if any(x["existing"] == "Big Name" for x in ls) else "Decent Name" if any(
        x["existing"] == "Decent Name" for x in ls) else "Not classified"
    quote = any(x["quote"] == "Yes" for x in ls)
    serious = any(x["serious"] != "No evidence" for x in ls)
    lost_reasons = sorted({x["lost"] for x in ls if x["lost"]})
    dom = next((x["corp_domain"] for x in ls if x["corp_domain"]), "")
    b = sorted(set().union(*[basis[x["idx"]] for x in ls])) if n > 1 else []
    in_exhibition = next((exhibition_keys[k] for k in set(keys) if k in exhibition_keys), "")

    # ---- tier
    if kb:
        tier, pgroup, gstatus, ind, ctype, evid, source, rstatus = kb
        conf = {"Web-verified": "High", "Desk-verified": "High", "Needs Verification": "Low"}[rstatus]
        if rstatus == "Needs Verification" and tier in "AB":
            conf = "Medium"
    else:
        pgroup, gstatus, source = "", "None identified", ""
        ind = industry_for(name, reqs) if name else "Individual / No company"
        rstatus = "Rule-based (not researched)"
        if not name:
            ctype = "Individual / No company recorded"
            strong = any((x["value"] or 0) >= 1000 or (x["qty"] or 0) >= 20 or x["status"] == "Quoted" for x in ls)
            tier = "E" if strong and not all_irrel else "F"
            evid = "No company name recorded" + ("; enquiry shows real order size - identify buyer" if tier == "E" else "")
            conf = "Medium"
        elif all_irrel:
            tier, ctype, evid, conf = "F", "Business", "All enquiries out of scope / not relevant / fake", "Medium"
        elif ind == "Government":
            tier, ctype, evid, conf = "B", "Government (by name)", "Name indicates a government / official body - entity size not verified", "Medium"
            rstatus = "Needs Verification"
        elif ind in TRADE_INDUSTRIES:
            ctype = "Trade buyer (agency / reseller)"
            proven = n >= 2 or won or max_val >= 3000
            tier = "C" if proven else "D"
            evid = ("Trade buyer with " + ("repeat enquiries/won orders" if proven else "single enquiry") +
                    " - typically small/medium agency; resells or buys for end clients")
            conf = "Medium"
        elif ind in ("Education", "Healthcare") and re.search(r"school|universit|college|hospital|academy", name, re.I):
            tier, ctype, evid, conf = "C", "Institution", "Named school/university/hospital - institutional buyer with annual award needs; size unverified", "Medium"
        elif re.search(r"restaurant|cafe|café|dhaba|salon|spa\b|barber|balloon|store|boutique|kids|gym|club|church|clinic", name, re.I):
            tier, ctype, evid, conf = "D", "Small business", "Small consumer-facing business by name", "Medium"
        else:
            tier, ctype, evid, conf = "E", "Business (unverified)", "Named business - scale not evidenced in data and not researched", "Low"
            rstatus = "Needs Verification"
        if dom and not kb:
            evid += f"; corporate email domain {dom}"
            source = dom

    # ---- score (documented in '12 — SCORING METHOD')
    s_company = {"A": 30, "B": 24, "C": 16, "D": 6, "E": 10, "F": 0}[tier]
    s_quality = {"High": 20, "Medium": 13, "Low": 5, "Unknown": 3}[best_q]
    s_engage = 15 if won else 10 if serious else 6 if quote else 3 if any(x["followed"] for x in ls) else 0
    if max_val >= 10000:
        s_value = 10
    elif max_val >= 3000:
        s_value = 7
    elif max_val > 0:
        s_value = 4
    elif max_qty >= 100:
        s_value = 7
    elif max_qty >= 20:
        s_value = 4
    elif any(re.search(r"custom|bespoke|vip|premium|sculpt|model|3d", r, re.I) for r in reqs):
        s_value = 3
    else:
        s_value = 1
    s_recency = 0 if days is None else 7 if days <= 91 else 10 if days <= 182 else 8 if days <= 365 else 5
    s_repeat = 10 if n >= 3 else 7 if n == 2 else 4 if (ind in RECURRING_INDUSTRIES or won) else 0
    s_contact = {"Excellent": 5, "Good": 4, "Partial": 2, "Poor": 0}[best_contact["cq"]]
    penalty = 0
    if lost_reasons and set(lost_reasons) <= {"No Budget", "Ready Piece"} and not won:
        penalty = 5
    insufficient = (not name and best_contact["cq"] == "Poor" and not reqs)
    score = None if insufficient else s_company + s_quality + s_engage + s_value + s_recency + s_repeat + s_contact - penalty
    if all_irrel and score is not None:
        score = min(score, 15)

    if score is None:
        prio = 4
    elif score >= 65:
        prio = 1
    elif score >= 48:
        prio = 2
    elif score >= 35:
        prio = 3
    else:
        prio = 4
    if tier == "F":
        prio = 4
    if tier == "E" and prio == 1 and not ((won and n >= 2) or won_val >= 5000):
        prio = 2  # unverified company: research before treating as a first-wave target
    if tier in "AB" and QRANK[best_q] >= 2 and prio > 2 and not all_irrel:
        prio = 2
    active = latest["status"] in ("In Progress", "Inquiry", "Quoted", "In Discussion") and (latest["days"] or 999) <= 45

    companies.append(dict(
        gid=f"CG-{gi + 1:04d}", name=name or f"(No company) {latest['contact'] or 'Unknown'}", norm=core_key(name) if name else "",
        leads=ls, n=n, tier=tier, pgroup=pgroup, gstatus=gstatus, ind=ind, ctype=ctype, evid=evid, source=source,
        rstatus=rstatus, conf=conf, existing=existing, best_q=best_q, won=len(won), won_val=won_val, max_val=max_val,
        max_qty=max_qty, quote=quote, serious=serious, lost=lost_reasons, days=days, latest=latest,
        first_date=ls[0]["date"], last_date=latest["date"], best_contact=best_contact, score=score, prio=prio,
        parts=(s_company, s_quality, s_engage, s_value, s_recency, s_repeat, s_contact, penalty), active=active,
        all_irrel=all_irrel, basis=b, dom=dom, reqs=reqs, in_exhibition=in_exhibition, insufficient=insufficient,
        sales=sorted({x["sales"] for x in ls if x["sales"]}), channels=sorted({x["channel"] for x in ls if x["channel"]}),
    ))


# ------------------------------------------------------------------ classification change, segment, reasons, approach
def change_text(c):
    new = TIER_NAME[c["tier"]]
    ex_ = c["existing"]
    if ex_ == "Big Name":
        kind = "Confirmed" if c["tier"] == "A" else "Partly confirmed (strong, not major)" if c["tier"] == "B" else \
            "Unverified — needs research" if c["tier"] == "E" else "Downgrade"
    elif ex_ == "Decent Name":
        kind = "Upgrade" if c["tier"] == "A" else "Confirmed" if c["tier"] in "BC" else "Unverified — needs research" if c["tier"] == "E" else "Downgrade"
    else:
        kind = "Upgrade — missed major company" if c["tier"] == "A" else "Upgrade — missed strong company" if c["tier"] == "B" else "New classification"
    return f"Existing: {ex_} → New: {new}", kind


def season_hook(reqs):
    t = " ".join(reqs).lower()
    hooks = []
    if re.search(r"ramadan|eid|iftar", t):
        hooks.append("Ramadan/Eid 2027 gifting (pitch by mid-Jan 2027)")
    if re.search(r"national day", t):
        hooks.append("UAE National Day (2 Dec) — pitch in October")
    if re.search(r"padel|golf|cricket|football|tennis|badminton|medal|sport|race|rally|chess|volley", t):
        hooks.append("sports season tournament trophies & medals")
    if re.search(r"award|trophy|trophies|plaque|shield|appreciation|service", t):
        hooks.append("year-end / annual awards (Q4–Q1)")
    if re.search(r"gift|vip|memento|momento|souvenir|giveaway|hamper|premium", t):
        hooks.append("corporate & VIP gifting catalogue")
    if re.search(r"box|packag|case", t):
        hooks.append("custom presentation boxes")
    if re.search(r"model|sculpt|3d|replica|globe|burj", t):
        hooks.append("bespoke 3D crystal models")
    return hooks[:2]


for c in companies:
    c["change"], c["change_kind"] = change_text(c)
    ls, t = c["leads"], c["tier"]
    trade = c["ctype"].startswith("Trade") or c["ind"] in TRADE_INDUSTRIES
    if c["prio"] == 4 or t == "F":
        seg = "S9 — Low priority / exclude"
    elif c["won"]:
        seg = "S1 — Past customers: repeat business"
    elif c["ind"] == "Government" or "Government" in c["ctype"] or c["ctype"] in ("Semi-Government", "Diplomatic"):
        seg = "S2 — Government & semi-government"
    elif t in "AB":
        seg = "S3 — Major / strong companies not yet converted"
    elif c["quote"] or c["serious"]:
        seg = "S4 — Quoted / serious interest, not closed"
    elif c["n"] >= 2:
        seg = "S5 — Repeat enquirers, never converted"
    elif trade:
        seg = "S6 — Trade buyers (agencies, printers, event cos, resellers)"
    elif "No Budget" in c["lost"]:
        seg = "S7 — Lost on budget: value-range offer"
    elif t == "E":
        seg = "S8 — Research before contacting"
    else:
        seg = "S8 — Research before contacting" if c["rstatus"] == "Needs Verification" else "S7 — Lost on budget: value-range offer" if c["lost"] else "S6 — Trade buyers (agencies, printers, event cos, resellers)" if trade else "S8 — Research before contacting"
    c["segment"] = seg

    # why reactivate
    why = []
    if t == "A":
        lab = {"Multinational": "multinational", "Major UAE brand": "UAE brand", "Government": "government entity",
               "Semi-Government": "semi-government entity", "Major local group": "local group"}.get(c["ctype"], c["ctype"].lower())
        why.append(f"Major {lab} ({c['ind']})")
    elif t == "B":
        why.append(f"Established {c['ind'].lower()} organisation")
    if c["won"]:
        why.append(f"Past customer — {c['won']} won order(s)" + (f", AED {c['won_val']:,.0f}" if c["won_val"] else ""))
    elif c["quote"]:
        why.append("Previously quoted — deal not closed")
    elif c["serious"]:
        why.append("Showed serious interest (in progress/meeting/design)")
    if c["n"] >= 2:
        why.append(f"{c['n']} separate enquiries")
    if c["max_val"] >= 3000 and not c["won"]:
        why.append(f"Deal size AED {c['max_val']:,.0f}")
    if c["max_qty"] >= 50:
        why.append(f"Volume need ({int(c['max_qty'])} units)")
    if c["existing"] == "Not classified" and t in "AB":
        why.append("Was never flagged as a big name")
    if "Not responding" in c["lost"]:
        why.append("Went silent — never properly closed")
    if c["in_exhibition"]:
        why.append(f"Also met at {c['in_exhibition']}")
    if c["best_q"] == "High" and len(why) < 2:
        why.append("Specific, high-quality enquiry")
    if not why:
        why.append("Single enquiry — limited evidence" if c["prio"] >= 3 else "Specific enquiry with reachable contact")
    if c["all_irrel"]:
        why = ["Enquiry out of scope / not relevant"]
    c["why"] = "; ".join(why[:4]) + "."

    # approach
    bc = c["best_contact"]
    ch = "Phone/WhatsApp" if bc["phone_ok"] else "Email" if bc["email_ok"] else "Research contact first"
    if bc["phone_ok"] and bc["email_ok"]:
        ch = "Phone/WhatsApp + follow-up email"
    hooks = season_hook(c["reqs"])
    if seg.startswith("S1"):
        base = "'We worked with you before' — same salesperson re-engages, shares new catalogue & asks about upcoming events/awards"
    elif seg.startswith("S2"):
        base = "Formal approach: email a tailored proposal + company profile; register as supplier/vendor; target national-occasion & annual events"
    elif seg.startswith("S3"):
        base = "Senior salesperson direct call; tailored proposal referencing their previous request; propose samples/showroom visit"
    elif seg.startswith("S4"):
        base = "Revisit the old quotation: send an updated quote / alternative design and a limited-time offer"
    elif seg.startswith("S5"):
        base = "Acknowledge repeated interest; call to understand recurring needs and offer a framework/price list"
    elif seg.startswith("S6"):
        base = "Trade/partner programme: trade price list, white-label option and fast turnaround"
    elif seg.startswith("S7"):
        base = "Value-range offer: ready-to-customise crystal range at lower price points"
    elif seg.startswith("S8"):
        base = "Verify company and decision-maker first, then soft re-introduction with catalogue"
    else:
        base = "No active outreach — include only in low-cost general newsletter/broadcast"
    if c["active"]:
        base = "ACTIVE PIPELINE — recent open enquiry; coordinate with assigned salesperson before any reactivation. " + base
    c["approach"] = base + (f". Hook: {', '.join(hooks)}" if hooks and not seg.startswith("S9") else "") + f". Channel: {ch}."

    c["exec_prev_req"] = "; ".join(dict.fromkeys(c["reqs"]))[:180] or "Not recorded"

# ------------------------------------------------------------------ lead-level output rows
cmap = {}
for c in companies:
    for l in c["leads"]:
        cmap[l["idx"]] = c


def dup_flag(l, c):
    flags = []
    if sig[l["sig"]] > 1:
        flags.append("Exact duplicate row")
    if c["n"] > 1:
        flags.append(f"1 of {c['n']} enquiries from this company")
    return "; ".join(flags)


def outcome(l):
    s = l["status"] or "No status"
    if l["value"]:
        s += f" (AED {l['value']:,.0f})"
    if l["lost"]:
        s += f" — {l['lost']}"
    return s


# ------------------------------------------------------------------ workbook
wb = Workbook()
wb.remove(wb.active)
HFONT = Font(name="Arial", bold=True, color="FFFFFF", size=10)
HFILL = PatternFill("solid", fgColor="1F3864")
BFONT = Font(name="Arial", size=9)
TFONT = Font(name="Arial", bold=True, size=14, color="1F3864")
SFONT = Font(name="Arial", italic=True, size=9, color="555555")
thin = Side(style="thin", color="D9D9D9")
BORDER = Border(bottom=thin)
PRIO_FILL = {1: "F8CBAD", 2: "FCE4D6", 3: "FFF2CC", 4: "EDEDED"}
TIER_FILL = {"A": "C6E0B4", "B": "DDEBF7", "C": "E2EFDA", "D": "F2F2F2", "E": "FFF2CC", "F": "F8CBAD"}


def write_table(ws, headers, rows, start_row=1, widths=None, title=None, subtitle=None):
    r0 = start_row
    if title:
        ws.cell(row=r0, column=1, value=title).font = TFONT
        r0 += 1
        if subtitle:
            ws.cell(row=r0, column=1, value=subtitle).font = SFONT
            r0 += 1
        r0 += 1
    for j, h in enumerate(headers, 1):
        cell = ws.cell(row=r0, column=j, value=h)
        cell.font, cell.fill = HFONT, HFILL
        cell.alignment = Alignment(wrap_text=True, vertical="center")
    for i, row in enumerate(rows, r0 + 1):
        for j, v in enumerate(row, 1):
            cell = ws.cell(row=i, column=j, value=v)
            cell.font = BFONT
            cell.alignment = Alignment(wrap_text=False, vertical="top")
            if isinstance(v, datetime):
                cell.number_format = "dd-mmm-yyyy"
            elif isinstance(v, float) and j > 1:
                cell.number_format = "#,##0"
    ws.freeze_panes = ws.cell(row=r0 + 1, column=3)
    last = get_column_letter(len(headers))
    ws.auto_filter.ref = f"A{r0}:{last}{r0 + max(len(rows), 1)}"
    ws.row_dimensions[r0].height = 32
    for j, h in enumerate(headers, 1):
        w = (widths or {}).get(h)
        if w is None:
            sample = [len(str(r[j - 1])) for r in rows[:300] if r[j - 1] is not None]
            w = min(max([len(h)] + sample) + 2, 45)
        ws.column_dimensions[get_column_letter(j)].width = max(w, 8)
    return r0


def color_col(ws, header_row, col_idx, nrows, mapping):
    col = get_column_letter(col_idx)
    for key, color in mapping.items():
        ws.conditional_formatting.add(
            f"{col}{header_row + 1}:{col}{header_row + nrows}",
            FormulaRule(formula=[f'ISNUMBER(SEARCH("{key}",{col}{header_row + 1}))'], fill=PatternFill("solid", fgColor=color)))


PRIO_KEYS = {"Priority 1": PRIO_FILL[1], "Priority 2": PRIO_FILL[2], "Priority 3": PRIO_FILL[3], "Priority 4": PRIO_FILL[4]}
TIER_KEYS = {f"{k} —": v for k, v in TIER_FILL.items()}

# ---- 01 REACTIVATION MASTER (one row per lead)
H1 = ["Lead ID", "Company Name", "Normalized Company Name", "Company Group ID", "Group Match Basis", "Parent Group", "Industry",
      "Company Type", "Company Tier", "Existing Classification", "New Classification", "Classification Change", "Change Type",
      "Enquiry Date", "Enquiry Year", "Lead Age (days)", "Lead Age Bucket", "Channel", "Enquiry/Product Requirement", "Product Family", "Qty",
      "Enquiry Quality", "Previous Enquiries (company total)", "Previous Quote", "Previous Serious Interest", "Previous Outcome",
      "Management Comments", "Previous Salesperson", "Contact Person", "Phone", "Email", "Website / Email Domain", "Country",
      "Contact Quality", "Company Score (0-100)", "Reactivation Priority", "Reactivation Segment", "Reactivation Reason",
      "Recommended Approach", "Research Status", "Confidence", "Evidence / Source", "Duplicate / Repeat Flag", "Notes"]
rows1 = []
for l in sorted(L, key=lambda x: x["sr"] or 0):
    c = cmap[l["idx"]]
    notes = []
    if not l["company"]:
        notes.append("No company name")
    if l["email_raw"] and not l["email_ok"]:
        notes.append(f"Invalid email '{l['email_raw']}'")
    if l["phone_raw"] and not l["phone_ok"]:
        notes.append("Invalid/short phone")
    if not l["phone_raw"] and not l["email_raw"]:
        notes.append("No contact details")
    if not l["date"]:
        notes.append("Missing date")
    if l["irrelevant"]:
        notes.append("Out of scope / not relevant")
    if c["active"]:
        notes.append("Company has a recent open enquiry")
    if c["in_exhibition"]:
        notes.append(f"Company also in Exhibition Leads ({c['in_exhibition']})")
    rows1.append([
        l["sr"], l["company"] or "(not recorded)", c["norm"], c["gid"], ", ".join(c["basis"]), c["pgroup"], c["ind"], c["ctype"],
        TIER_NAME[c["tier"]], l["existing"], TIER_NAME[c["tier"]], c["change"], c["change_kind"], l["date"],
        l["date"].year if l["date"] else None, l["days"], age_bucket(l["days"]), l["channel"], l["req"] or "Not recorded",
        l["family"], l["qty_raw"], l["quality"], c["n"], l["quote"], l["serious"], outcome(l), l["comments"], l["sales"], l["contact"],
        l["phone_raw"], l["email_raw"], l["domain"], l["country"], l["cq"], c["score"] if c["score"] is not None else "Insufficient data",
        PRIO_NAME[c["prio"]], c["segment"], c["why"], c["approach"], c["rstatus"], c["conf"],
        (c["evid"] + (f" | Source: {c['source']}" if c["source"] else "")), dup_flag(l, c), "; ".join(notes)])
ws = wb.create_sheet("01 — REACTIVATION MASTER")
W = {"Reactivation Reason": 45, "Recommended Approach": 60, "Evidence / Source": 50, "Classification Change": 45,
     "Management Comments": 35, "Notes": 40, "Enquiry/Product Requirement": 30}
hr = write_table(ws, H1, rows1, widths=W)
color_col(ws, hr, H1.index("Reactivation Priority") + 1, len(rows1), PRIO_KEYS)
color_col(ws, hr, H1.index("Company Tier") + 1, len(rows1), TIER_KEYS)
MASTER_N = len(rows1)

# ---- company list (used by dashboard & other sheets)
comp_sorted = sorted(companies, key=lambda c: (c["prio"], -(c["score"] or -1)))
H10 = ["Company Group ID", "Company", "Normalized Name", "Lead IDs", "No. of Enquiries", "Group Match Basis", "Parent Group",
       "Group Status", "Industry", "Company Type", "Existing Classification", "Company Tier", "Classification Change",
       "Change Type", "First Enquiry", "Latest Enquiry", "Latest Lead Age Bucket", "Best Enquiry Quality", "Won Orders",
       "Won Value (AED)", "Max Deal Value (AED)", "Previous Quote", "Serious Interest", "Lost Reasons", "Previous Requirements",
       "Best Contact Person", "Phone", "Email", "Contact Quality", "Previous Salesperson(s)", "Channels",
       "Score: Company (30)", "Score: Enquiry (20)", "Score: Engagement (15)", "Score: Order Value (10)", "Score: Recency (10)",
       "Score: Repeat (10)", "Score: Contact (5)", "Penalty", "Company Score (0-100)", "Reactivation Priority",
       "Reactivation Segment", "Why Reactivate?", "Recommended Approach", "Research Status", "Confidence", "Evidence", "Source",
       "Also in Exhibition Leads", "Active Pipeline Flag"]
rows10 = []
for c in comp_sorted:
    bc = c["best_contact"]
    rows10.append([c["gid"], c["name"], c["norm"], ", ".join(str(x["sr"]) for x in c["leads"]), c["n"], ", ".join(c["basis"]),
                   c["pgroup"], c["gstatus"], c["ind"], c["ctype"], c["existing"], TIER_NAME[c["tier"]], c["change"],
                   c["change_kind"], c["first_date"], c["last_date"], age_bucket(c["days"]), c["best_q"], c["won"],
                   c["won_val"] or None, c["max_val"] or None, "Yes" if c["quote"] else "No evidence",
                   "Yes" if c["serious"] else "No evidence", ", ".join(c["lost"]), c["exec_prev_req"], bc["contact"],
                   bc["phone_raw"], bc["email_raw"], bc["cq"], ", ".join(c["sales"]), ", ".join(c["channels"]), *c["parts"],
                   c["score"] if c["score"] is not None else "Insufficient data", PRIO_NAME[c["prio"]], c["segment"], c["why"],
                   c["approach"], c["rstatus"], c["conf"], c["evid"], c["source"], c["in_exhibition"],
                   "Yes" if c["active"] else ""])

# ---- 02 TOP REACTIVATION TARGETS
top = [c for c in comp_sorted if c["prio"] == 1 and not c["all_irrel"]]
H2 = ["Rank", "Company", "Company Tier", "Industry", "Parent Group", "Previous Requirement", "Previous Enquiry Date",
      "No. of Enquiries", "Previous Outcome", "Reactivation Priority", "Score", "Why Reactivate", "Recommended Sales Approach",
      "Contact Person", "Phone", "Email", "Previous Salesperson", "Confidence", "Lead IDs"]
rows2 = []
for i, c in enumerate(top, 1):
    bc = c["best_contact"]
    out = (f"Won x{c['won']}" + (f" (AED {c['won_val']:,.0f})" if c["won_val"] else "")) if c["won"] else \
        ("Quoted/serious — not closed" if (c["quote"] or c["serious"]) else "Lost/no response") + \
        (f" — {', '.join(c['lost'])}" if c["lost"] and not c["won"] else "")
    rows2.append([i, c["name"], TIER_NAME[c["tier"]], c["ind"], c["pgroup"], c["exec_prev_req"], c["last_date"], c["n"], out,
                  PRIO_NAME[c["prio"]], c["score"], c["why"], c["approach"], bc["contact"], bc["phone_raw"], bc["email_raw"],
                  ", ".join(c["sales"]), c["conf"], ", ".join(str(x["sr"]) for x in c["leads"])])
ws = wb.create_sheet("02 — TOP REACTIVATION TARGETS")
hr = write_table(ws, H2, rows2, widths={"Why Reactivate": 50, "Recommended Sales Approach": 70, "Previous Requirement": 35},
                 title="Top Reactivation Targets — Priority 1 companies",
                 subtitle=f"{len(rows2)} companies, ranked by combined score (company potential + enquiry quality + engagement + value + recency + repeat + contactability). Analysis date {TODAY:%d %b %Y}.")
color_col(ws, hr, 3, len(rows2), TIER_KEYS)

# ---- 03 BIG STRATEGIC COMPANIES
big = sorted([c for c in companies if c["tier"] in "AB"], key=lambda c: (c["tier"], c["prio"], -(c["score"] or 0)))
H3 = ["Company", "Company Tier", "Parent Group", "Group Status", "Industry", "Company Type", "Existing Classification",
      "Classification Change", "Evidence", "Source", "Research Status", "Confidence", "No. of Enquiries", "Previous Requirement",
      "Latest Enquiry", "Previous Outcome", "Reactivation Priority", "Recommended Approach", "Contact Person", "Phone", "Email"]
rows3 = []
for c in big:
    bc = c["best_contact"]
    rows3.append([c["name"], TIER_NAME[c["tier"]], c["pgroup"], c["gstatus"], c["ind"], c["ctype"], c["existing"], c["change"],
                  c["evid"], c["source"], c["rstatus"], c["conf"], c["n"], c["exec_prev_req"], c["last_date"],
                  "; ".join(outcome(x) for x in c["leads"])[:150], PRIO_NAME[c["prio"]], c["approach"], bc["contact"],
                  bc["phone_raw"], bc["email_raw"]])
ws = wb.create_sheet("03 — BIG STRATEGIC COMPANIES")
hr = write_table(ws, H3, rows3, widths={"Evidence": 60, "Recommended Approach": 60, "Classification Change": 45, "Previous Outcome": 40},
                 title="Big / Strategic Companies (Tier A & B only — evidence required)",
                 subtitle="Included only where the company identity is supported by public information or a corporate/government email domain. Name-only inclusions are marked Needs Verification.")
color_col(ws, hr, 2, len(rows3), TIER_KEYS)
color_col(ws, hr, 17, len(rows3), PRIO_KEYS)

# ---- 04 CLASSIFICATION REVIEW
rev = [c for c in companies if (c["existing"] != "Not classified" and c["change_kind"] != "Confirmed") or
       (c["existing"] == "Not classified" and c["tier"] in "AB")]
rev.sort(key=lambda c: ({"Downgrade": 0, "Unverified — needs research": 1, "Partly confirmed (strong, not major)": 2}.get(c["change_kind"], 3), c["tier"]))
H4 = ["Company", "Existing Classification", "Recommended Classification", "Change Type", "Reason", "Evidence", "Source",
      "Confidence", "Research Status", "Reactivation Priority"]
rows4 = []
for c in rev:
    if c["change_kind"].startswith("Upgrade"):
        reason = f"Not flagged in the sheet but evidence shows a {TIER_NAME[c['tier']].split('— ')[1].lower()} organisation"
    elif c["change_kind"] == "Downgrade":
        reason = "Flagged as Big Name but evidence shows a smaller agency/reseller/SME or a single branch"
    elif c["change_kind"].startswith("Partly"):
        reason = "Genuine established company, but not at 'major' scale (regional/subsidiary/mid-size)"
    else:
        reason = "Flagged as Big Name but identity/scale could not be confirmed from the data"
    rows4.append([c["name"], c["existing"], TIER_NAME[c["tier"]], c["change_kind"], reason, c["evid"], c["source"], c["conf"],
                  c["rstatus"], PRIO_NAME[c["prio"]]])
ws = wb.create_sheet("04 — CLASSIFICATION REVIEW")
write_table(ws, H4, rows4, widths={"Reason": 55, "Evidence": 60},
            title="Classification Review — existing 'Big / Decent Name' labels vs. independent analysis",
            subtitle="Shows every company whose existing label is wrong, unverifiable or missing. Companies whose label was confirmed are in 10 — COMPANY LIST (Change Type = Confirmed).")

# ---- 05 NEEDS VERIFICATION
nv = [c for c in comp_sorted if (c["tier"] == "E" or c["rstatus"] == "Needs Verification") and c["prio"] <= 2]
H5 = ["Company", "Current Data", "Current Tier", "What Is Missing", "What Needs Verification", "Suggested Research Action",
      "Reactivation Priority", "Score", "Lead IDs"]
rows5 = []
for c in nv:
    bc = c["best_contact"]
    cur = f"{c['n']} enquiry(ies); req: {c['exec_prev_req'][:70]}; contact: {bc['contact'] or '-'}; {bc['phone_raw'] or 'no phone'}; {bc['email_raw'] or 'no email'}"
    missing = []
    if c["name"].startswith("(No company)"):
        missing.append("company name")
    if not c["dom"]:
        missing.append("website / corporate email")
    if not bc["email_ok"]:
        missing.append("email")
    if not bc["phone_ok"]:
        missing.append("valid phone")
    missing.append("company size / group ownership")
    what = c["evid"] if c["rstatus"] == "Needs Verification" and c["name"] and not c["name"].startswith("(No") else \
        "Identity of buyer and whether it is a business" if c["name"].startswith("(No") else "Scale, sector and decision-maker"
    action = ("Call/WhatsApp the contact to confirm company & role" if bc["phone_ok"] else "Email contact") + \
             ("; check website " + c["dom"] if c["dom"] else "; search LinkedIn / trade licence directory") + \
             ("; confirm parent group" if c["pgroup"] else "")
    rows5.append([c["name"], cur, TIER_NAME[c["tier"]], ", ".join(missing), what, action, PRIO_NAME[c["prio"]], c["score"],
                  ", ".join(str(x["sr"]) for x in c["leads"])])
ws = wb.create_sheet("05 — NEEDS VERIFICATION")
hr = write_table(ws, H5, rows5, widths={"Current Data": 70, "What Needs Verification": 50, "Suggested Research Action": 55},
                 title="Needs Verification — worth researching before outreach",
                 subtitle="Companies with Priority 1–2 whose identity or scale could not be confirmed. Lower-priority unverified companies remain in 10 — COMPANY LIST (Research Status = Needs Verification).")
color_col(ws, hr, 7, len(rows5), PRIO_KEYS)

# ---- 06 LOW PRIORITY / EXCLUDE
low = [c for c in comp_sorted if c["prio"] == 4]


def low_reason(c):
    if c["all_irrel"]:
        return "Irrelevant / out of scope / fake"
    if c["insufficient"]:
        return "No usable data (no company, no contact, no requirement)"
    if c["tier"] == "F" and c["name"].startswith("(No company)"):
        return "Individual / no company recorded — low-value enquiry"
    if c["tier"] == "F":
        return "Not suitable"
    if set(c["lost"]) & {"No Budget", "Ready Piece"}:
        return "Small / low-budget single enquiry"
    if c["tier"] == "D":
        return "Small business, single low-detail enquiry"
    return "Weak enquiry, limited company evidence"


H6 = ["Company", "Company Tier", "Exclusion Category", "Previous Requirement", "Previous Outcome", "Latest Enquiry",
      "Contact Quality", "Score", "Keep Or Exclude", "Lead IDs"]
rows6 = []
for c in low:
    cat = low_reason(c)
    keep = "Exclude from outreach (keep record)" if cat.startswith(("Irrelevant", "No usable")) else "Newsletter / broadcast only"
    rows6.append([c["name"], TIER_NAME[c["tier"]], cat, c["exec_prev_req"], "; ".join(outcome(x) for x in c["leads"])[:120],
                  c["last_date"], c["best_contact"]["cq"], c["score"] if c["score"] is not None else "Insufficient data", keep,
                  ", ".join(str(x["sr"]) for x in c["leads"])])
dups = [l for l in L if sig[l["sig"]] > 1]
ws = wb.create_sheet("06 — LOW PRIORITY")
hr = write_table(ws, H6, rows6, title="Low Priority / Exclude — nothing deleted",
                 subtitle=f"{len(rows6)} companies. All records remain in the master. Exact-duplicate rows ({len(dups)}) are flagged in 01 and 11.")

# ---- 07 REACTIVATION SEGMENTS
SEG_INFO = {
    "S1 — Past customers: repeat business": ("Companies that already ordered from us.", "'We worked with you before' — the same salesperson reaches out, thanks them, shares the new catalogue and asks about upcoming awards/events.", "WhatsApp + phone call by previous salesperson; email for corporates", "Immediately; then quarterly check-in"),
    "S2 — Government & semi-government": ("Ministries, authorities, free zones, government-owned companies.", "Formal email with company profile + tailored proposal; register on vendor portals; align with national occasions (National Day, Year-of themes, annual awards).", "Email + phone to procurement / events office", "Oct–Nov for National Day & year-end awards"),
    "S3 — Major / strong companies not yet converted": ("Tier A/B corporates, multinationals, major local groups that enquired but did not buy.", "Senior salesperson; reference their previous requirement; offer samples/showroom visit; position for annual employee awards & VIP gifting.", "Direct phone call + tailored email; LinkedIn to decision-maker", "Now (Q4 awards season)"),
    "S4 — Quoted / serious interest, not closed": ("Companies we quoted or who were in progress/meeting stage.", "Revisit the old quote: updated price, alternative design, or limited-time offer.", "Phone/WhatsApp", "Within 2 weeks"),
    "S5 — Repeat enquirers, never converted": ("Multiple enquiries but no order yet — clear recurring need.", "Call to understand recurring calendar; offer framework price list / annual agreement.", "Phone", "Within 1 month"),
    "S6 — Trade buyers (agencies, printers, event cos, resellers)": ("Agencies/printers/event companies buying for their clients.", "Trade partner programme: trade price list, white-label, fast turnaround, sample kit.", "WhatsApp broadcast + email with trade catalogue", "Ongoing; before event seasons"),
    "S7 — Lost on budget: value-range offer": ("Lost mainly due to price/budget.", "Introduce value range / ready-to-customise pieces with clear price points.", "WhatsApp with price-range catalogue", "Seasonal campaigns"),
    "S8 — Research before contacting": ("Promising enquiries where company identity/scale is unclear.", "Verify company & decision-maker first, then soft re-introduction.", "Research → phone", "After verification"),
    "S9 — Low priority / exclude": ("Individuals, tiny one-offs, out-of-scope, spam or no data.", "No direct sales effort; general newsletter only (irrelevant/spam excluded).", "Broadcast only", "—"),
}
ws = wb.create_sheet("07 — REACTIVATION SEGMENTS")
ws.cell(row=1, column=1, value="Reactivation Segments").font = TFONT
ws.cell(row=2, column=1, value="Each company is assigned to ONE primary segment (first matching rule, in the order shown). Counts are live formulas on 10 — COMPANY LIST.").font = SFONT
H7 = ["Segment", "Who is in it", "No. of Companies", "Priority 1", "Priority 2", "No. of Leads", "Recommended Outreach", "Channel",
      "Timing", "Example Companies (top by score)"]
for j, h in enumerate(H7, 1):
    cc = ws.cell(row=4, column=j, value=h); cc.font, cc.fill = HFONT, HFILL; cc.alignment = Alignment(wrap_text=True)
CL = "'10 — COMPANY LIST'"
seg_col = get_column_letter(H10.index("Reactivation Segment") + 1)
prio_col = get_column_letter(H10.index("Reactivation Priority") + 1)
n_col = get_column_letter(H10.index("No. of Enquiries") + 1)
for i, (seg, (who, how, chan, when)) in enumerate(SEG_INFO.items(), 5):
    ex_ = [c["name"] for c in comp_sorted if c["segment"] == seg][:6]
    vals = [seg, who, f'=COUNTIF({CL}!${seg_col}:${seg_col},A{i})',
            f'=COUNTIFS({CL}!${seg_col}:${seg_col},A{i},{CL}!${prio_col}:${prio_col},"*Priority 1*")',
            f'=COUNTIFS({CL}!${seg_col}:${seg_col},A{i},{CL}!${prio_col}:${prio_col},"*Priority 2*")',
            f'=SUMIF({CL}!${seg_col}:${seg_col},A{i},{CL}!${n_col}:${n_col})', how, chan, when, ", ".join(ex_)]
    for j, v in enumerate(vals, 1):
        cc = ws.cell(row=i, column=j, value=v); cc.font = BFONT; cc.alignment = Alignment(wrap_text=True, vertical="top")
tot = 5 + len(SEG_INFO)
ws.cell(row=tot, column=1, value="Total").font = Font(name="Arial", bold=True, size=9)
for col in "CDEF":
    cc = ws[f"{col}{tot}"]; cc.value = f"=SUM({col}5:{col}{tot - 1})"; cc.font = Font(name="Arial", bold=True, size=9)
for col, w in zip("ABCDEFGHIJ", [42, 40, 11, 10, 10, 10, 60, 30, 22, 60]):
    ws.column_dimensions[col].width = w

# ---- 08 DASHBOARD (formulas)
ws = wb.create_sheet("08 — DASHBOARD")
M = "'01 — REACTIVATION MASTER'"
tier_col = get_column_letter(H10.index("Company Tier") + 1)
ex_col = get_column_letter(H10.index("Existing Classification") + 1)
ind_col = get_column_letter(H10.index("Industry") + 1)
chg_col = get_column_letter(H10.index("Change Type") + 1)
m_year = get_column_letter(H1.index("Enquiry Year") + 1)
m_q = get_column_letter(H1.index("Enquiry Quality") + 1)
m_prio = get_column_letter(H1.index("Reactivation Priority") + 1)
m_age = get_column_letter(H1.index("Lead Age Bucket") + 1)
m_tier = get_column_letter(H1.index("Company Tier") + 1)
m_ch = get_column_letter(H1.index("Channel") + 1)
ws.cell(row=1, column=1, value="Lead Reactivation Dashboard").font = TFONT
ws.cell(row=2, column=1, value=f"Source: Master sheet, {MASTER_N} leads (Aug 2025 – Sep 2026). Analysis date {TODAY:%d %b %Y}. All figures are live formulas.").font = SFONT
r = 4


def block(title, items, r, c0=1):
    ws.cell(row=r, column=c0, value=title).font = Font(name="Arial", bold=True, size=11, color="1F3864")
    r += 1
    for lab, f in items:
        a = ws.cell(row=r, column=c0, value=lab); a.font = BFONT; a.border = BORDER
        b = ws.cell(row=r, column=c0 + 1, value=f); b.font = Font(name="Arial", bold=True, size=9); b.border = BORDER
        r += 1
    return r + 1


r = block("Overview", [
    ("Total leads", f"=COUNTA({M}!A:A)-1"),
    ("Total unique companies (groups)", f"=COUNTA({CL}!A:A)-1"),
    ("A — Major companies", f'=COUNTIF({CL}!{tier_col}:{tier_col},"A —*")'),
    ("B — Strong / established", f'=COUNTIF({CL}!{tier_col}:{tier_col},"B —*")'),
    ("C — Good potential", f'=COUNTIF({CL}!{tier_col}:{tier_col},"C —*")'),
    ("D — Small / limited", f'=COUNTIF({CL}!{tier_col}:{tier_col},"D —*")'),
    ("E — Needs verification", f'=COUNTIF({CL}!{tier_col}:{tier_col},"E —*")'),
    ("F — Not suitable / low value", f'=COUNTIF({CL}!{tier_col}:{tier_col},"F —*")'),
], r)
r = block("Reactivation priority (companies)", [(PRIO_NAME[p], f'=COUNTIF({CL}!{prio_col}:{prio_col},"*Priority {p}*")') for p in (1, 2, 3, 4)], r)
r = block("Reactivation priority (leads)", [(PRIO_NAME[p], f'=COUNTIF({M}!{m_prio}:{m_prio},"*Priority {p}*")') for p in (1, 2, 3, 4)], r)
years = sorted({l["date"].year for l in L if l["date"]})
r = block("Leads by year", [(str(y), f"=COUNTIF({M}!{m_year}:{m_year},{y})") for y in years] +
          [("Missing date", f'=COUNTBLANK({M}!{m_year}2:{m_year}{MASTER_N + 1})')], r)
r = block("Leads by age", [(b, f'=COUNTIF({M}!{m_age}:{m_age},"{b}")') for b in ["0–3 months", "3–6 months", "6–12 months", "1–2 years", "2+ years", "Unknown date"]], r)
r2 = 4
r2 = block("Leads by enquiry quality", [(q, f'=COUNTIF({M}!{m_q}:{m_q},"{q}")') for q in ["High", "Medium", "Low", "Unknown"]], r2, 4)
r2 = block("Leads by company tier", [(TIER_NAME[t], f'=COUNTIF({M}!{m_tier}:{m_tier},"{t} —*")') for t in "ABCDEF"], r2, 4)
chs = [k for k, _ in Counter(l["channel"] for l in L if l["channel"]).most_common()]
r2 = block("Leads by channel", [(ch, f'=COUNTIF({M}!{m_ch}:{m_ch},"{ch}")') for ch in chs], r2, 4)
inds = [k for k, _ in Counter(c["ind"] for c in companies).most_common()]
r2 = block("Companies by industry (all / Priority 1-2)", [], r2, 4)
r2 -= 1
for ind in inds:
    ws.cell(row=r2, column=4, value=ind).font = BFONT
    ws.cell(row=r2, column=5, value=f'=COUNTIF({CL}!{ind_col}:{ind_col},"{ind}")').font = Font(name="Arial", bold=True, size=9)
    ws.cell(row=r2, column=6, value=f'=COUNTIFS({CL}!{ind_col}:{ind_col},"{ind}",{CL}!{prio_col}:{prio_col},"*Priority 1*")+COUNTIFS({CL}!{ind_col}:{ind_col},"{ind}",{CL}!{prio_col}:{prio_col},"*Priority 2*")').font = BFONT
    r2 += 1
# existing vs new matrix
r3 = max(r, r2) + 1
ws.cell(row=r3, column=1, value="Existing classification vs new tier (companies)").font = Font(name="Arial", bold=True, size=11, color="1F3864")
r3 += 1
for j, t in enumerate("ABCDEF", 2):
    cc = ws.cell(row=r3, column=j, value=f"{t}"); cc.font, cc.fill = HFONT, HFILL
for i, ex_ in enumerate(["Big Name", "Decent Name", "Not classified"], r3 + 1):
    ws.cell(row=i, column=1, value=ex_).font = BFONT
    for j, t in enumerate("ABCDEF", 2):
        ws.cell(row=i, column=j, value=f'=COUNTIFS({CL}!{ex_col}:{ex_col},"{ex_}",{CL}!{tier_col}:{tier_col},"{t} —*")').font = BFONT
r3 += 5
r3 = block("Classification review outcome", [(k, f'=COUNTIF({CL}!{chg_col}:{chg_col},"{k}")') for k in
                                             ["Confirmed", "Partly confirmed (strong, not major)", "Downgrade", "Unverified — needs research",
                                              "Upgrade — missed major company", "Upgrade — missed strong company", "Upgrade"]], r3)
for col, w in zip("ABCDEFG", [40, 12, 8, 42, 10, 12, 8]):
    ws.column_dimensions[col].width = w

# ---- 09 RESEARCH SOURCES
ws = wb.create_sheet("09 — RESEARCH SOURCES")
src_rows = []
for c in sorted([c for c in companies if c["rstatus"] in ("Web-verified", "Desk-verified", "Needs Verification") and (c["source"] or c["rstatus"] != "Rule-based (not researched)")],
                key=lambda c: (c["rstatus"], c["tier"], c["name"])):
    method = {"Web-verified": "Live web search during this analysis (Sep 2026)",
              "Desk-verified": "Well-known public entity; identity matched to official website / corporate email domain",
              "Needs Verification": "Could not confirm identity or scale — see 05"}[c["rstatus"]]
    src_rows.append([c["name"], TIER_NAME[c["tier"]], c["pgroup"], c["gstatus"], c["evid"], c["source"], c["rstatus"], method, c["conf"]])
write_table(ws, ["Company", "Tier", "Parent Group", "Group Status", "Evidence", "Source (official site / domain)", "Research Status",
                 "Method", "Confidence"], src_rows, widths={"Evidence": 70, "Method": 55},
            title="Research Sources & Evidence",
            subtitle="Web-verified = checked by live search (e.g. ektifa.ae, samanadevelopers.com, sobi.com, besaux.com, ohana.ae, texollubritech.com, socialkapita.com). Desk-verified = well-known entity; confirm details on the official site listed before outreach.")

# ---- 10 COMPANY LIST
ws = wb.create_sheet("10 — COMPANY LIST")
hr = write_table(ws, H10, rows10, widths={"Why Reactivate?": 50, "Recommended Approach": 60, "Evidence": 50, "Previous Requirements": 35, "Classification Change": 45})
color_col(ws, hr, H10.index("Reactivation Priority") + 1, len(rows10), PRIO_KEYS)
color_col(ws, hr, H10.index("Company Tier") + 1, len(rows10), TIER_KEYS)

# ---- 11 DATA QUALITY
ws = wb.create_sheet("11 — DATA QUALITY")
no_co = sum(1 for l in L if not l["company"])
bad_email = [l for l in L if l["email_raw"] and not l["email_ok"]]
no_email = sum(1 for l in L if not l["email_raw"])
bad_phone = [l for l in L if l["phone_raw"] and not l["phone_ok"]]
no_phone = sum(1 for l in L if not l["phone_raw"])
no_date = sum(1 for l in L if not l["date"])
no_req = sum(1 for l in L if not l["req"])
no_status = sum(1 for l in L if not l["status"])
multi = [c for c in companies if c["n"] > 1]
variant = [c for c in multi if len({x["company"] for x in c["leads"] if x["company"]}) > 1]
dq = [
    ("Rows in Master sheet (excl. header)", n_rows_sheet, "Includes trailing rows that only have a Sr. No"),
    ("Empty rows (Sr. No only)", n_blank, "Excluded from analysis; source untouched"),
    ("Leads analysed", len(L), ""),
    ("Columns in Master", len(raw.columns), ", ".join(raw.columns)),
    ("Leads with no company name", no_co, "Grouped by phone/email where possible"),
    ("Leads with no email", no_email, ""),
    ("Invalid email format", len(bad_email), "; ".join(f"#{l['sr']}: {l['email_raw']}" for l in bad_email[:15])),
    ("Leads with no phone", no_phone, ""),
    ("Invalid / too-short phone", len(bad_phone), "; ".join(f"#{l['sr']}: {l['phone_raw']}" for l in bad_phone[:15])),
    ("Missing enquiry date", no_date, ""),
    ("Missing requirement", no_req, ""),
    ("Missing status", no_status, "Treated as 'no outcome recorded'"),
    ("Exact duplicate rows", len(dups), "; ".join(f"#{l['sr']}" for l in dups[:40])),
    ("Companies with 2+ enquiries (groups)", len(multi), f"covering {sum(c['n'] for c in multi)} leads"),
    ("Groups with name variants merged", len(variant), "; ".join(" / ".join(sorted({x['company'] for x in c['leads'] if x['company']})) for c in variant[:25])),
    ("Same phone used by different company names (NOT merged)", len(shared_phone_conflicts), "; ".join(f"#{a} {b} vs #{c_} {d}" for a, b, c_, d, _ in shared_phone_conflicts[:10])),
    ("'Month' text inconsistent with date", sum(1 for _, rr in df.iterrows() if isinstance(rr['Date of Enquiry (dd/mm/yy)'], pd.Timestamp) and clean(rr['Month']) and rr['Date of Enquiry (dd/mm/yy)'].month_name() != clean(rr['Month'])), "Only case differences ('january')"),
    ("Existing 'BIG Name' label spellings", len({l['big_raw'] for l in L if l['big_raw']}), ", ".join(sorted({l['big_raw'] for l in L if l['big_raw']}))),
    ("Leads also found in 'Exibition Leads' sheet (by company)", sum(1 for c in companies if c["in_exhibition"]), ", ".join(c["name"] for c in companies if c["in_exhibition"])[:300]),
]
write_table(ws, ["Check", "Count", "Detail / Examples"], [list(x) for x in dq], widths={"Detail / Examples": 120, "Check": 50},
            title="Data Quality Checks", subtitle="Nothing in the source was changed. Issues are flagged per lead in 01 → Notes.")

# ---- 12 SCORING METHOD
ws = wb.create_sheet("12 — SCORING METHOD")
method = [
    ["Company Potential", 30, "A=30, B=24, C=16, E=10 (unknown, neutral), D=6, F=0", "Company tier from independent classification"],
    ["Enquiry Quality (best lead)", 20, "High=20, Medium=13, Low=5, Unknown=3", "Specific product, quantity, status, deal value, positive comments; out-of-scope = Low"],
    ["Previous Engagement", 15, "Won=15, Serious (quoted/in progress/meeting/sample)=10, Quote only=6, Followed-up=3", ""],
    ["Potential Order Value", 10, "Deal ≥10k=10, ≥3k=7, >0=4; else Qty ≥100=7, ≥20=4; custom/bespoke=3; else 1", "AED from 'Deal Value'"],
    ["Recency (latest enquiry)", 10, "3–6m=10, 6–12m=8, 0–3m=7 (still in normal follow-up window), >12m=5", f"Age measured to {TODAY:%d %b %Y}. Leads older than 3 months are the true reactivation pool."],
    ["Repeat Business Potential", 10, "3+ enquiries=10, 2=7, recurring-need sector or past buyer=4", "Recurring sectors: agencies, events, printers, resellers, sports, education, government, associations"],
    ["Contactability", 5, "Excellent=5, Good=4, Partial=2, Poor=0", "Company + contact + valid phone + valid email = Excellent"],
    ["Penalty", -5, "-5 if only lost reasons are 'No Budget'/'Ready Piece' and never ordered", "All enquiries out of scope → score capped at 15"],
    ["Priority bands", None, "P1 ≥65, P2 48–64, P3 35–47, P4 <35", "Overrides: Tier F → P4; Tier E capped at P2 unless repeat buyer or won ≥ AED 5k; Tier A/B with Medium+ enquiry → at least P2; no company + no contact + no requirement → 'Insufficient data' (no score, P4)"],
    ["Tier rules (not researched)", None, "Government by name → B (verify); agency/printer/event/reseller → D, or C if repeat/won/≥3k; named school/university/hospital → C; restaurants/salons/cafés/small clubs → D; other named business → E; no company → F (E if real order size); all enquiries irrelevant → F", "Researched companies use evidence in 09 — RESEARCH SOURCES"],
    ["Company grouping", None, "Leads joined if same normalized name (legal suffixes like LLC/FZE/Trading/Group removed), same corporate email domain, same email, or same phone (phone only if names are compatible)", "Group-wide hotel domains (mohg.com, accor.com) not merged. Nothing deleted."],
]
write_table(ws, ["Factor", "Max Points", "Rule", "Notes"], method, widths={"Rule": 90, "Notes": 80},
            title="Scoring Method (0–100)", subtitle="Company size alone cannot produce a Priority 1: max 30 of 100 points come from company potential.")

# ---- 13 MANAGEMENT REPORT (static text, generated)
tc = Counter(c["tier"] for c in companies)
pc = Counter(c["prio"] for c in companies)
wrong = [c for c in companies if c["existing"] != "Not classified" and c["change_kind"] in ("Downgrade", "Unverified — needs research")]
missed = [c for c in companies if c["existing"] == "Not classified" and c["tier"] in "AB"]
ind_p = Counter(c["ind"] for c in companies if c["prio"] <= 2 and c["ind"] not in ("Other / Unclear", "Individual / No company"))
REPORT = dict(total_leads=len(L), companies=len(companies), tiers=tc, prios=pc, wrong=len(wrong), missed=len(missed),
              nv=len(rows5), low=len(rows6), top=[c["name"] for c in top[:20]], ind_p=ind_p.most_common(8),
              partly=sum(1 for c in companies if c["change_kind"].startswith("Partly")),
              big_existing=sum(1 for c in companies if c["existing"] == "Big Name"))

def pct(a, b):
    return f"{(100 * a / b):.0f}%" if b else "-"


fam_stats = defaultdict(lambda: [0, 0, 0.0])
for l in L:
    f = fam_stats[l["family"]]; f[0] += 1
    if l["status"] == "Won":
        f[1] += 1; f[2] += l["value"] or 0
tier_stats = defaultdict(lambda: [0, 0, 0.0])
for c in companies:
    for l in c["leads"]:
        t_ = tier_stats[c["tier"]]; t_[0] += 1
        if l["status"] == "Won":
            t_[1] += 1; t_[2] += l["value"] or 0
ch_stats = Counter(l["channel"] for l in L)
ch_won = Counter(l["channel"] for l in L if l["status"] == "Won")
lost_c = Counter(l["lost"] for l in L if l["lost"])
n_lost = sum(1 for l in L if l["status"] == "Lost")
no_reason = sum(1 for l in L if l["status"] == "Lost" and not l["lost"])
older = sum(1 for l in L if l["days"] and l["days"] > 91)
seg_c = Counter(c["segment"] for c in companies)
top_ind = ", ".join(f"{k} ({v})" for k, v in ind_p.most_common(7))
fam_lines = sorted(((k, v) for k, v in fam_stats.items() if v[0] >= 15), key=lambda kv: -(kv[1][1] / kv[1][0]))
fam_txt = "; ".join(f"{k}: {v[0]} leads, win rate {pct(v[1], v[0])}, avg won AED {v[2] / v[1]:,.0f}" if v[1] else f"{k}: {v[0]} leads, no wins" for k, v in fam_lines)
tier_txt = "; ".join(f"{t}: {v[0]} leads, win {pct(v[1], v[0])}, avg won AED {(v[2] / v[1]) if v[1] else 0:,.0f}" for t, v in sorted(tier_stats.items()))
top_names = ", ".join(c["name"] for c in top[:15])
big_names = ", ".join(c["name"] for c in sorted([c for c in companies if c["tier"] in "AB" and c["prio"] <= 2 and not c["won"]], key=lambda c: -(c["score"] or 0))[:12])
QA = [
    ("1. How many total leads are in the database?", f"{len(L):,} leads in the Master sheet (Aug 2025 – Sep 2026); {n_blank} further rows contain only a serial number and were ignored."),
    ("2. How many unique companies?", f"{len(companies):,} company groups after matching name variants, email domains, emails and phones ({len(multi)} companies made 2+ enquiries, covering {sum(c['n'] for c in multi)} leads). {sum(1 for c in companies if c['name'].startswith('(No company)'))} groups have no company name (individuals/unknown)."),
    ("3. How many appear to be major companies?", f"{tc['A']} Tier A companies (multinationals, major UAE brands, government entities) — evidence in 03 and 09."),
    ("4. How many are strong established companies?", f"{tc['B']} Tier B companies."),
    ("5. How many have good reactivation potential?", f"{pc[1]} Priority 1 + {pc[2]} Priority 2 = {pc[1] + pc[2]} companies worth active outreach; {tc['C']} further companies are Tier C (good potential)."),
    ("6. How many need further verification?", f"{len(rows5)} companies (Priority 1–2) need verification before outreach (05). In total {tc['E']} companies are Tier E (scale unknown), most of them small single enquiries."),
    ("7. How many should be considered low priority?", f"{pc[4]} companies are Priority 4 (06), incl. {tc['F']} Tier F (individual one-offs, out-of-scope, fake or no data). Nothing was deleted."),
    ("8. How many existing classifications appear incorrect?", f"Of {REPORT['big_existing']} companies labelled Big/Decent Name: {sum(1 for c in companies if c['existing'] != 'Not classified' and c['change_kind'] == 'Downgrade')} are over-rated (agencies/resellers/SMEs), {sum(1 for c in companies if c['existing'] != 'Not classified' and c['change_kind'].startswith('Unverified'))} cannot be verified, {REPORT['partly']} are strong but not 'major'. More importantly, {len(missed)} Tier A/B companies were never flagged at all (e.g. Amazon, DP World, Agthia, RAKEZ, Sobi, GE Healthcare, FTI, PwC, Maersk)."),
    ("9. Which companies should sales review first?", f"Start with 02 — TOP REACTIVATION TARGETS. Top 15: {top_names}. Major companies that enquired but never ordered: {big_names}."),
    ("10. Major patterns in the old online leads", f"{pct(ch_stats['WhatsApp'], len(L))} of leads arrive via WhatsApp; overall win rate {pct(sum(ch_won.values()), len(L))}. {n_lost} leads are 'Lost' and {pct(no_reason, n_lost)} of those have no recorded reason — i.e. they were never properly closed and are the core reactivation pool. Recorded lost reasons: " + ", ".join(f"{k} {v}" for k, v in lost_c.most_common()) + f". {older} leads are older than 3 months. Win rate by tier — {tier_txt}. {len(dups)} exact duplicate rows and {no_co} leads without a company name reduce data quality."),
    ("11. Which industries contain the strongest opportunities?", f"By number of Priority 1–2 companies (excluding unclassified): {top_ind}. Government/semi-government and multinationals give the largest single orders (e.g. RAKEZ AED 94k, Executive Office AED 34k, Precision Drilling AED 34k); event/advertising agencies give repeat volume."),
    ("12. Which old enquiries are most worth reactivating?", "(a) Past buyers — re-order probability is highest and they already trust us; (b) quoted/in-progress enquiries that went silent ('Not responding' or no reason); (c) specific custom/crystal award enquiries from Tier A/B companies — annual awards recur every year; (d) repeat enquirers. By product family: " + fam_txt + "."),
    ("Next seasonal windows", "Q4 year-end / annual employee awards (pitch Oct–Nov); UAE National Day 2 Dec (pitch in October); Ramadan 2027 gifting (pitch by mid-January 2027); sports season tournaments (Oct–Apr)."),
    ("How to use this file", "01 = every lead with its company verdict; 02 = call list; 03 = strategic accounts; 04 = label corrections; 05 = research list; 06 = do-not-chase list; 07 = segment playbook; 08 = dashboard; 09 = evidence; 10 = one row per company with score breakdown; 11 = data-quality issues; 12 = scoring rules; MASTER (ORIGINAL COPY) = untouched values copy."),
]
ws = wb.create_sheet("13 — MANAGEMENT REPORT")
ws.cell(row=1, column=1, value="Management Report — Lead Reactivation").font = TFONT
ws.cell(row=2, column=1, value=f"Analysis date {TODAY:%d %b %Y}. Figures are computed from the Master sheet; see 12 — SCORING METHOD for rules.").font = SFONT
rr = 4
for q, a in QA:
    ws.cell(row=rr, column=1, value=q).font = Font(name="Arial", bold=True, size=10, color="1F3864")
    cc = ws.cell(row=rr + 1, column=1, value=a); cc.font = Font(name="Arial", size=10); cc.alignment = Alignment(wrap_text=True, vertical="top")
    ws.row_dimensions[rr + 1].height = max(15, 15 * (len(a) // 150 + 1))
    rr += 3
ws.column_dimensions["A"].width = 160
REPORT["qa"] = QA

# ---- ORIGINAL MASTER COPY (values, read-only reference)
src_wb = load_workbook(SRC, data_only=True)
sws = src_wb["Master"]
ws = wb.create_sheet("MASTER (ORIGINAL COPY)")
for row in sws.iter_rows(min_row=1, max_row=sws.max_row, max_col=sws.max_column):
    for cell in row:
        if cell.value is not None:
            nc = ws.cell(row=cell.row, column=cell.column, value=cell.value)
            if isinstance(cell.value, datetime):
                nc.number_format = "dd/mm/yy"
ws.freeze_panes = "A2"
ws.sheet_properties.tabColor = "808080"

import json
json.dump({k: (dict(v) if isinstance(v, Counter) else v) for k, v in REPORT.items()}, open(OUT + ".report.json", "w"), default=str, indent=1)
from openpyxl.workbook.properties import CalcProperties
wb.calculation = CalcProperties(fullCalcOnLoad=True)
wb.save(OUT)
print("saved", OUT, "leads", len(L), "companies", len(companies), dict(tc), dict(pc))
