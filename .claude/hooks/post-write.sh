#!/bin/bash
# Claude Code post-write hook
# Auto-format markdown files after writing

# Get the file path from the first argument
FILE="$1"

# Check if the file is a markdown file
if [[ "$FILE" == *.md ]]; then
  echo "Formatting markdown file: $FILE"
  npx prettier --write "$FILE"
fi
