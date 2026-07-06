#!/bin/bash
# 稼轩词句 — One-click Deploy to GitHub Pages
set -e

echo "=== 稼轩词句 Deploy ==="

if git diff --quiet && git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

if [ -n "$1" ]; then
  MSG="$1"
else
  MSG="Update — $(date '+%Y-%m-%d %H:%M')"
fi

echo "Commit: $MSG"
git add -A
git commit -m "$MSG"
git push

echo ""
echo "=== Done! ==="
echo "https://leebaichuan.github.io/poem-viewer/"
