for i in dataSound/*.webm; do ffmpeg -i "$i" -ac 1 -f wav "${i%.*}.wav"; done

