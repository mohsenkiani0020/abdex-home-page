/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,css,scss}', // adjust for your project
    // you might need to include other paths where you have Tailwind classes
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        'PrimaryMain': '#FB6535',
        'PrimaryTint1': '#FFF7F5',
        'PrimaryTint2': '#FED8CC',
        'PrimaryTint3': '#FCB29A',
        'PrimaryShade1': '#B04725',
        'PrimaryShade2': '#642815',
        'PrimaryShade3': '#32140B',
        
        // Tertiary colors
        'TertiaryMain': '#D69E5C',
        'TertiaryTint1': '#FDFAF7',
        'TertiaryTint2': '#F5E6D6',
        'TertiaryTint3': '#EACEAD',
        'TertiaryShade1': '#966E40',
        'TertiaryShade2': '#563F25',
        'TertiaryShade3': '#151009',
          
        // Gray colors
        'GrayMain': '#B4B3B2',
        'GrayTint1': '#FBFBFB',
        'GrayTint2': '#ECEBEB',
        'GrayTint3': '#D9D8D8',
        'GrayShade1': '#7E7D7D',
        'GrayShade2': '#484747',
        'GrayShade3': '#121212',
        
        // Secondary colors
        'SecondaryMain': '#FCDC73',
        'SecondaryTint1': '#FFFDF8',
        'SecondaryTint2': '#FEF6DC',
        'SecondaryTint3': '#FDEDB9',
        'SecondaryShade1': '#B09A51',
        'SecondaryShade2': '#65582E',
        'SecondaryShade3': '#19160C',

        // Error colors
        'ErrorMain': '#DC3545',
        'ErrorBg': '#FEF7F8',

        // Success colors
        'SuccessMain': '#28A745',
        'SuccessBg': '#F7FCF8',

        // Warning colors
        'WarningMain': '#FFC107',
        'WarningBg': '#FFFDF5',

        'NavBg' : '#FAF2EB'

      },
    },
  },
  plugins: [],
}

