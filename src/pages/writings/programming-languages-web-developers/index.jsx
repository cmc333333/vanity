import Link from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';

export default function Index() {
  return (
    <div>
      { setPageTitle('Programming Languages for Web Developers') }
      <p>
        I consider myself a programming languages connoisseur; I truly love to
        pick up new languages, take them for a spin, and pick apart their
        salient structures. Different languages offer different tools for
        problem solving, often suggesting more concise and elegant paradigms
        depending on the situation. Web developers (myself included) need to
        understand the trade offs used in different languages and systems to
        chose the cleanest, most efficient solution to the problems we face
        every day. With that in mind, I started writing a series of posts that
        should shed some light on the different features of different
        languages. These articles will not be language specific, but rather
        aggregate the differences across different languages.
      </p>
      <ul>
        <li>
          <Link to="/writings/programming-languages-web-developers/method-missing-method/">
            Method-Missing Method
          </Link>
        </li>
        <li>
          <Link to="/writings/programming-languages-web-developers/statically-typed-languages/">
            Statically Typed Languages
          </Link>
        </li>
      </ul>
    </div>
  );
}
