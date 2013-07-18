---
title: Accessing Drupal through Web Services
---
Regardless of the mechanism used for accessing your Drupal site through a web
service, users will follow the same basic steps. First, they will call the
```system.connect``` method, which will return a session ID. At this point,
the user may use the session id to access the site as an anonymous user. To
gain elevated privileges, users can then call ```user.login```, which requires a hash based on a given API key. At this point, the user will be given a new session id and Drupal will be aware of both the user and API key used. The user can now access different services as the authenticated user. Finally, for any mutable ("write") operations, the user will likely need to pass his/her API key through a hash for additional security.

## Accessing with Python : Ride the Snake

We'll start accessing our Drupal site by using Python because it provides an interactive shell and strong support for xmlrpc proxies. Open a Python shell and try the following:

    import xmlrpclib
    ursite = "http://example.com/services/xmlrpc"
    proxy = xmlrpclib.Server(ursite)

This creates a proxy object which will represent your site, allowing us to call remote procedure calls as if they were native to the Python object. For example,

    proxy.system.listMethods()

calls the "listMethods" method of the "system" service. This method returns the documentation for the web services API, which should include all of the methods you could see on the API Documentation page.

    proxy.system.methodHelp('node.get')
    # 'Returns a node data.'

gives the documentation for a given method (here, the "get" method of the "node" service.) This should tell users of your system what the different methods you provide do. If a user finds a particular method to be useful, he or she can then call

    proxy.system.methodSignature('node.get')
    # ['struct', 'string', 'int', 'array']

which will describe the method signature (i.e. the parameters that must be given) for a specific method. In this case, the initial parameter (the 'struct') is a Python-ism and can be safely ignored, the string is the session ID, the int is the node id, and the array is a list of fields to return. Relatively thorough documentation for these functions can be found on the in the Services API mentioned before. As you can see, though access to the site's proxy let us know each method's intents and signatures, as a site administrator, you will want to provide better documentation for your users.

Let's try accessing some data:

    connection = proxy.system.connect()
    connection
    # {'sessid': '720e0e09a2bfe6d57292c3a95312da29', 'user': {'session': '', 'cache': 0, 'hostname': 'example.com', 'uid': 0, 'roles': {'1': 'anonymous user'}}}

As mentioned before, the ```system.connect``` method returns a session id for an anonymous user. We will use that session id to perform the next tasks as the anonymous user, but let's go over some common stumbling blocks.

    proxy.node.get(connection['sessid'], 1)
    # xmlrpclib.Fault: <Fault -32602: 'Server error. Wrong number of method parameters.'>

What happened? Look at the method signature again. Even though the final
parameter ("fields") is marked as optional in the API documentation, you must
give the method *something*. Let's try again, giving the default parameter: an empty list:

    proxy.node.get(connection['sessid'], 1, [])
    # xmlrpclib.Fault: <Fault 1: 'Access denied.'>)

This time, Drupal (not the xmlrpclib) is giving us an error because the anonymous user does not have access to node one on my site. Granting the anonymous user access to 'access content' will return a complete node object (represented as a Python dict):

    {'comment': '2', 'body': '', 'uid': '3', 'vid': '1890', 'taxonomy': [], 'sticky': '0', 'revision_timestamp': '1277237852', 'last_comment_name': '', 'log': '', 'title': 'My node title', 'body_value': '', 'tags': '', 'comment_count': '0', 'revision_uid': '3', 'moderate': '0', 'type': 'page', 'status': '1', 'picture': '', 'field_datetime': [{'timezone': 'America/Chicago', 'date_type': 'datetime', 'value': '2010-07-30 17:30:00', 'timezone_db': 'UTC'}], 'format': '0', 'nid': '3399', 'teaser': '', 'last_comment_timestamp': '1277237852', 'promote': '0', 'data': 'a:3:{s:13:"form_build_id";s:37:"form-160a8f61359c1398b591e102fe3afeed";s:14:"picture_delete";s:0:"";s:14:"picture_upload";s:0:"";}', 'tnid': '0', 'translate': '0', 'name': 'cmc', 'language': '', 'created': '1277237852', 'changed': '1277237852', 'field_goto_id': [{'value': 'goto field value'}]}
    
- [&lt; Drupal's Services Module](../drupals-services-module)
- [PHP: Adding Some Structure &gt;](../php-adding-some-structure)
