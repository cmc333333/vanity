import Link, { withPrefix } from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';

export default function SlidesCode() {
  return (
    <div>
      { setPageTitle('Slides and Code') }
      <iframe
        frameBorder="0"
        height="451"
        src="http://docs.google.com/present/embed?id=ds4jgcj_42hfbvr39z&amp;size=m"
        style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        title="Slides"
        width="555"
      />
      <ul>
        <li>
          <a href={withPrefix('/static/drupal-web-service/drupal_as_a_web_service.zip')}>
            Slide Deck
          </a>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/providing-new-services/">
            &lt; Providing New Services
          </Link>
        </li>
      </ul>
    </div>
  );
}
