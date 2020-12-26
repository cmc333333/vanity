import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";

const CreditsLicense: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Credits and License">
    <p>
      Written by C.M. Lubinski, January 2008, with help from Marge M. Coahran,
      Janet Davis, Samuel A. Rebelsky, Christine Gerpheide, Emily Jacobson, Nick
      Hecker, Tony Leguia, and Ian Young. This document is licensed under a{" "}
      <a href="http://creativecommons.org/licenses/by-sa/3.0/us/">
        Creative Commons Attribution-ShareALike 3.0 United States License
      </a>
    </p>
    <ul>
      <li>
        <Link to="/writings/csc201-laboratory-vim/table-discussed-commands/">
          &lt; Table of Discussed Commands
        </Link>
      </li>
    </ul>
  </Layout>
);
export default CreditsLicense;
