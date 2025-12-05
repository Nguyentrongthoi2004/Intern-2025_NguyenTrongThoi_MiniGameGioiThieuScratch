@echo off
echo ==== AUTO PUSH TO GITHUB ====

git add .

git commit -m "auto update %date% %time%"

git push

echo ==== PUSH DONE ====
pause
