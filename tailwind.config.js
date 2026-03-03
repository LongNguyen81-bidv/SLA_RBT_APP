/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    900: '#030712',
                    800: '#0f172a',
                    700: '#1e293b'
                }
            },
            fontFamily: {
                sans: [
                    'Be Vietnam Pro',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'sans-serif',
                ],
                mono: [
                    'IBM Plex Mono',
                    'source-code-pro',
                    'Menlo',
                    'Monaco',
                    'Consolas',
                    'monospace'
                ]
            }
        }
    },
    plugins: []
};
