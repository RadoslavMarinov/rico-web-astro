/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			boxShadow :{
				"riko": "0px 2px 8px green" 
			}
		},
	},
	plugins: [],
}
