cd ../../../static/img 
mkdir -p old_big
for img in *.jpg *.jpeg *.png; do
    mv "$img" old_big/
    sips -Z 512 "old_big/$img" --out "$img"
done