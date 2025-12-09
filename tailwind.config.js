/* Config file for Tailwind (styles).
 * Uses:
 *  - Here you can set up custom classes for colors, margin, padding etc...
 *
 * More info: https://v2.tailwindcss.com/docs/configuration
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],
    darkMode: 'class',
    presets: [require('nativewind/preset')],
    theme: {
        extend: {
            fontSize: {
                title: '64px',
                widgetLabel: '14px',
                h1: '48px',
                h2: '32px',
                h3: '24px',
                body: '20px',
                button: '20px',
            },
        },
    },
    plugins: [],
};
