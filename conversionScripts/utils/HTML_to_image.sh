#!/bin/bash

# Define the file paths
HTML_FILE=$1  # Path to the HTML file
OUTPUT_IMAGE=$2  # Desired output PNG file path

# Check if the HTML file exists
if [[ -f "$HTML_FILE" ]]; then
  # Convert HTML to PNG using wkhtmltoimage
  wkhtmltoimage --width 2048 "$HTML_FILE" "$OUTPUT_IMAGE"
  
  if [[ $? -eq 0 ]]; then
    echo "Conversion complete! PNG saved as $OUTPUT_IMAGE"
  else
    echo "Error during conversion."
  fi
else
  echo "The HTML file does not exist at $HTML_FILE. Please check the path."
fi
