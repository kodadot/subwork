find . -type f \( -iname "*.jpg" -o -iname "*.png" \) -exec sh -c 'ffmpeg -i "{}" -c:v libwebp -lossless 0 -compression_level 6 -q 80 -n "{}.webp"' \;
