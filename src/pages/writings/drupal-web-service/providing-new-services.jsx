import { Link } from 'gatsby';
import React from 'react';

import Layout, { writingsSidebar } from '../../../layouts';

export default function ProvidingNewServices() {
  return (
    <Layout sidebar={writingsSidebar} title="Providing New Services">
      <p>
        The final topic for this presentation regarding adding new services
        for your Drupal site. Before we dive in to the code, I wanted to take
        a moment to discuss why such services might be useful and to warn
        about several potential pitfalls regarding these APIs.
      </p>
      <p>
        Adding your own web services allows you to share data and
        functionality easily amongst your applications, whether they be Drupal
        or otherwise. For example, say you have a dozen client sites which are
        configured to alert another, master site whenever they have problems.
        You could have either your client sites all provide services so that
        your master site could poll them, or you could have the master site
        services enabled and allow the client sites to push to it (I favor the
        latter). As another example, I should note that I work on a non-Drupal
        PHP application which is complex enough to warrant often-changing help
        documentation. Since each of our clients has their own instance of our
        application and we want to make sure they all have the same
        documentation, we centralize this in a single Drupal site, which our
        client sites pull from nightly.
      </p>
      <p>
        Another common use for adding your own web services involves making
        desktop and mobile apps. You may want users to post comments or upload
        data from their phones without having to deal with your web interface.
        In these situations, creating a new web service may be essential so
        that you (or other app developers) can access your site without a
        browser. Further, by publishing an API for users, you join the ranks
        of Twitter, Facebook, and Meetup.com; you will be officially Web 2.0
        ready.
      </p>
      <p>
        When you are designing your API, you will want to keep a few things in
        mind. First, remember that you need to escape your SQL, avoid
        cross-site scripting, and pay attention to permission escalation bugs
        just as you would with any other module you develop. You
        shouldn&rsquo;t trust web services users any more than you would trust
        your HTML users (which should be not-at-all,) because although
        accessing web services is a bit more complicated, it&rsquo;s just an
        extra hurdle for a determined user. When designing your API, remember
        also to require the hash-based authentication whenever
        creating/modifying data. The added security confirms that the user is
        who he/she claims to be and provides a tidy audit trail should
        anything go wrong.
      </p>
      <p>
        Finally, be sure to think your API through before you start developing
        it. Creating an API and then altering it is not only a hassle, but
        will surely cost some customers. Before any user can write his/her own
        application on top of your API, he/she must believe that your API is
        stable; changing method names or parameters will break this stability.
      </p>
      <ul>
        <li>
          <Link to="/writings/drupal-web-service/php-adding-some-structure/">
            &lt; PHP : Adding Some Structure
          </Link>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/slides-code/">
            Slides and Code &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
