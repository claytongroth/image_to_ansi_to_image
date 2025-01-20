#!/bin/bash

# Check if both arguments are provided
if [ $# -ne 2 ]; then
    echo "Usage: $0 <input_image> <destination_path>"
    exit 1
fi

# Store input path and destination
INPUT_IMG="$1"
DEST_PATH="$2"

# Check if input file exists
if [ ! -f "$INPUT_IMG" ]; then
    echo "Error: Input file $INPUT_IMG does not exist"
    exit 1
fi

# Check if destination directory exists
DEST_DIR=$(dirname "$DEST_PATH")
if [ ! -d "$DEST_DIR" ]; then
    echo "Error: Destination directory $DEST_DIR does not exist"
    exit 1
fi

# Extract filename without extension
filename=$(basename "$INPUT_IMG")
filename_no_ext="${filename%.*}"

# Set variables (keeping the same values as original script)
NUMBER=200
ORIGINAL_IMG="$filename_no_ext"
ORIGINAL_IMG_FULL_PATH="$INPUT_IMG"
NEW_NAME="${ORIGINAL_IMG}_${NUMBER}"
NEW_FILE_NAME="$NEW_NAME.txt"
STYLE=256

echo "Processing: $filename"

# Run the conversion commands with updated paths
./utils/stiv-jpeg "$ORIGINAL_IMG_FULL_PATH" "$NUMBER" "$STYLE" 2>&1 | tee "$NEW_FILE_NAME"
node ./utils/textANSItoHTML.js "$NEW_FILE_NAME"
./utils/HTML_to_image.sh "${NEW_NAME}_HTML.html" "$DEST_PATH"

# Cleanup temporary files
rm ${NEW_NAME}_HTML.html
rm $NEW_FILE_NAME

echo "Completed processing: $filename"
echo "------------------------"