@echo off
setlocal

rem Start the frontend server
cd frontend
start cmd /c "npm run dev"
cd ..

rem Start the backend server
cd backend
start cmd /c "symfony server:start"
cd ..

endlocal
