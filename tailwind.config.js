/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        appcolor: "#05553e",
        hoverColor:"#05553e8f"
      
      },
      backgroundImage: {
        "page-pic": "url('/src/imgs/Home/image 1.png')",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          //     primary: "#05553e",
          //     secondary: "#05553e",
          //     accent: "#05553e",
          //     neutral: "#05553e",
          "base-100": "#f5f5f5",
          //     "background-color":"#05553e"
        },
      },
    ],
  },
};
