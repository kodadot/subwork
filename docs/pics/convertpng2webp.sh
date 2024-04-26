bash
for file in *.png.webp; do
  ffmpeg -i "$file" -c:v libwebp -lossless 0 -compression_level 6 -q 80 "${file%.*}.webp"
done
