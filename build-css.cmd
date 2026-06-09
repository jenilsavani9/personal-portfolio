@echo off
REM Rebuild styles.css from your Tailwind classes. Run this after changing
REM any class names in index.html. Requires tailwindcss.exe (the standalone CLI).
tailwindcss.exe -c tailwind.config.js -i tailwind-input.css -o styles.css --minify
echo Done. styles.css rebuilt.
