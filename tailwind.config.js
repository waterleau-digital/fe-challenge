/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // Design system colors using CSS variables
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "var(--color-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "var(--color-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          foreground: "var(--color-accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--color-popover)",
          foreground: "var(--color-popover-foreground)",
        },
        card: {
          DEFAULT: "var(--color-card)",
          foreground: "var(--color-card-foreground)",
        },
        
        // Status colors
        warning: {
          DEFAULT: "var(--color-warning)",
          foreground: "var(--color-warning-foreground)",
          background: "var(--color-warning-background)",
          border: "var(--color-warning-border)",
        },
        success: {
          DEFAULT: "var(--color-success)",
          foreground: "var(--color-success-foreground)",
          background: "var(--color-success-background)",
          border: "var(--color-success-border)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          foreground: "var(--color-info-foreground)",
          background: "var(--color-info-background)",
          border: "var(--color-info-border)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          foreground: "var(--color-error-foreground)",
          background: "var(--color-error-background)",
          border: "var(--color-error-border)",
        },
        
        // Brand colors
        brand: {
          50: "var(--brand-primary-50)",
          100: "var(--brand-primary-100)",
          200: "var(--brand-primary-200)",
          300: "var(--brand-primary-300)",
          400: "var(--brand-primary-400)",
          500: "var(--brand-primary-500)",
          600: "var(--brand-primary-600)",
          700: "var(--brand-primary-700)",
          800: "var(--brand-primary-800)",
          900: "var(--brand-primary-900)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        '1': "var(--elevation-1)",
        '2': "var(--elevation-2)",
        '3': "var(--elevation-3)",
        '4': "var(--elevation-4)",
        'brand': "var(--elevation-brand)",
      },
      fontFamily: {
        'brand': "var(--font-brand)",
      },
      fontSize: {
        'headline-lg': "var(--font-headline-lg)",
        'headline-md': "var(--font-headline-md)",
        'title-lg': "var(--font-title-lg)",
        'title-md': "var(--font-title-md)",
        'body-lg': "var(--font-body-lg)",
        'body-md': "var(--font-body-md)",
        'label-lg': "var(--font-label-lg)",
        'label-md': "var(--font-label-md)",
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
  plugins: [],
}