---
title: "PHP : Adding Some Structure"
---
We now create a PHP object which will allow us to access our Drupal site from elsewhere. I've taken some short cuts (assuming https, predefining the services, etc.) to make this presentation more straight forward, but most of the design principles could apply to any set-up. The full code is attached, so you can follow along. Let's break it into some understandable chunks:

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="7"><li class="li1"><div class="de1"><span class="kw2">class</span> Services_Drupal_Exception <span class="kw2">extends</span> Exception</div></li><li class="li1"><div class="de1"><span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">    <span class="kw2">public</span> <span class="re0">$faultString</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="kw2">public</span> <span class="re0">$faultCode</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li1"><div class="de1">    <span class="kw2">public</span> <span class="kw2">function</span> __construct<span class="br0">&#40;</span><span class="re0">$function</span><span class="sy0">,</span> <span class="re0">$faultString</span><span class="sy0">,</span> <span class="re0">$faultCode</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">faultString</span> <span class="sy0">=</span> <span class="re0">$faultString</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">faultCode</span> <span class="sy0">=</span> <span class="re0">$faultCode</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$message</span> <span class="sy0">=</span> <span class="st_h">'Failed request for '</span><span class="sy0">.</span><span class="re0">$function</span><span class="sy0">.</span><span class="st0">&quot; fault: <span class="es4">$faultString</span> (<span class="es4">$faultCode</span>)&quot;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        parent<span class="sy0">::</span>__construct<span class="br0">&#40;</span><span class="re0">$message</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#125;</span></div></li><li class="li1"><div class="de1"><span class="br0">&#125;</span></div></li></ol></pre></div><br />

First, note that lines 7-18 create new exception class, "Services_Drupal_Exception" which will be raised whenever there is a problem. Creating a unique exception class allows us to easily catch exceptions arising from the xmlrpc library rather than other chunks of our source.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="22"><li class="li1"><div class="de1">    <span class="co1">//  Connection Information</span></div></li><li class="li1"><div class="de1">    <span class="kw2">protected</span> <span class="re0">$protocol</span> <span class="sy0">=</span> <span class="st_h">'https'</span><span class="sy0">;</span>      <span class="co1">//  SSL because we will be logging in</span></div></li><li class="li1"><div class="de1">    <span class="kw2">protected</span> <span class="re0">$server</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="re0">$timeout</span><span class="sy0">;</span>   <span class="co1">//  Useful for long operations as default timeout is about a minute</span></div></li><li class="li1"><div class="de1">&nbsp;</div></li><li class="li1"><div class="de1">    <span class="co1">//  API Information</span></div></li><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="re0">$domain</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="re0">$apikey</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="re0">$session_id</span><span class="sy0">;</span></div></li></ol></pre></div><br />

Lines 22-30 include member fields which describe the configuration of the xmlrpc connection, including the url components for the service, the api key, and a timeout amount.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="32"><li class="li1"><div class="de1">    <span class="kw2">public</span> static <span class="kw2">function</span> factory<span class="br0">&#40;</span><span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="sy0">,</span> <span class="re0">$server</span><span class="sy0">,</span> <span class="re0">$apikey</span><span class="sy0">,</span> <span class="re0">$domain</span><span class="br0">&#41;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">        <span class="kw1">return</span> <span class="kw2">new</span> Services_Drupal<span class="br0">&#40;</span><span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="sy0">,</span> <span class="re0">$server</span><span class="sy0">,</span> <span class="re0">$apikey</span><span class="sy0">,</span> <span class="re0">$domain</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#125;</span></div></li></ol></pre></div><br />

Lines 32-35 describe the "factory" static method, which is useful but uninteresting.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="36"><li class="li1"><div class="de1">    <span class="kw2">public</span> <span class="kw2">function</span> __construct<span class="br0">&#40;</span><span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="sy0">,</span> <span class="re0">$server</span><span class="sy0">,</span> <span class="re0">$apikey</span><span class="sy0">,</span> <span class="re0">$domain</span><span class="sy0">,</span> <span class="re0">$timeout</span> <span class="sy0">=</span> <span class="kw4">null</span><span class="br0">&#41;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">        <span class="kw1">if</span> <span class="br0">&#40;</span><span class="sy0">!</span><span class="br0">&#40;</span><a href="http://www.php.net/function_exists"><span class="kw3">function_exists</span></a><span class="br0">&#40;</span><span class="st_h">'xmlrpc_encode_request'</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">            <a href="http://www.php.net/trigger_error"><span class="kw3">trigger_error</span></a><span class="br0">&#40;</span><span class="st_h">'This class requires php5-xmlrpc'</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="br0">&#125;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">server</span> <span class="sy0">=</span> <span class="re0">$server</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">timeout</span> <span class="sy0">=</span> <span class="re0">$timeout</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">connect</span><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">apikey</span> <span class="sy0">=</span> <span class="re0">$apikey</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">domain</span> <span class="sy0">=</span> <span class="re0">$domain</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">login</span><span class="br0">&#40;</span><span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#125;</span></div></li></ol></pre></div><br />

Lines 36-47, the Services_Drupal constructor, follow the basic pattern mentioned before. They start by making a connection to the server via the <span class="geshifilter"><code class="text geshifilter-text">connect</code></span> method. At this point, the service receiver has the same privileges as an anonymous user, and will access/edit content as that user. Anonymous users miss out on all the fun, however, so we quickly call the <span class="geshifilter"><code class="text geshifilter-text">login</code></span> method, which will allow the receiver to have the privileges of a particular, authenticated user.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="73"><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="kw2">function</span> connect<span class="br0">&#40;</span><span class="br0">&#41;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$response</span> <span class="sy0">=</span> <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">doRequest</span><span class="br0">&#40;</span><span class="st_h">'system.connect'</span><span class="sy0">,</span> <a href="http://www.php.net/array"><span class="kw3">array</span></a><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="co1">//  This is not the final session_id, but a temporary id until we log in</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">session_id</span> <span class="sy0">=</span> <span class="re0">$response</span><span class="br0">&#91;</span><span class="st_h">'sessid'</span><span class="br0">&#93;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#125;</span></div></li></ol></pre></div><br />

Let's take a look at lines 73-78, the <span class="geshifilter"><code class="text geshifilter-text">connect</code></span> method next. First, it calls a common method, <span class="geshifilter"><code class="text geshifilter-text">doRequest</code></span>, which calls the specified remote method (here, "system.connect") with the given parameters (here, an empty array). We'll discuss <span class="geshifilter"><code class="text geshifilter-text">doRequest</code></span> in a moment, but first, notice that this function will return a connection object, with the most important bit being the 'sessid' (session id) field. This field (or another session id) will be used for all future operations so that the Drupal site can log user access. The <span class="geshifilter"><code class="text geshifilter-text">connect</code></span> method, like the <span class="geshifilter"><code class="text geshifilter-text">node_get</code></span> (lines 92-95) and <span class="geshifilter"><code class="text geshifilter-text">matching_by_fields</code></span> (lines 106-109) methods, serves more or less as a passthrough to the doRequest method.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="79"><li class="li1"><div class="de1">    <span class="kw2">private</span> <span class="kw2">function</span> login<span class="br0">&#40;</span><span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="br0">&#41;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#123;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$timestamp</span> <span class="sy0">=</span> <span class="br0">&#40;</span>string<span class="br0">&#41;</span><a href="http://www.php.net/time"><span class="kw3">time</span></a><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$nonce</span> <span class="sy0">=</span> <span class="br0">&#40;</span>string<span class="br0">&#41;</span><a href="http://www.php.net/rand"><span class="kw3">rand</span></a><span class="br0">&#40;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$hash</span> <span class="sy0">=</span> <a href="http://www.php.net/hash_hmac"><span class="kw3">hash_hmac</span></a><span class="br0">&#40;</span><span class="st_h">'sha256'</span><span class="sy0">,</span> <span class="re0">$timestamp</span> <span class="sy0">.</span> <span class="st_h">';'</span> <span class="sy0">.</span> <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">domain</span> <span class="sy0">.</span> <span class="st_h">';'</span> <span class="sy0">.</span> <span class="re0">$nonce</span> <span class="sy0">.</span> <span class="st_h">';'</span> <span class="sy0">.</span> <span class="st_h">'user.login'</span><span class="sy0">,</span></div></li><li class="li1"><div class="de1">            <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">apikey</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$response</span> <span class="sy0">=</span> <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">doRequest</span><span class="br0">&#40;</span><span class="st_h">'user.login'</span><span class="sy0">,</span> <a href="http://www.php.net/array"><span class="kw3">array</span></a><span class="br0">&#40;</span><span class="re0">$hash</span><span class="sy0">,</span> <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">domain</span><span class="sy0">,</span> <span class="re0">$timestamp</span><span class="sy0">,</span> <span class="re0">$nonce</span><span class="sy0">,</span></div></li><li class="li1"><div class="de1">            <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">session_id</span><span class="sy0">,</span> <span class="re0">$username</span><span class="sy0">,</span> <span class="re0">$password</span><span class="br0">&#41;</span><span class="br0">&#41;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span class="re0">$this</span><span class="sy0">-&gt;</span><span class="me1">session_id</span> <span class="sy0">=</span> <span class="re0">$response</span><span class="br0">&#91;</span><span class="st_h">'sessid'</span><span class="br0">&#93;</span><span class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span class="br0">&#125;</span></div></li></ol></pre></div><br />

Lines 79-88, the <span class="geshifilter"><code class="text geshifilter-text">login</code></span> method, also call <span class="geshifilter"><code class="text geshifilter-text">doRequest</code></span>, but perform some fancy footwork before they do. <span class="geshifilter"><code class="text geshifilter-text">login</code></span>, like <span class="geshifilter"><code class="text geshifilter-text">node_save</code></span> is a method which requires extra security and identity verification. To provide this extra security, it sends a hashed string which contains the current time, the domain of access (as seen on the API key), a special value called a nonce, the method name, and the API key. The nonce is an arbitrary, (usually) generated string which can be discarded after use. At this point, your hash includes 5 pieces of data (the timestamp, domain, nonce, method, and api key); you are sending this hash with four of the other pieces of data (everything but the api). Since Drupal is aware of all of the different API keys, it can deduce your API key without you sending it over the wire, preventing anyone else from discovering your key. Notice that, as it can alter/destroy data, the <span class="geshifilter"><code class="text geshifilter-text">node_save</code></span> method requires a similar hash as additional verification that you are who you claim to be.

<div class="geshifilter"><pre class="php geshifilter-php"><ol start="52"><li
class="li1"><div class="de1">    <span class="kw2">public</span> <span
class="kw2">function</span> doRequest<span class="br0">&#40;</span><span
class="re0">$function</span><span class="sy0">,</span> <a
href="http://www.php.net/array"><span class="kw3">array</span></a> <span
class="re0">$arguments</span><span class="br0">&#41;</span> </div></li><li
class="li1"><div class="de1">    <span class="br0">&#123;</span></div></li><li
class="li1"><div class="de1">        <span class="re0">$request</span> <span
class="sy0">=</span> <a href="http://www.php.net/xmlrpc_encode_request"><span
class="kw3">xmlrpc_encode_request</span></a><span
class="br0">&#40;</span><span class="re0">$function</span><span
class="sy0">,</span> <span class="re0">$arguments</span><span
class="br0">&#41;</span><span class="sy0">;</span></div></li><li
class="li1"><div class="de1">        <span class="re0">$stream_options</span>
<span class="sy0">=</span> <a href="http://www.php.net/array"><span
class="kw3">array</span></a><span class="br0">&#40;</span><span
class="st_h">'http'</span> <span class="sy0">=&gt;</span> <a
href="http://www.php.net/array"><span class="kw3">array</span></a><span
class="br0">&#40;</span></div></li><li class="li1"><div class="de1">
<span class="st_h">'method'</span> <span class="sy0">=&gt;</span> <span
class="st0">&quot;POST&quot;</span><span class="sy0">,</span></div></li><li
class="li1"><div class="de1">            <span class="st_h">'header'</span>
<span class="sy0">=&gt;</span> <span class="st0">&quot;Content-Type:
text/xml&quot;</span><span class="sy0">,</span></div></li><li class="li1"><div
class="de1">            <span class="st_h">'content'</span> <span
class="sy0">=&gt;</span> <span class="re0">$request</span></div></li><li
class="li1"><div class="de1">            <span class="br0">&#41;</span><span
class="br0">&#41;</span><span class="sy0">;</span></div></li><li
class="li1"><div class="de1">        <span class="kw1">if</span> <span
class="br0">&#40;</span><span class="re0">$this</span><span
class="sy0">-&gt;</span><span class="me1">timeout</span><span
class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li
class="li1"><div class="de1">            <span
class="re0">$stream_options</span><span class="br0">&#91;</span><span
class="st_h">'http'</span><span class="br0">&#93;</span><span
class="br0">&#91;</span><span class="st_h">'timeout'</span><span
class="br0">&#93;</span> <span class="sy0">=</span> <span
class="re0">$this</span><span class="sy0">-&gt;</span><span
class="me1">timeout</span><span class="sy0">;</span></div></li><li
class="li1"><div class="de1">        <span
class="br0">&#125;</span></div></li><li class="li1"><div class="de1">
<span class="re0">$context</span> <span class="sy0">=</span> <a
href="http://www.php.net/stream_context_create"><span
class="kw3">stream_context_create</span></a><span
class="br0">&#40;</span><span class="re0">$stream_options</span><span
class="br0">&#41;</span><span class="sy0">;</span></div></li><li
class="li1"><div class="de1">        <span class="re0">$file</span> <span
class="sy0">=</span> <a href="http://www.php.net/file_get_contents"><span
class="kw3">file_get_contents</span></a><span class="br0">&#40;</span><span
class="re0">$this</span><span class="sy0">-&gt;</span><span
class="me1">getUrl</span><span class="br0">&#40;</span><span
class="br0">&#41;</span><span class="sy0">,</span> <span
class="kw4">false</span><span class="sy0">,</span> <span
class="re0">$context</span><span class="br0">&#41;</span><span
class="sy0">;</span></div></li><li class="li1"><div class="de1">        <span
class="re0">$response</span> <span class="sy0">=</span> <a
href="http://www.php.net/xmlrpc_decode"><span
class="kw3">xmlrpc_decode</span></a><span class="br0">&#40;</span><span
class="re0">$file</span><span class="br0">&#41;</span><span
class="sy0">;</span></div></li><li class="li1"><div
class="de1">&nbsp;</div></li><li class="li1"><div class="de1">        <span
class="kw1">if</span> <span class="br0">&#40;</span><a
href="http://www.php.net/is_array"><span class="kw3">is_array</span></a><span
class="br0">&#40;</span><span class="re0">$response</span><span
class="br0">&#41;</span> <span class="sy0">&amp;&amp;</span> <a
href="http://www.php.net/xmlrpc_is_fault"><span
class="kw3">xmlrpc_is_fault</span></a><span class="br0">&#40;</span><span
class="re0">$response</span><span class="br0">&#41;</span><span
class="br0">&#41;</span> <span class="br0">&#123;</span></div></li><li
class="li1"><div class="de1">            <span class="kw1">throw</span> <span
class="kw2">new</span> Services_Drupal_Exception<span
class="br0">&#40;</span><span class="re0">$function</span><span
class="sy0">,</span> <span class="re0">$response</span><span
class="br0">&#91;</span><span class="st_h">'faultString'</span><span
class="br0">&#93;</span><span class="sy0">,</span> <span
class="re0">$response</span><span class="br0">&#91;</span><span
class="st_h">'faultCode'</span><span class="br0">&#93;</span><span
class="br0">&#41;</span><span class="sy0">;</span></div></li><li
class="li1"><div class="de1">        <span
class="br0">&#125;</span></div></li><li class="li1"><div
class="de1">&nbsp;</div></li><li class="li1"><div class="de1">        <span
class="kw1">return</span> <span class="re0">$response</span><span
class="sy0">;</span></div></li><li class="li1"><div class="de1">    <span
class="br0">&#125;</span></div></li></ol></pre></div><br />

Finally, let's look at the doRequest method, which performs all of your encoding/decoding needs. We rely on php's native xmlrpc library (see lines 38-40) to do most of the work. We use its xmlrpc_encode_request function to format the service call and it's parameters into something which can be sent over xmlrpc. We then create a stream wrapper with a bit of context to mimic POSTing the data to the Drupal site; you can do the same with curl, sockets, or some other library if you feel more comfortable. We then get back the response page (here, using <span class="geshifilter"><code class="text geshifilter-text">file_get_contents</code></span>), which we decode. It's possible that there was some fault with our xmlrpc process (such as using the wrong parameters or not having proper access), which we account for by checking <span class="geshifilter"><code class="text geshifilter-text">xmlrpc_is_fault</code></span> and raising an exception if so.

Now, how can we use this class to facilitate access?<br />

    <?php
    include('Services_Drupal.php');
    $s = new Services_Drupal('xmlrpc', 'XM1p4$$', 'localhost', 'bbcb58febc34fa9a69888b6e9aaaed0c', 'example');
    $node = $s->node_get(1);

Assuming everything goes okay, $node will now contain all of the data as if you had performed a <span class="geshifilter"><code class="text geshifilter-text">node_load</code></span> within drupal. Note that xmlrpc is the user with password XM1p4$$, accessing the server at localhost using the API key bbcb58febc34fa9a69888b6e9aaaed0c and the domain example.

- [Services_Drupal.php](/assets/files/drupal-web-service/Services_Drupal.php_.txt)
- [runner.php](/assets/files/drupal-web-service/runner.php_.txt)
- [&lt; Accessing Drupal through Web Services](../accessing-drupal-through-web-services)
- [Providing New Services &gt;](../providing-new-services)
