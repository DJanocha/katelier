import plugin from "tailwindcss/plugin";
import { withUt } from "uploadthing/tw";
import { z } from "zod";

const neonReadyValidator = z.object({
  "200": z.string(),
  "700": z.string(),
});

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ["class"],
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        "photo-width": "300px",
        "photo-height": "400px",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        "main-layout-gradient-from": "#2e026d",
        "main-layout-gradient-via": "#22124D",
        "main-layout-gradient-to": "#15162c",
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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [
    require("tailwindcss-animate"),

    plugin(function ({ addUtilities, theme }) {
      const neonUtilities: Record<string, { boxShadow: string }> = {};
      const colors = theme("colors");
      if (!colors) {
        return;
      }
      for (const color in colors) {
        const _colorConfig: unknown = colors[color];
        try {
          const colorConfig = neonReadyValidator.parse(_colorConfig);
          neonUtilities[`.neon-${color}`] = {
            boxShadow: `0 0 5px ${colorConfig["200"]}, 0 0 20px ${colorConfig["700"]}`,
          };
        } catch (error) {}
      }
      addUtilities(neonUtilities)
    }),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value: string) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      );
    }),
  ],
});
