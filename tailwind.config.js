/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        qv: {
          royal: "#0E4066",
          gold: "#8C7958",
          chrome: "#939799",
          black: "#222221",
          ivory: "#F5F3EF",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        surface: "hsl(var(--surface))",
        "surface-contrast": "hsl(var(--surface-contrast))",
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
      fontFamily: {
        primary: ["var(--font-primary)", "Poppins", "sans-serif"],
        secondary: ["var(--font-secondary)", "Noto Sans Thai", "sans-serif"],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 0.25rem)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 0.25rem)",
        sm: "calc(var(--radius) - 0.45rem)",
      },
      boxShadow: {
        "qv-soft": "0 20px 45px -30px rgba(14, 64, 102, 0.7), inset 0 1px 0 rgba(140, 121, 88, 0.2)",
        "qv-gold": "0 10px 25px -20px rgba(140, 121, 88, 0.8), 0 0 0 1px rgba(147, 151, 153, 0.2)",
      },
      backgroundImage: {
        "qv-gold-gradient": "linear-gradient(135deg, rgba(140, 121, 88, 0.95) 0%, rgba(238, 221, 188, 0.4) 40%, rgba(140, 121, 88, 0.9) 100%)",
        "qv-midnight-gradient": "radial-gradient(circle at top, rgba(14, 64, 102, 0.8), rgba(34, 34, 33, 0.95))",
      },
      keyframes: {
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
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}