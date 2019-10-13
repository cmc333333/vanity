import { Link, withPrefix } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import setPageTitle from '../../../util/set-page-title';

export default function AddingStructure() {
  return (
    <Layout>
      { setPageTitle('PHP : Adding Some Structure') }
      <p>
        We now create a PHP object which will allow us to access our Drupal
        site from elsewhere. I&rsquo;ve taken some short cuts (assuming https,
        predefining the services, etc.) to make this presentation more
        straight forward, but most of the design principles could apply to any
        set-up. The full code is attached, so you can follow along.
        Let&rsquo;s break it into some understandable chunks:
      </p>
      <pre>
        <ol start="7">
          <li>class Services_Drupal_Exception extends Exception</li>
          <li>&#123;</li>
          <li>{'    '}public $faultString;</li>
          <li>{'    '}public $faultCode;</li>
          <li>&nbsp;</li>
          <li>
            {'    '}public function __construct&#40;$function, $faultString,
            $faultCode&#41; &#123;
          </li>
          <li>{'        '}$this-&gt;faultString = $faultString;</li>
          <li>{'        '}$this-&gt;faultCode = $faultCode;</li>
          <li>
            {'        '}$message = &lsquo;Failed request for
            &rsquo;.$function.&quot; fault: $faultString ($faultCode)&quot;;
          </li>
          <li>{'        '}parent::__construct&#40;$message&#41;;</li>
          <li>{'    '}&#125;</li>
          <li>&#125;</li>
        </ol>
      </pre>
      <p>
        First, note that lines 7-18 create new exception class,
        &ldquo;Services_Drupal_Exception&rdquo; which will be raised whenever
        there is a problem. Creating a unique exception class allows us to
        easily catch exceptions arising from the xmlrpc library rather than
        other chunks of our source.
      </p>
      <pre>
        <ol start="22">
          <li>{'    //  '}Connection Information</li>
          <li>
            {'    '}protected $protocol = &lsquo;https&rsquo;;
            {'    //  SSL because we will be logging in'}
          </li>
          <li>{'    '}protected $server;</li>
          <li>
            {'    '}private $timeout;
            {'    //  '}Useful for long operations as default timeout is about a minute
          </li>
          <li>&nbsp;</li>
          <li>{'    //  '}API Information</li>
          <li>{'    '}private $domain;</li>
          <li>{'    '}private $apikey;</li>
          <li>{'    '}private $session_id;</li>
        </ol>
      </pre>
      <p>
        Lines 22-30 include member fields which describe the configuration of
        the xmlrpc connection, including the url components for the service,
        the api key, and a timeout amount.
      </p>
      <pre>
        <ol start="32">
          <li>
            {'    '}public static function factory($username, $password,
            $server, $apikey, $domain)
          </li>
          <li>{'    {'}</li>
          <li>
            {'        '}
            return new Services_Drupal($username, $password, $server, $apikey,
            $domain);
          </li>
          <li>{'    }'}</li>
        </ol>
      </pre>
      <p>
        Lines 32-35 describe the &ldquo;factory&rdquo; static method, which is
        useful but uninteresting.
      </p>
      <pre>
        <ol start="36">
          <li>
            {'    '}public function __construct($username, $password, $server,
            $apikey, $domain, $timeout = null)
          </li>
          <li>{'    {'}</li>
          <li>
            {'        '}
            if (!(function_exists(&lsquo;xmlrpc_encode_request&rsquo;)))
            {'{'}
          </li>
          <li>
            {'            '}trigger_error(&lsquo;This class requires php5-xmlrpc&rsquo;);
          </li>
          <li>{'        }'}</li>
          <li>{'        $this->server = $server;'}</li>
          <li>{'        $this->timeout = $timeout;'}</li>
          <li>{'        $this->connect();'}</li>
          <li>{'        $this->apikey = $apikey;'}</li>
          <li>{'        $this->domain = $domain;'}</li>
          <li>{'        $this->login($username, $password);'}</li>
          <li>{'    }'}</li>
        </ol>
      </pre>
      <p>
        Lines 36-47, the Services_Drupal constructor, follow the basic pattern
        mentioned before. They start by making a connection to the server via
        the <code>connect</code> method. At this point, the service receiver
        has the same privileges as an anonymous user, and will access/edit
        content as that user. Anonymous users miss out on all the fun,
        however, so we quickly call the <code>login</code> method, which will
        allow the receiver to have the privileges of a particular,
        authenticated user.
      </p>
      <pre>
        <ol start="73">
          <li>{'    '}private function connect()</li>
          <li>{'    {'}</li>
          <li>{'        $response = $this->doRequest(\'system.connect\', array());'}</li>
          <li>
            {'        //  This is not the final session_id, but a temporary '}
            {'id until we log in'}
          </li>
          <li>{'        $this->session_id = $response[\'sessid\'];'}</li>
          <li>{'    }'}</li>
        </ol>
      </pre>
      <p>
        Let&rsquo;s take a look at lines 73-78, the <code>connect</code>
        method next. First, it calls a common method, <code>doRequest</code>,
        which calls the specified remote method (here,
        &ldquo;system.connect&rdquo;) with the given parameters (here, an
        empty array). We&rsquo;ll discuss <code>doRequest</code> in a moment,
        but first, notice that this function will return a connection object,
        with the most important bit being the &lsquo;sessid&rsquo; (session
        id) field. This field (or another session id) will be used for all
        future operations so that the Drupal site can log user access. The{' '}
        <code>connect</code> method, like the <code>node_get</code> (lines
        92-95) and <code>matching_by_fields</code> (lines 106-109) methods,
        serves more or less as a passthrough to the doRequest method.
      </p>
      <pre>
        <ol start="79">
          <li>{'    '}private function login($username, $password)</li>
          <li>{'    {'}</li>
          <li>{'        '}$timestamp = (string)time();</li>
          <li>{'        '}$nonce = (string)rand();</li>
          <li>
            {'        $hash = hash_hmac(\'sha256\', $timestamp . \';\' . '}
            {'$this->domain . \';\' . $nonce . \';\' . \'user.login\','}
          </li>
          <li>{'            $this->apikey);'}</li>
          <li>
            {'        $response = $this->doRequest(\'user.login\', '}
            {'array($hash, $this->domain, $timestamp, $nonce,'}
          </li>
          <li>{'            $this->session_id, $username, $password));'}</li>
          <li>{'        $this->session_id = $response[\'sessid\'];'}</li>
          <li>{'    }'}</li>
        </ol>
      </pre>
      <p>
        Lines 79-88, the <code>login</code> method, also call{' '}
        <code>doRequest</code>, but perform some fancy footwork before they
        do. <code>login</code>, like <code>node_save</code> is a method which
        requires extra security and identity verification. To provide this
        extra security, it sends a hashed string which contains the current
        time, the domain of access (as seen on the API key), a special value
        called a nonce, the method name, and the API key. The nonce is an
        arbitrary, (usually) generated string which can be discarded after
        use. At this point, your hash includes 5 pieces of data (the
        timestamp, domain, nonce, method, and api key); you are sending this
        hash with four of the other pieces of data (everything but the api).
        Since Drupal is aware of all of the different API keys, it can deduce
        your API key without you sending it over the wire, preventing anyone
        else from discovering your key. Notice that, as it can alter/destroy
        data, the <code>node_save</code> method requires a similar hash as
        additional verification that you are who you claim to be.
      </p>
      <pre>
        <ol start="52">
          <li>{'    '}public function doRequest($function, array $arguments)</li>
          <li>{'    {'}</li>
          <li>
            {'        $request = xmlrpc_encode_request($function, $arguments);'}
          </li>
          <li>{'        $stream_options = array(\'http\' => array('}</li>
          <li>{'            \'method\' => "POST",'}</li>
          <li>{'            \'header\' => "Content-Type: text/xml",'}</li>
          <li>{'            \'content\' => $request'}</li>
          <li>{'            '}));</li>
          <li>{'        if ($this->timeout) {'}</li>
          <li>
            {'            $stream_options[\'http\'][\'timeout\'] = '}
            {'$this->timeout;'}
          </li>
          <li>{'        }'}</li>
          <li>{'        '}$context = stream_context_create($stream_options);</li>
          <li>
            {'        $file = file_get_contents($this->getUrl(), false, '}
            {'$context);'}
          </li>
          <li>{'        '}$response = xmlrpc_decode($file);</li>
          <li>&nbsp;</li>
          <li>
            {'        if (is_array($response) && xmlrpc_is_fault($response)) '}
            {'{'}
          </li>
          <li>
            {'            throw new Services_Drupal_Exception($function, '}
            {'$response[\'faultString\'], $response[\'faultCode\']);'}
          </li>
          <li>{'        }'}</li>
          <li>&nbsp;</li>
          <li>{'        '}return $response;</li>
          <li>{'    }'}</li>
        </ol>
      </pre>
      <p>
        Finally, let&rsquo;s look at the doRequest method, which performs all
        of your encoding/decoding needs. We rely on php&rsquo;s native xmlrpc
        library (see lines 38-40) to do most of the work. We use its
        xmlrpc_encode_request function to format the service call and
        it&rsquo;s parameters into something which can be sent over xmlrpc. We
        then create a stream wrapper with a bit of context to mimic POSTing
        the data to the Drupal site; you can do the same with curl, sockets,
        or some other library if you feel more comfortable. We then get back
        the response page (here, using <code>file_get_contents</code>), which
        we decode. It&rsquo;s possible that there was some fault with our
        xmlrpc process (such as using the wrong parameters or not having
        proper access), which we account for by checking{' '}
        <code>xmlrpc_is_fault</code> and raising an exception if so.
      </p>
      <p>Now, how can we use this class to facilitate access?</p>
      <pre>
        <code>
          &lt;?php<br />
          include(&lsquo;Services_Drupal.php&rsquo;);<br />
          $s = new Services_Drupal(&lsquo;xmlrpc&rsquo;,
          &lsquo;XM1p4$$&rsquo;, &lsquo;localhost&rsquo;,
          &lsquo;bbcb58febc34fa9a69888b6e9aaaed0c&rsquo;,
          &lsquo;example&rsquo;);<br />
          $node = $s-&gt;node_get(1);
        </code>
      </pre>
      <p>
        Assuming everything goes okay, $node will now contain all of the data
        as if you had performed a <code>node_load</code> within drupal. Note
        that xmlrpc is the user with password XM1p4$$, accessing the server at
        localhost using the API key bbcb58febc34fa9a69888b6e9aaaed0c and the
        domain example.
      </p>
      <ul>
        <li>
          <a href={withPrefix('/static/drupal-web-service/Services_Drupal.php_.txt')}>
            Services_Drupal.php
          </a>
        </li>
        <li>
          <a href={withPrefix('/static/drupal-web-service/runner.php_.txt')}>
            runner.php
          </a>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/accessing-drupal-through-web-services/">
            &lt; Accessing Drupal through Web Services
          </Link>
        </li>
        <li>
          <Link to="/writings/drupal-web-service/providing-new-services/">
            Providing New Services &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
