NUMBER=200
ORIGINAL_IMG=$1
ORIGINAL_IMG_FULL_PATH="../../../static/img/$ORIGINAL_IMG.jpeg"
NEW_NAME="${ORIGINAL_IMG}_${NUMBER}"
NEW_FILE_NAME="$NEW_NAME.txt"
STYLE=256

./stiv-jpeg $ORIGINAL_IMG_FULL_PATH $NUMBER $STYLE 2>&1 | tee $NEW_FILE_NAME


node textANSItoHTML.js $NEW_FILE_NAME


./HTML_to_image.sh ${NEW_NAME}_HTML.html ../../../static/img/${NEW_NAME}_IMG.png 


# TODO: Convert to jpg at the end.

rm ${NEW_NAME}_HTML.html
rm $NEW_FILE_NAME