import jsTypography from "./setup";

interface TypographyInterface {
  rhythm: (lines?: number) => string;
  scale: (size: number) => { fontSize: string; lineHeight: string };
}

const typography = jsTypography as TypographyInterface;
export default typography;
export const spacing = typography.rhythm;
export const scaleText = typography.scale;
