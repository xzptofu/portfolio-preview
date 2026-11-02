#!/usr/bin/env python3
"""Check every rendered chart vertex and axis tick against the source PDF.

Requires PyMuPDF. Usage:
    python scripts/verify-paper-chart.py /path/to/paper.pdf
"""

from __future__ import annotations

import hashlib
import json
import re
import sys
from pathlib import Path

import pymupdf


ROOT = Path(__file__).resolve().parent.parent
SOURCE_SHA256 = "ddd3a18ee740e97eb1b38f75f4fc150c87d969f1e62e7e119864cab1a996c46b"
SERIES = (("FTPL", 49, 79), ("FTPL-A", 50, 80), ("FTPL-D+", 51, 81))


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Provide the path to the original NeurIPS PDF.")
    pdf_path = Path(sys.argv[1])
    if hashlib.sha256(pdf_path.read_bytes()).hexdigest() != SOURCE_SHA256:
        raise SystemExit("PDF checksum does not match the verified original.")

    source = (ROOT / "app/components/paper-chart-data.ts").read_text()
    payload = json.loads(source.split("export const paperChartData = ", 1)[1].rsplit(" as const;", 1)[0])
    assert (payload["width"], payload["height"]) == (800, 500)
    drawings = {d["seqno"]: d for d in pymupdf.open(pdf_path)[8].get_drawings()}
    axes = drawings[48]["rect"]
    max_error = 0.0
    vertices = 0

    for data, (name, band_seq, line_seq) in zip(payload["series"], SERIES, strict=True):
        assert data["name"] == name
        for kind, sequence in (("band", band_seq), ("line", line_seq)):
            path = data[kind]
            assert path.startswith("M ") and (path.endswith(" Z") == (kind == "band"))
            values = [float(x) for x in re.findall(r"-?\d+(?:\.\d+)?", path)]
            assert len(values) % 2 == 0
            points = list(zip(values[::2], values[1::2], strict=True))
            segments = drawings[sequence]["items"]
            expected = [segments[0][1]] + [segment[2] for segment in segments]
            assert len(points) == len(expected)
            for (x, y), original in zip(points, expected, strict=True):
                dx = abs(x / payload["width"] * axes.width + axes.x0 - original.x)
                dy = abs(y / payload["height"] * axes.height + axes.y0 - original.y)
                max_error = max(max_error, dx, dy)
                vertices += 1

    for tick, value, sequence in zip(payload["xTicks"], (0, 50, 100, 150, 200), (52, 55, 58, 61, 64), strict=True):
        expected = (drawings[sequence]["items"][0][1].x - axes.x0) * payload["width"] / axes.width
        assert tick["value"] == value and abs(tick["position"] - expected) < 0.00051
    for tick, value, sequence in zip(payload["yTicks"], (0, 2, 4), (68, 71, 74), strict=True):
        expected = (drawings[sequence]["items"][0][1].y - axes.y0) * payload["height"] / axes.height
        assert tick["value"] == value and abs(tick["position"] - expected) < 0.00051

    assert vertices == 1514 and max_error < 0.00006
    print(f"Verified {vertices} curve/band vertices and all axis ticks; maximum error {max_error:.8f} PDF points.")


if __name__ == "__main__":
    main()
