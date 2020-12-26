import * as React from "react";

import * as resume from "../../assets/lubinski-resume.pdf";
import { columns, row } from "../../styles/grid";

const docsUrl =
  "https://docs.google.com/document/d/16djyBXmJ1mij0uM76wzmT_fkgnihqvBGocLnyPUngDY/edit";

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
