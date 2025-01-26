#!/bin/bash
for img in *.png; do
   sips -Z 1024 "$img" --out "$img"
done