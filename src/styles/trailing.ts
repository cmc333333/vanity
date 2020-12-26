import { CSSObject } from "@emotion/serialize";

import { spacing } from "./typography";

const trailingStr: (content: string) => CSSObject = (content) => ({
  "::after": {
    content,
    marginRight: spacing(1 / 4),
  },
});

export const trailingComma = trailingStr('", "');
export const trailingColon = trailingStr('": "');
