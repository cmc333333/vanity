import Link from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';

export default function DrupalsServicesModule() {
  return (
    <div>
      { setPageTitle("Drupal's Services Module") }
      <p>
        Luckily, Drupal has the{' '}
        <a href="http://drupal.org/project/services">Services</a> module,
        which does most of the work for us. This module allows communications
        through XMLRPC, a simple protocol for remote procedures over XML;
        JSON, the Javascript object notation; REST, a stateless, modern
        interface; SOAP, a heavier protocol for remote procedures over XML;
        AMF, the system required to speak with Flash programs; and many other
        acronyms. The Services module is relatively easy to extend, so other
        communications protocols may be added in the future without affecting
        the core functionality.
      </p>
      <p>
        The Services module uses API keys, which allow you as the site admin
        to give out and revoke access through these interfaces whenever you
        see fit. In general, this is a very powerful tool employed by almost
        all service providers as it allows you to track who is accessing what
        and limit/grant access as needed. At the moment, the Services module
        provides rudimentary systems for these API keys, allowing you to
        create and revoke them as needed.
      </p>
      <p>
        In general, you&rsquo;ll find the documentation for this module a bit
        lacking. Most of it centers on AMF because (as far as I am aware)
        Services + AMF is the only way to create a Flash-based Drupal site.
        Unfortunately, much of the documentation is out of date or oddly
        specific. There is a{' '}
        <a href="http://groups.drupal.org/services">
          Services Group
        </a> which can probably answer your questions much better than the
        existing documentation, though you should, of course, fix said
        documentation ;).
      </p>
      <h2>Provided Modules</h2>
      <p>
        The Services project is actually a collection of several modules;
        there are also additional modules for providing more functionality.
        All of these modules basically fall into one of two categories. The
        first, &ldquo;Servers,&rdquo; represent entry points (i.e. protocols)
        to your site. As mentioned before, these include JSON, REST, and
        XMLRPC (which comes included with the Services project). All examples
        in this presentation will utilize XMLRPC because it is in the base
        project, it has lots of library support, and it&rsquo;s very simple to
        model.
      </p>
      <p>
        The other category, &ldquo;Services,&rdquo; represent the
        functionality which you&rsquo;d like to make accessible to others. For
        example, the Services project comes with the Node service, which
        allows you to get, save, and delete nodes from afar. We&rsquo;ll
        discuss this service as well as the System service, which allows for
        connecting to the server, getting/setting variables and checking which
        services are available, as well as the User service, which allows us
        to log in as a particular user and manage users. The project also
        provides services for accessing files, menus, search results,
        taxonomies, and views.
      </p>
      <h2>Permissions and Users</h2>
      <p>
        The developers of the Services module chose a very elegant solution
        for dealing with permissions/users. Instead of implementing their own
        services-specific framework, they chose to reuse Drupal&rsquo;s core
        user functionality. This means that every service request is performed
        as a specific user (including the anonymous user), and the ability to
        access these nodes, etc. is limited based on that user&rsquo;s
        permissions. This has several implications on how you&rsquo;ll need to
        set up user permissions, but the first of which is that you will need
        to grant the anonymous user permission to access services. This is
        because no user begins their existence logged in; they always start as
        an anonymous user and then sign in. Following the same scheme, your
        service receiver will start its existence as the anonymous user and
        then (usually) log in as another user.
      </p>
      <p>
        As I see it, there are two basic models for structuring how your
        Drupal users relate to services. In the first model, you can extend
        existing logins by adding additional service permissions to them. This
        mechanism is particularly good if you need a paper trail, for example
        if you will be allowing users to update content through services.
        Unfortunately, this mechanism also requires that you personally keep
        track of which users have what access, which I find is more pain than
        it is worth. The alternative is to use a more Unix-style
        &ldquo;daemon&rdquo; user for each service. In this way <em>all</em>{' '}
        services that need to search (for example) act as the same user. This
        is useful for anonymous, read-only services where it is more important
        to know how often particular services are used rather than which user
        is using them. The analogue would be apache, which acts as the
        www-data user regardless of the ip address accessing your server.
      </p>
      <p>
        Before we get too much further, I wanted to note that on several
        installations of the Services module, I&rsquo;ve needed to rebuild
        user permissions. If you see that you should be able to access a
        service but cannot, try rebuilding these permissions in Admin &gt;
        Content Management &gt;Post Settings. I&rsquo;m not too sure what the
        problem is, nor if it has been fixed in later versions.
      </p>
      <h2>The Web UI</h2>
      <p>
        The Services module offers a highly functional web ui which allows you
        to not only handle administrative tasks, but also test your services.
        You may find this UI (once Services is installed) at Admin &gt; Site
        Building &gt; Services. You&rsquo;ll first notice the API Key
        management tool which allows you to manage your API keys. Services are
        not accessible to anyone; you must generate a key for users to specify
        when accessing your services. At the moment, this interface forces API
        keys to be generated by a system admin, though I don&rsquo;t see any
        reason why you couldn&rsquo;t develop a module which auto-generates
        these per user. This is also the location to revoke access for a
        specific key. As soon as you do this, that user will no longer have
        access to any of the services you granted to that key. Note that when
        generating keys, you give both an application title and allowed
        domain. The title is a way to signify the purpose of this key/who will
        be using it. I believe the <em>purpose</em> of the domain was to
        restrict key access to only certain IPs/domains, but this
        doesn&rsquo;t appear to be implemented at this time. In fact, as we
        will see in a moment, the service receiver simply provides the
        &ldquo;domain&rdquo; string as a parameter when accessing services.
      </p>
      <p>
        You will also see your API documentation, which describes exactly what
        services, what parameters they require, and what type of data they
        should give back. This information is what you will want to publish
        elsewhere on your site so that users will know how to access your
        services; they will also be able to retrieve this information from the
        &ldquo;system&rdquo; service, which we will discuss in a moment. These
        pages also provide an interface for testing your methods to confirm
        that they return the right data without forcing you to connect via
        XMLRPC, JSON, etc.
      </p>
      <p>
        It&rsquo;s important to note that viewing/testing these services
        requires a url of the form
        /admin/build/services/browse/servicename.method . That is, the urls
        include a period, which may confuse certain web server configurations
        which treat any url with a period as a file path (rather than
        rewriting into &ldquo;clean URLs&rdquo;). If you can&rsquo;t view the
        documentation, these web server rules are probably to blame. For
        example, in my lighttpd configuration, I&rsquo;ve added
      </p>
      <pre>
        <code>
          &ldquo;^/admin/build/services/browse/(.*)\.(.*)$&rdquo;
          =&gt;
          &ldquo;/index.php?q=admin/build/services/browse/$1.$2&rdquo;
        </code>
      </pre>
      <p>
        to the top of the list of url rewrites. Whenever one of the Services
        api pages is hit, this rule will rewrite it use the q= parameter,
        which would not normally occur since there is a period within the url.
      </p>
      <ul>
        <li>
          <Link to="/writings/drupal-web-service/web-services/">
            &lt; Web Services
          </Link>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/accessing-drupal-through-web-services/">
            Accessing Drupal through Web Services &gt;
          </Link>
        </li>
      </ul>
    </div>
  );
}

