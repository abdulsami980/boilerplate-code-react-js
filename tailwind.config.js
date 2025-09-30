export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // 👈 toggle via class
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", 
          dark: "#4F46E5",
          light: "#A5B4FC",
        },
      },
    },
  },
  plugins: [],
};
