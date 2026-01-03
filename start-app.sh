#!/bin/bash
echo "--- INICIANDO INSTALACIÓN Y EJECUCIÓN ---"

echo "Comenzando con el Backend..."
cd backend
npm install
# Inicia el backend
npm run start &
BACKEND_PID=$!
cd ..

echo "Comenzando con el Frontend..."
cd frontend
npm install
echo ">>> ABRIENDO APLICACIÓN..."
# Inicia frontend
npm run dev

echo "El frontend está disponible en http://localhost:5173"
echo "El backend está disponible en http://localhost:3000"

# Cuando cierre el frontend, tambien cierra el backend
kill $BACKEND_PID
echo "--- APLICACIÓN FINALIZADA ---"