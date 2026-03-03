/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}', './public/index.html'
    ],
    theme: {
        extend: {
            colors: {
                bidv: {
                    green: '#004D40',
                    'green-dark': '#003329',
                    'green-mid': '#00695C',
                    'green-light': '#00897B',
                    'green-tint': '#E0F2F1',
                    'green-surface': '#F1FAF9',
                    gold: '#C9A84C',
                    'gold-light': '#E8C97A',
                    'gold-dark': '#A8862E'
                },
                surface: {
                    50: '#F8FFFE',
                    100: '#F1F8F5',
                    200: '#E0F0EC'
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
