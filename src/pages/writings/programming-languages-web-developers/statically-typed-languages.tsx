import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";

const StaticallyTyped: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Statically Typed Languages">
    <p>
      Many languages, such as Java, Scala, and Haskell are &ldquo;statically
      typed&rdquo;, meaning that the &ldquo;type&rdquo; (often,
      &ldquo;class&rdquo;) of every variable can be calculated before the
      program is executed. The compiler can therefore deduce whether or not a
      given variable is capable of performing actions requested of it. For
      example,
    </p>
    <pre>
      <code>
        Integer i = new Integer(5);
        <br />
        i.toUpperCase();
      </code>
    </pre>
    <p>
      would never compile because the toUpperCase() method is not found on
      Integers (it is found on Strings). No compilation means the code will
      never run, which prevents errors from ever reaching the user.
    </p>
    <p>
      In addition, there are no additional checks needed at run time to verify
      that an object is capable of performing some action. This makes statically
      typed languages faster than their dynamic equivalents, as objects tend not
      to carry around a list of available methods/fields. If your code compiled
      (and there are no bugs in the compiler), every method call will execute{" "}
      <em>some</em> code.
    </p>
    <p>
      Tooling and refactoring also comes much easier to statically typed
      languages, as the tools (such as Eclipse, IntelliJ, and Visual Studio) can
      discover the types of your variables as you code. They can therefore let
      you know immediately what the parameters for a given function are as well
      as what methods are available on a particular object. This also makes
      refactoring require significantly less overhead. With some exceptions,
      once you&rsquo;ve refactored a method or object, you immediately know
      which other code relied on it (incompatibilities will not compile).
    </p>
    <p>
      This comes at a cost, however. With some exceptions, statically typed
      languages require extra annotations to alert the compiler of the
      author&rsquo;s intended purpose (think the first &ldquo;Integer&rdquo; in
      the Java example above). This may not seem especially cumbersome, but when
      dealing with higher-order types, you might run into an expression like:
    </p>
    <pre>
      <code>
        Pair&lt;String,List&lt;Pair&lt;Integer, Integer&gt;&gt;&gt;&gt;
        mapWithLabel =<br />
        {"    "}
        Pair&lt;String,List&lt;Pair&lt;Integer,Integer&gt;&gt;&gt;(&ldquo;Label&rdquo;,
        list);
      </code>
    </pre>
    <p>
      which is a relatively simple construct with a very difficult-to-parse
      syntax. Scala and Haskell get away with fewer type expressions with type
      inference. The Pair could be written as
    </p>
    <pre>
      <code>val mapWithLabel = (&ldquo;Label&rdquo;, list)</code>
    </pre>
    <p>
      and scala&rsquo;s compiler would need to discover what the most specific
      type mapWithLabel must be. Though Scala improves type inference
      drastically, it cannot do away with explicit types, which must be used on
      methods and anonymous functions. Haskell has an even more powerful type
      inference engine, but this style is not the norm; most statically typed
      languages (Java, C#, C, C++, etc.) have little to no type inference at
      all.
    </p>
    <p>
      Statically typed languages are often less flexible than their dynamic
      counterparts with regards to object structure. Fields and methods cannot
      be added to a given object at run time (i.e. dynamically), which may be
      cumbersome when dealing with less structured data. For example, parsing
      XML, JSON, or database queries results in less-than-ideal object mappings.
      Where in PHP, we can do something like:
    </p>
    <pre>
      <code>
        $xml = Parser::parse(&ldquo;&lt;person&gt;&lt;first&gt;Bob
        &lt;/first&gt;&lt;last&gt;Smith&lt;/last&gt;&lt;/person&gt;&rdquo;);
        <br />
        echo $xml-&gt;first; // &ldquo;Bob&rdquo;
        <br />
        echo $xml-&gt;last; // &ldquo;Smith&rdquo;
      </code>
    </pre>
    <p>the closest we can come in a static language is something like:</p>
    <pre>
      <code>
        Node xml = Node.parse(&ldquo;&lt;person&gt;&lt;first&gt;Bob
        &lt;/first&gt;&lt;last&gt;Smith&lt;/last&gt;&lt;/person&gt;&rdquo;);
        <br />
        println(xml.sub(&ldquo;first&rdquo;).toString());
        <br />
        println(xml.sub(&ldquo;last&rdquo;).toString());
      </code>
    </pre>
    <p>
      which is clearly not as elegant. In theory, a static language may add some
      syntactic sugar to statically account for dynamic structures more
      elegantly, but this would also defeat all of the benefits brought by the
      static model. Generally, developers of static languages will map dynamic
      structures to some static class, setting fields as necessary and throwing
      exceptions when the dynamic structure does not match the static class.
    </p>
    <ul>
      <li>
        <Link to="/writings/programming-languages-web-developers/method-missing-method/">
          &lt; Method-Missing Method
        </Link>
      </li>
    </ul>
  </Layout>
);
export default StaticallyTyped;
