import { FontFamily, FontWeight } from "../../../type/common";

export type TypographyType = "tiny" | "small" | "base" | "large" | "huge";

interface TypographyOptions {
  fontSize: number;
  color?: string;
  fontWeight: FontWeight;
  fontFamily: FontFamily;
}
export const TypographyTheme: { [T in TypographyType]: TypographyOptions } = {
  tiny: {
    fontSize: 13,
    fontWeight: "100",
    fontFamily: "Kanit-Medium",
  },
  small: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Kanit-Regular",
  },
  base: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
    fontFamily: "Kanit-Medium",
  },
  large: {
    fontSize: 36,
    fontWeight: "500",
    fontFamily: "Kanit-Light",
  },
  huge: {
    fontSize: 52,
    fontWeight: "800",
    fontFamily: "Kanit-SemiBold",
  },
};
