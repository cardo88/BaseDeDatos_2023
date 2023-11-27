import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // Escucha en todas las interfaces de red
        port: 5173, // El puerto que deseas exponer, si es diferente del predeterminado
        // Agregar esta línea si estás detrás de un proxy y estás experimentando problemas de websocket
        // hmr: { 
        //   clientPort: 80
        // }
    },
});
