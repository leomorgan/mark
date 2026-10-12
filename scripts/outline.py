"""Regenerate the mark's outlines in index.js from Mona Sans.

Usage: python3 scripts/outline.py "MonaSans[wdth,wght].ttf"
The font is at github.com/google/fonts/tree/main/ofl/monasans (SIL OFL 1.1).
Needs fontTools and hb-shape (HarfBuzz) for kerning.
"""
import json, re, subprocess, sys, tempfile
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.transformPen import TransformPen

WGHT, WDTH = 500, 100       # Mona Sans Medium, normal width
DOT, GAP = 300, 70          # the teal full stop: 0.3em wide, 0.07em either side
PX = 13                     # rendered size: 13px text

font = instancer.instantiateVariableFont(TTFont(sys.argv[1]), {"wght": WGHT, "wdth": WDTH})
tmp = tempfile.NamedTemporaryFile(suffix=".ttf", delete=False).name
font.save(tmp)
glyphs = font.getGlyphSet()

def shape(text):
    out = subprocess.run(["hb-shape", "--output-format=json", tmp, text], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)

# Lay out "leomorgan", the dot, then "ai". Each word is shaped on its own, as in the browser mock-up.
placed, x = [], 0
for word in ("leomorgan", None, "ai"):
    if word is None:
        dot_cx = x + GAP + DOT / 2
        x += GAP + DOT + GAP
        continue
    for g in shape(word):
        placed.append((g["g"], x + g["dx"]))
        x += g["ax"]

bounds = BoundsPen(glyphs)
for name, gx in placed:
    glyphs[name].draw(TransformPen(bounds, (1, 0, 0, 1, gx, 0)))
x0, y0, x1, y1 = bounds.bounds
top, left = round(y1), round(x0)
width, height = round(x1) - left, top - round(y0)

pen = SVGPathPen(glyphs, ntos=lambda v: str(round(v)))
for name, gx in placed:
    glyphs[name].draw(TransformPen(pen, (1, 0, 0, -1, gx - left, top)))
path = pen.getCommands()

print(json.dumps({
    "viewBox": f"0 0 {width} {height}",
    "width": round(width * PX / 1000, 2),
    "height": round(height * PX / 1000, 2),
    "dot": {"cx": round(dot_cx - left), "cy": top - DOT // 2, "r": DOT // 2},
    "path": path,
}))
