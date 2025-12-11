/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./modules/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          // light: "#e8e8e8", // čistá biela
          //light: "#f6f6f6", // LEPSIA ako ta nad nou
          light: "#F9FAFB", // čistá biela
          dark: "#161616", // tmavá (dark mode)
          cardLight: "#F2F2F2",
          cardDark: "#27272a",
          modalLight: "rgba(255,255,255,0.3)",
          modalDark: "rgba(0,0,0,0.6)",
          subtleLight: "#f0f0f0", // jemne svetlá pre pastelové témy
          subtleDark: "#3f3f46",
        },
        text: {
          //primaryLight: "#5d5d5d", // jemná čierna, nie úplne čierna
          primaryLight: "#454545", // jemná čierna, nie úplne čierna
          primaryDark: "#e4e4e4", // biela pre dark mode
          secondaryLight: "#52525b", // tmavo-sivá
          secondaryDark: "#a1a1aa",
          mutedLight: "#737373", // jemnejšia šedá
          mutedDark: "#9ca3af",
        },
        accent: {
          cyan: "#22d3ee",
          indigo: "#818cf8",
          emerald: "#34d399",
          rose: "#fb7185",
        },
      },
    },
    fontFamily: {
      inter: ["Inter_400Regular", "sans-serif"], // default font
      interBold: ["Inter_700Bold", "sans-serif"], // pre bold text
    },
  },
  plugins: [],
};
