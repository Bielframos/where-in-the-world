const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	plugins: [require('./tailwind-plugin-auto-fill.cjs'), require('./tailwind-plugin-auto-fit.cjs'), require('prettier-plugin-tailwindcss')]
}
