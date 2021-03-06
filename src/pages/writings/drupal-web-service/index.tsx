import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";

const Index: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Drupal as a Web Service">
    <p>
      I gave a{" "}
      <a href="http://2009.drupalcampchicago.org/sessions/drupal-web-service">
        talk
      </a>{" "}
      at{" "}
      <a href="http://2009.drupalcampchicago.org">Drupal Camp Chicago 2009</a>{" "}
      discussing how to connect other applications to your Drupal site by
      turning it in to a web service. The talk had pretty good attendance, and I
      thought someone recorded it, but I cannot find that anywhere online.
      Instead, I&rsquo;m in the process of converting the talk into an web
      accessible format which will hopefully serve as an adequate reference.
      Until this is complete, please jump ahead to the{" "}
      <Link to="/writings/drupal-web-service/slides-code/">
        Slides and Example Code
      </Link>
      , which contain the bulk of the information.
    </p>
    <ul>
      <li>
        <Link to="/writings/drupal-web-service/web-services/">
          Web Services
        </Link>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/drupals-services-module/">
          Drupal&rsquo;s Services Module
        </Link>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/accessing-drupal-through-web-services/">
          Accessing Drupal through Web Services
        </Link>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/php-adding-some-structure/">
          PHP: Adding Some Structure
        </Link>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/providing-new-services/">
          Providing New Services
        </Link>
      </li>
      <li>
        <Link to="/writings/drupal-web-service/slides-code/">
          Slides and Code
        </Link>
      </li>
    </ul>
  </Layout>
);
export default Index;
