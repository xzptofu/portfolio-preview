#!/usr/bin/env python3
"""Extract the original Figure 3(b) paths from the published NeurIPS PDF.

Requires PyMuPDF. Usage:
    python scripts/extract-paper-chart.py /path/to/paper.pdf

The output is SVG path data in the original axis coordinate system, mapped
affinely to an 800 × 500 viewBox. No data points are estimated from a bitmap.
"""

from __future__ import annotations

import hashlib
import json
import math
import sys
from pathlib import Path

import pymupdf


ROOT = Path(__file__).resolve().parent.parent
SOURCE_SHA256 = "ddd3a18ee740e97eb1b38f75f4fc150c87d969f1e62e7e119864cab1a996c46b"
WIDTH, HEIGHT = 800, 500
SERIES = (
    ("FTPL", 49, 79, (0.12157, 0.46667, 0.70588)),
    ("FTPL-A", 50, 80, (1.0, 0.49804, 0.05490)),
    ("FTPL-D+", 51, 81, (0.17255, 0.62745, 0.17255)),
)


def close(a: tuple[float, ...], b: tuple[float, ...], tolerance: float = 0.0001) -> bool:
    return len(a) == len(b) and all(abs(x - y) <= tolerance for x, y in zip(a, b))


def number(value: float) -> str:
    value = round(value, 3)
    if value == 0:
        return "0"
    return f"{value:.3f}".rstrip("0").rstrip(".")


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Provide the path to the original NeurIPS PDF.")
    pdf_path = Path(sys.argv[1])
    if hashlib.sha256(pdf_path.read_bytes()).hexdigest() != SOURCE_SHA256:
        raise SystemExit("PDF checksum does not match the verified original.")

    document = pymupdf.open(pdf_path)
    page = document[8]  # Figure 3(b), page 9.
    drawings = {item["seqno"]: item for item in page.get_drawings()}
    axes = drawings[48]["rect"]
    if not close(tuple(axes), (221.1386, 90.9453, 300.3859, 140.5458), 0.001):
        raise SystemExit("The extracted plot boundaries differ from the verified figure.")

    def map_point(point: pymupdf.Point) -> tuple[float, float]:
        return ((point.x - axes.x0) * WIDTH / axes.width,
                (point.y - axes.y0) * HEIGHT / axes.height)

    def path_data(drawing: dict, *, filled: bool) -> str:
        items = drawing["items"]
        if not items or any(item[0] != "l" for item in items):
            raise SystemExit("Expected connected line segments in the source figure.")
        start = items[0][1]
        last = start
        pieces = [f"M {number(map_point(start)[0])} {number(map_point(start)[1])}"]
        for _, p1, p2 in items:
            if math.dist(last, p1) > 0.0001:
                raise SystemExit("Unexpected discontinuity in the source path.")
            x, y = map_point(p2)
            pieces.append(f"L {number(x)} {number(y)}")
            last = p2
        if filled:
            if math.dist(last, start) > 0.0001:
                raise SystemExit("The source uncertainty band is not closed.")
            pieces.append("Z")
        return " ".join(pieces)

    series = []
    for name, band_seq, line_seq, color in SERIES:
        band, line = drawings[band_seq], drawings[line_seq]
        if band["type"] != "f" or line["type"] != "s":
            raise SystemExit(f"Unexpected source path types for {name}.")
        if not close(band["fill"], color) or not close(line["color"], color):
            raise SystemExit(f"Unexpected source path colors for {name}.")
        if not math.isclose(band["fill_opacity"], 0.15, abs_tol=0.0001):
            raise SystemExit(f"Unexpected uncertainty opacity for {name}.")
        series.append({"name": name, "band": path_data(band, filled=True), "line": path_data(line, filled=False)})

    x_ticks = [{"value": value, "position": round(map_point(drawings[seq]["items"][0][1])[0], 3)}
               for value, seq in zip((0, 50, 100, 150, 200), (52, 55, 58, 61, 64))]
    y_ticks = [{"value": value, "position": round(map_point(drawings[seq]["items"][0][1])[1], 3)}
               for value, seq in zip((0, 2, 4), (68, 71, 74))]

    output = ROOT / "app/components/paper-chart-data.ts"
    payload = {"width": WIDTH, "height": HEIGHT, "xTicks": x_ticks, "yTicks": y_ticks, "series": series}
    output.write_text(
        "// Generated from Figure 3(b) of the verified NeurIPS PDF.\n"
        "// Run scripts/extract-paper-chart.py to regenerate; do not trace from an image.\n"
        f"export const paperChartData = {json.dumps(payload, ensure_ascii=False, indent=2)} as const;\n"
    )
    print(f"Wrote {output.relative_to(ROOT)} from 3 original curves and 3 uncertainty bands.")


if __name__ == "__main__":
    main()
