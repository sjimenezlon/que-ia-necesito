#!/usr/bin/env python3
"""Genera src/data/colombiaDeptos.js: mapa liviano de Colombia por departamento y tres indicadores del DANE.

Uso:  python3 scripts/build-colombia-map.py RUTA_AL_LAGO
RUTA_AL_LAGO es una carpeta con geo_dptos.json, dane_ipm_departamento.json, dane_pib_departamento.json y
dane_geih_departamento.json (cada uno con su fuente y url). Los valores se copian tal cual, redondeados a un decimal.
"""
import json, math, pathlib, sys

LAGO = pathlib.Path(sys.argv[1])
NOMBRES = {"05": "Antioquia", "08": "Atlántico", "11": "Bogotá, D. C.", "13": "Bolívar", "15": "Boyacá", "17": "Caldas", "18": "Caquetá", "19": "Cauca", "20": "Cesar", "23": "Córdoba", "25": "Cundinamarca", "27": "Chocó", "41": "Huila", "44": "La Guajira", "47": "Magdalena", "50": "Meta", "52": "Nariño", "54": "Norte de Santander", "63": "Quindío", "66": "Risaralda", "68": "Santander", "70": "Sucre", "73": "Tolima", "76": "Valle del Cauca", "81": "Arauca", "85": "Casanare", "86": "Putumayo", "88": "San Andrés y Providencia", "91": "Amazonas", "94": "Guainía", "95": "Guaviare", "97": "Vaupés", "99": "Vichada"}
ESC, X0, Y0, TOL = 36.0, -79.15, 12.75, 0.018


def dp(pts, tol):
    if len(pts) < 3: return pts
    a, b = pts[0], pts[-1]; dx, dy = b[0] - a[0], b[1] - a[1]; n = math.hypot(dx, dy) or 1e-12
    im, dm = 0, 0.0
    for i in range(1, len(pts) - 1):
        d = abs(dy * (pts[i][0] - a[0]) - dx * (pts[i][1] - a[1])) / n
        if d > dm: im, dm = i, d
    if dm <= tol: return [a, b]
    return dp(pts[:im + 1], tol)[:-1] + dp(pts[im:], tol)


def area(r): return abs(sum(r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1] for i in range(len(r) - 1))) / 2


def anillo(r):
    m = len(r) // 2
    s = dp(r[:m + 1], TOL)[:-1] + dp(r[m:], TOL)
    if len(s) < 4: return ""
    return "M" + "L".join(f"{(x - X0) * ESC:.1f},{(Y0 - y) * ESC:.1f}" for x, y in s[:-1]) + "Z"


sys.setrecursionlimit(20000)
geo = json.loads((LAGO / "geo_dptos.json").read_text())
deptos = []
for f in geo["features"]:
    c = f["properties"]["D"]; g = f["geometry"]
    if c == "88":   # isla lejana: marca en un recuadro
        deptos.append({"c": c, "n": NOMBRES[c], "d": "M34,52m-7,0a7,7 0 1,0 14,0a7,7 0 1,0 -14,0Z"}); continue
    polis = [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]
    ext = sorted((p[0] for p in polis), key=area, reverse=True)
    ext = [r for i, r in enumerate(ext) if i == 0 or area(r) > 0.004]
    deptos.append({"c": c, "n": NOMBRES[c], "d": "".join(anillo(r) for r in ext)})
deptos.sort(key=lambda d: d["n"])
assert len(deptos) == 33 and all(d["d"] for d in deptos)


def lee(n): return json.loads((LAGO / n).read_text())
ipm, pib, geih = lee("dane_ipm_departamento.json"), lee("dane_pib_departamento.json"), lee("dane_geih_departamento.json")
assert str(ipm["anios"][-1]) == "2024" and geih["anio"] == 2025, (ipm["anios"], geih["anio"])
datos = {
    "ipm": {"label": "Pobreza multidimensional", "corte": "2024", "unidad": "%", "sentido": "alto-peor",
            "fuente": "DANE, pobreza multidimensional por departamento 2024 (Encuesta de Calidad de Vida)", "url": ipm["url"],
            "nacional": ipm["nacional"][-1], "valores": {c: round(v["ipm"][-1], 1) for c, v in ipm["datos"].items() if c in NOMBRES and v["ipm"][-1] is not None}},
    "pibpc": {"label": "PIB por habitante", "corte": "2025, provisional", "unidad": "millones de pesos", "sentido": "alto-mejor",
              "fuente": "DANE, cuentas departamentales, PIB por habitante a precios corrientes 2025pr", "url": pib["url"],
              "nacional": round(pib["datos"]["00"]["pib_pc"] / 1e6, 1), "valores": {c: round(v["pib_pc"] / 1e6, 1) for c, v in pib["datos"].items() if c in NOMBRES}},
    "td": {"label": "Tasa de desempleo", "corte": "2025", "unidad": "%", "sentido": "alto-peor",
           "fuente": "DANE, GEIH, mercado laboral por departamento 2025", "url": geih["url"], "nacional": None,
           "nota": "La GEIH departamental cubre 23 departamentos: Bogotá y los antiguos territorios nacionales quedan sin dato.",
           "valores": {c: round(v["td"], 1) for c, v in geih["datos"].items() if c in NOMBRES}},
}
out = "// Generado por scripts/build-colombia-map.py. No editar a mano.\n"
out += "export const VIEWBOX = '0 0 460 620'\n"
out += "export const DEPTOS = " + json.dumps(deptos, ensure_ascii=False, separators=(",", ":")) + "\n"
out += "export const DATASETS = " + json.dumps(datos, ensure_ascii=False, separators=(",", ":")) + "\n"
dest = pathlib.Path(__file__).resolve().parent.parent / "src/data/colombiaDeptos.js"
dest.write_text(out)
print(dest, f"{len(out) / 1024:.0f} KB", {k: (len(v["valores"]), v["nacional"]) for k, v in datos.items()})
print({k: (min(v["valores"].values()), max(v["valores"].values())) for k, v in datos.items()})
