#!/bin/bash

# Path to image directory
IMG_DIR="../../../static/img"

# Check if directory exists
if [ ! -d "$IMG_DIR" ]; then
    echo "Error: Directory $IMG_DIR does not exist"
    exit 1
fi

# Process each PNG file
for png_file in "$IMG_DIR"/*.png; do
    # Skip if no PNG files found
    [ -e "$png_file" ] || continue
    
    # Create JPEG filename by replacing .png with .jpg
    jpg_file="${png_file%.png}.jpg"
    
    echo "Converting: $png_file"
    sips -s format jpeg "$png_file" --out "$jpg_file"
    
    # Print size comparison
    png_size=$(ls -lh "$png_file" | awk '{print $5}')
    jpg_size=$(ls -lh "$jpg_file" | awk '{print $5}')
    echo "PNG size: $png_size"
    echo "JPG size: $jpg_size"
    echo "------------------------"
done

mv $IMG_DIR/*.png $IMG_DIR/old_big

echo "All conversions complete"