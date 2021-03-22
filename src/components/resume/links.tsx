import * as React from "react";

import * as resume from "../../assets/lubinski-resume.pdf";
import { columns, row } from "../../styles/grid";

const docsUrl =
  "https://docs.google.com/document/d/1nFCipBWbs1MdUyeLDZPDicVuq2LUvO2vqOA3numHDvg/edit";

const Links: React.FC = () => (
  <div css={{ ...row, marginBottom: "1rem" }}>
    <section css={columns({ small: 6 })}>
      <a href={resume}>PDF Version</a>
    </section>
    <section css={{ ...columns({ small: 6 }), textAlign: "right" }}>
      <a href={docsUrl}>Google Drive Version</a>
    </section>
  </div>
);
export default Links;
