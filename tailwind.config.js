const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      maxWidth: {
        smaller: "2.5rem",
        smallish: "5rem",
      },
      spacing: {
        blob1: "65rem",
      },
      colors: {
        thegray: "#070707",
        myYellow: "#ffbe0b",
        myOrange: "#fb5607",
        myPink: "#ff006e",
        myPurple: "#8338ec",
        myBlue: "#3a86ff",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        ArchivoBlack: ["Archivo Black", "system-ui", "sans-serif"],
        Archivo: ["Archivo", "system-ui", "sans-serif"],
        Mona: ["Mona-sans", "system-ui", "sans-serif"],
        Hublot: ["Hublot-sans", "system-ui", "sans-serif"],
      },
      blur: {
        "4xl": "4rem",
        "5xl": "6rem",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1) translateZ(0)",
          },
          "33%": {
            transform: "translate(15px, -25px) scale(1.1) translateZ(0)",
          },
          "66%": {
            transform: "translate(-10px, 10px) scale(0.9) translateZ(0)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1) translateZ(0)",
          },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        blob: "blob 7s infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
