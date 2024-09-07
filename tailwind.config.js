/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "var(--mainBg)",
        myPrimary: "var(--myPrimary)",
        textColor: "var(--textColor)",
        textColorBahet: "var(--textColorBahet)",
        inputColor: "var(--inputColor)",
        inputHoverColor: "var(--inputHoverColor)",
        newBoxesColor: "var(--newBoxesColor)",
        newBoxesBorder: "var(--newBoxesBorder)",
        skeletonBg: "var(--skeletonBg)",
      },
    },
  },
  plugins: [],
};
