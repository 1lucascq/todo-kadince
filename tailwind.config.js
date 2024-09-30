/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
			colors: {
				kBg: '#323232',
				'kBg-light': '#e5e7eb',
				kGreen: '#CBE068',
				kDarkGreen: '#9EB441',
				kBlack: '#555',
			},
		},
    },
    plugins: [],
};
