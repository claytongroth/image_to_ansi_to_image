
# TIV
https://github.com/radare/tiv



# STUFF

- Commit as standalone repo
- Working Flow
    - Existing image to ANSI code 
        - `imageToAnsi.sh`
    - ANSI to HTML 
        - `textANSItoHTML.js` (not working)
        - print out the HTML from the js file with ANSI (with no weird borders.)
    - HTML to Image
        - `HTML_to_image.sh`

- One script for all of it with catches and cleanup
- Run for all images 
- Manually fix all images





# Overall
- Get Ascii and Ansi diplaying well with components (and responsive)
- Otherwise, converting to image.
    - Image --> ANSI --> Image


# Stretch
- Flicker effect?
- Setup pipeline for conversion
    - Drop an image into a folder, gets updated