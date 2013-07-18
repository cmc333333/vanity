---
title: Statically Typed Languages
---
Many languages, such as Java, Scala, and Haskell are "statically typed", meaning that the "type" (often, "class") of every variable can be calculated before the program is executed. The compiler can therefore deduce whether or not a given variable is capable of performing actions requested of it. For example,

    Integer i = new Integer(5); 
    i.toUpperCase(); 

would never compile because the toUpperCase() method is not found on Integers (it is found on Strings). No compilation means the code will never run, which prevents errors from ever reaching the user.

In addition, there are no additional checks needed at run time to verify that an object is capable of performing some action. This makes statically typed languages faster than their dynamic equivalents, as objects tend not to carry around a list of available methods/fields. If your code compiled (and there are no bugs in the compiler), every method call will execute *some* code.

Tooling and refactoring also comes much easier to statically typed languages, as the tools (such as Eclipse, IntelliJ, and Visual Studio) can discover the types of your variables as you code. They can therefore let you know immediately what the parameters for a given function are as well as what methods are available on a particular object. This also makes refactoring require significantly less overhead. With some exceptions, once you've refactored a method or object, you immediately know which other code relied on it (incompatibilities will not compile).

This comes at a cost, however. With some exceptions, statically typed languages require extra annotations to alert the compiler of the author's intended purpose (think the first "Integer" in the Java example above). This may not seem especially cumbersome, but when dealing with higher-order types, you might run into an expression like:

    Pair<String,List<Pair<Integer, Integer>>>> mapWithLabel = 
        Pair<String,List<Pair<Integer,Integer>>>("Label", list); 

which is a relatively simple construct with a very difficult-to-parse syntax. Scala and Haskell get away with fewer type expressions with type inference. The Pair could be written as

    val mapWithLabel = ("Label", list) 

and scala's compiler would need to discover what the most specific type mapWithLabel must be. Though Scala improves type inference drastically, it cannot do away with explicit types, which must be used on methods and anonymous functions. Haskell has an even more powerful type inference engine, but this style is not the norm; most statically typed languages (Java, C#, C, C++, etc.) have little to no type inference at all.

Statically typed languages are often less flexible than their dynamic counterparts with regards to object structure. Fields and methods cannot be added to a given object at run time (i.e. dynamically), which may be cumbersome when dealing with less structured data. For example, parsing XML, JSON, or database queries results in less-than-ideal object mappings. Where in PHP, we can do something like:

    $xml = Parser::parse("<person><first>Bob</first><last>Smith</last></person>");
    echo $xml->first; //  "Bob"
    echo $xml->last;  //  "Smith"

the closest we can come in a static language is something like:

    Node xml = Node.parse("<person><first>Bob</first><last>Smith</last></person>");
    println(xml.sub("first").toString());
    println(xml.sub("last").toString());

which is clearly not as elegant. In theory, a static language may add some syntactic sugar to statically account for dynamic structures more elegantly, but this would also defeat all of the benefits brought by the static model. Generally, developers of static languages will map dynamic structures to some static class, setting fields as necessary and throwing exceptions when the dynamic structure does not match the static class.

- [&lt; Method-Missing Method](../method-missing-method)
