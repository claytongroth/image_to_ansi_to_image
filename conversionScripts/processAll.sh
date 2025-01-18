#!/bin/bash

# Check if directory argument is provided
if [ $# -ne 1 ]; then
    echo "Usage: $0 <directory_path>"
    exit 1
fi

# Store directory path
DIR_PATH="$1"

# Check if directory exists
if [ ! -d "$DIR_PATH" ]; then
    echo "Error: Directory $DIR_PATH does not exist"
    exit 1
fi

# Process each JPEG file in the directory
for img_path in "$DIR_PATH"/*.jpeg "$DIR_PATH"/*.jpg; do
    # Skip if no files found
    [ -e "$img_path" ] || continue
    
    # Extract filename without extension
    filename=$(basename "$img_path")
    filename_no_ext="${filename%.*}"
    
    # Set variables
    NUMBER=200
    ORIGINAL_IMG="$filename_no_ext"
    ORIGINAL_IMG_FULL_PATH="$img_path"
    NEW_NAME="${ORIGINAL_IMG}_${NUMBER}"
    NEW_FILE_NAME="$NEW_NAME.txt"
    STYLE=256
    
    echo "Processing: $filename"
    
    # Run the original command
    ./stiv-jpeg "$ORIGINAL_IMG_FULL_PATH" "$NUMBER" "$STYLE" 2>&1 | tee "$NEW_FILE_NAME"
    node textANSItoHTML.js "$NEW_FILE_NAME"
    ./HTML_to_image.sh "${NEW_NAME}_HTML.html" "../../../static/img/${NEW_NAME}_IMG.png"
    
    rm ${NEW_NAME}_HTML.html
    rm $NEW_FILE_NAME

    echo "Completed processing: $filename"
    echo "------------------------"
done

echo "All files processed successfully"