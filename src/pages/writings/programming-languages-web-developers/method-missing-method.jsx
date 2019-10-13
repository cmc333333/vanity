import { Link } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import setPageTitle from '../../../util/set-page-title';

export default function MethodMissingMethods() {
  return (
    <Layout>
      { setPageTitle('Method-Missing Method') }
      <p>
        A concept which may not arise for a static programmer is the idea of a
        method-missing <em>method</em>. This is a &ldquo;magic&rdquo; method
        on an object that should be called whenever the object cannot fulfill
        a request. That&rsquo;s a bit confusing, so let&rsquo;s think about
        this as a message passing system.
      </p>
      <p>
        Say there is an object of the Squid class named squidy. I could
        request that squidy eject ink by writing &ldquo;ejectInk&rdquo; on a
        piece of paper and then delivering that message to it. It&rsquo;s then
        up to the Squid to figure out whether or not it is capable of
        performing the requested action (and whether it wants to, but
        that&rsquo;s a separate issue). In this case, squidy would eject its
        ink because it is of a class (Squid) which implements the ejectInk
        method.
      </p>
      <p>
        What if, instead, I wrote &ldquo;bark&rdquo; on the piece of paper?
        The Squid receives the message but doesn&rsquo;t understand it. Most
        animals (classes) would assume that I was crazy and respond
        accordingly (throw an Exception), but it doesn&rsquo;t have to be that
        way. The Squid class, for example, could be programmed in such a way
        that it alerts the zoo-keeper and then ejects its ink (best effort).
        This is the essence of a method-missing method. When a method is
        called on an object that does not implement said method, several
        programming languages allow the call to be &ldquo;caught&rdquo; and
        handled by yet another method.
      </p>
      <p>
        Ruby provides this mechanism via the override-able method_missing()
        method on all classes; PHP has a magic __call() method; Javascript has
        the __noSuchMethod__() method (at least in Firefox). Python has a
        similarly magic __getattr__() method, which can be used to implement
        the same functionality (though it can be used for any attribute).
      </p>
      <p>
        So why is this helpful? The simplest use case is to serve as a
        fallback/safety mechanism. If you aren&rsquo;t positive that each
        method call will land on the proper object, you can use the
        method-missing method to log the problem. I&rsquo;d argue that this
        indicates serious flaws in your system, but it&rsquo;s conceivable
        that this could occur while refactoring, particularly in languages
        where code can be dynamically generated and executed.
      </p>
      <p>
        A more common use case is to implement delegation (e.g. the Decorator
        pattern) -- when you&rsquo;d like one object to send all methods that
        it does not implement to another object. For example, say you have a
        Button class that does all of the work of creating a nice HTML button
        and handling its validation, etc. You may want to write a wrapper
        class, AjaxButton which delegates most methods to Button, but adds and
        overrides others. As an aside, you may be asking why not do this
        through class inheritance? There are plenty of language-specific
        reasons, but they largely boil down to dynamic dispatch offers more
        flexibility than static dispatch -- but that will be discussed
        elsewhere.
      </p>
      <p>
        Before you add any of these methods to your classes, think hard. The
        method-missing method results in less intuitive code as the path of
        execution is no longer simple; methods may now be hidden as strings,
        symbols, etc. rather than living in the same space as the other
        methods of a given object. This will often result in unexpected
        side-effects, meaning your code becomes less stable. Furthermore,{' '}
        <em>needing</em> to implement such magic methods usually means your
        system has a design flaw. When writing method calls, developers should
        already know whether or not an object will have a given method. How
        else could they expect their code to work? Finally, though less
        importantly, calls to the method-missing method are almost always
        slower than a traditional method call. Not only does the run-time
        system need to check whether the method exists, but it must also
        convert it into a data-structure that your program may understand,
        then pop a separate method call onto the stack.
      </p>
      <ul>
        <li>
          <Link to="/writings/programming-languages-web-developers/">
            &lt; Programming Languages for Web Developers
          </Link>
        </li>
        <li>
          <Link to="/writings/programming-languages-web-developers/statically-typed-languages">
            Statically Typed Languages &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
