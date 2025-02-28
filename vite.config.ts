import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: "/rip_front",
  server: {
    //host: '192.168.31.8', // Укажите IP-адрес
    //port: 3000,      
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
       "/minio": {
        target: "http://192.168.31.8:9000",
        changeOrigin: true,
        secure: false, // Позволяет работать без HTTPS
        rewrite: (path) => path.replace(/^\/minio/, ""),
      },
      "/graphql": {
        target: "http://localhost:8000"
      }
    },
    
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    host: '0.0.0.0', // Чтобы доступ был извне виртуалки
    port: 3000, // Порт на который будет доступно приложение
  },
});