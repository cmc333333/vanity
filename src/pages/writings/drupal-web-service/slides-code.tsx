import { Link, withPrefix } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";

const SlidesCode: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Slides and Code">
    <iframe
      frameBorder="0"
      height="451"
      src="http://docs.google.com/present/embed?id=ds4jgcj_42hfbvr39z&amp;size=m"
      style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      title="Slides"
      width="555"
    />
    <ul>
      <li>
        <a
          href={withPrefix(
            "/static/drupal-web-service/drupal_as_a_web_service.zip"
          )}
        >
          Slide Deck
        </a>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/providing-new-services/">
          &lt; Providing New Services
        </Link>
      </li>
    </ul>
  </Layout>
);
export default SlidesCode;
