#!/bin/sh
set -eu
export PLAYWRIGHT_BROWSERS_PATH="$PWD/.cache/ms-playwright"
export TMPDIR="$PWD/.cache/tmp"
export LD_LIBRARY_PATH="$PWD/.cache/browser-libs/usr/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
export FONTCONFIG_FILE="$PWD/.cache/fontconfig.xml"
mkdir -p "$TMPDIR"
npm run test:e2e
