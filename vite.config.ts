import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5174,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});

// export default defineConfig({
//     plugins: [react()],
//     server: {
//         port: 5174,
//         https: {
//             key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
//             cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
//         },
//         host: 'localhost',
//     },
//     resolve: {
//         alias: {
//             '@': path.resolve(__dirname, './src'),
//         },
//     },
// });
