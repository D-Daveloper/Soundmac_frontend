/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E74C3C",
        mobile_nav: "rgba(34, 134, 153, 0.47)",
        text: "#0B0B0B",
        homebg: "#f4f4f4",
        icon: "#10414A",
      },
    },
  },
  plugins: [],
};
