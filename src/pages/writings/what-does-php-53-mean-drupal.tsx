import * as React from "react";

import Layout, { writingsSidebar } from "../../layouts";

const PHP53: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="What Does PHP 5.3 Mean for Drupal?">
    <p>
      For Drupal Camp Chicago 2010, I presented on PHP 5.3 for Drupal
      developers. I focused on the new features of the new version, emphasizing
      how they could be used within a Drupal module. Overall, I think the topic
      was a bit too dry, but I think that the audience might have learned a
      thing or two. As soon as the video is online, I&rsquo;ll post that here,
      but for now, I&rsquo;ve embedded the google doc.
    </p>
    <iframe
      frameBorder="0"
      height="451"
      src="http://docs.google.com/present/embed?id=ds4jgcj_50dtvh4hgc&amp;size=m"
      style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      title="slides"
      width="555"
    />
    <p>
      Or, see the <a href="http://www.cdmug.org/node/244">video</a>
    </p>
  </Layout>
);
export default PHP53;
