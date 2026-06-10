import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F5F1EA",
        espresso: "#2C2A26",
        sand: "#A89078",
        sage: "#6B7A5A",
        bone: "#EDE6D9"
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
