import { responsiveHeight, responsiveWidth } from "./utils/responsive";

const settings = {
  name: "candidate-app",
  title: "candidate",
  description: "For Assignment Test - Mobile Developer ",
  theme: {
    primary: "#00664F",
    secondary: "#7DB1A4",
    buttonText: "white",
    text: "black",
    shadow: "rgba(0,0,0,.5)",
  },
  alert: {
    no_service: "ยังไม่พร้อมให้บริการ",
  },
  space: {
    padding: responsiveWidth(24),
  },
  header: {
    height: responsiveHeight(100),
  },
};

export default settings;
