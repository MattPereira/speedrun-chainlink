/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "scaffoldEthDark",
  // DaisyUI theme colors
  daisyui: {
    themes: [
      {
        scaffoldEth: {
          primary: "#EDF2F7",
          "primary-content": "#1A202C",
          // "primary-content": "#212638",
          // secondary: "#DAE8FF",
          // "secondary-content": "#212638",
          accent: "#38A169",
          "accent-content": "#ffffff",
          neutral: "#212638",
          "neutral-content": "#ffffff",
          // COMPLEX COLORS DONT WORK WITH DAISYUI THEME
          // "base-100":
          //   "background: linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)),linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04))",
          // HEX COLORS WITH OPACITY DONT WORK WITH DAISYUI THEME
          // "base-200": "#FFFFFF0F",
          "base-300": "#040407", // this sets bg color for whole app
          "base-content": "#ffffff",
          info: "#93BBFB",
          success: "#34EEB6",
          warning: "#FFCF72",
          error: "#FF8863",

          // "--rounded-btn": "9999rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
      // {
      //   scaffoldEthDark: {
      //     primary: "#212638",
      //     "primary-content": "#F9FBFF",
      //     secondary: "#323f61",
      //     "secondary-content": "#F9FBFF",
      //     accent: "#FFBF00",
      //     "accent-focus": "#E5AC00",
      //     "accent-content": "#F9FBFF",
      //     neutral: "#F9FBFF",
      //     "neutral-content": "#385183",
      //     "base-100": "#385183",
      //     "base-200": "#2A3655",
      //     "base-300": "#212638",
      //     "base-content": "#F9FBFF",
      //     info: "#385183",
      //     success: "#34EEB6",
      //     warning: "#FFCF72",
      //     error: "#FF8863",

      //     "--rounded-btn": "9999rem",

      //     ".tooltip": {
      //       "--tooltip-tail": "6px",
      //       "--tooltip-color": "hsl(var(--p))",
      //     },
      //     ".link": {
      //       textUnderlineOffset: "2px",
      //     },
      //     ".link:hover": {
      //       opacity: "80%",
      //     },
      //   },
      // },
    ],
  },
  theme: {
    // Extend Tailwind classes (e.g. font-bai-jamjuree, animate-grow)
    extend: {
      colors: {
        secondary: "#FFFFFF3D",
        "base-100": "#FFFFFF0A",
        "base-200": "#FFFFFF0F",
        "base-300": "#040407",
        "base-content": "#FFFFFFCC",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        cubano: ["cubano", "sans-serif"],
      },
      boxShadow: {
        center: "0 0 12px -2px rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        grow: {
          "0%": {
            width: "0%",
          },
          "100%": {
            width: "100%",
          },
        },
        zoom: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.1, 1.1)" },
        },
      },
      animation: {
        grow: "grow 5s linear infinite",
        "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        zoom: "zoom 1s ease infinite",
      },
    },
  },
};
