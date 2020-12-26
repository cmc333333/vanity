import { CSSObject } from "@emotion/serialize";

const mediaQueries = {
  medium: "@media (min-width: 640px)",
  large: "@media (min-width: 1024px)",
};
export default mediaQueries;

interface HideOnArgs {
  small?: boolean;
  medium?: boolean;
  large?: boolean;
}

export const hideOn: (sizes: HideOnArgs) => CSSObject = ({
  small,
  medium,
  large,
}) => ({
  display: small ? "none" : "inherit",
  [mediaQueries.medium]: {
    display: medium ? "none" : "inherit",
  },
  [mediaQueries.large]: {
    display: large ? "none" : "inherit",
  },
});
