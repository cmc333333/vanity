---
title: Fragspace
url: https://github.com/cmc333333/fragspace
languages: [Go]
libraries: [App Engine]
tools: [Memcache, Rackspace]
summary: |
  Frag Space is an API for spinning up new game servers, written in Go. It was
  developed to pick up a new language, learn some APIs (Rackspace and Swipe,)
  as well as to explore OAuth2.
---

In an effort to learn a new language, I decided to pick up Google's Go (which
helpfully runs on App Engine) and use it on a pet project. I am developing an
API (and eventually, web site) which would allow users to spin up game servers
(e.g. for online multi-player) immediately. Not only did this require learning
about Go, but I also gained a bit more experience with Rackspace's API as well
as credit card processing services. As I was already in exploration-mode, I
decided to also learn the OAuth2 spec well enough that my service (Frag Space)
could be an OAuth2 provider.

This API is RESTful and JSON-oriented (as all modern APIs should be.) 


## Code
As there are too many lines of source in this project to describe all of the
functionality in detail, I'll instead discuss some of the more interesting
sub-systems.

For example, the application needs to instantiate cloud servers on Rackspace,
so I wrote a small sub-system to communicate with their RESTful API
(/rackspace.) Here a Proxy instance provides simple methods for communication,
such as posting input JSON to a specific url (and retrieving the result.) The
Proxy keeps track of the required authentication through the Auth type, which
has methods for generating an auth token for Rackspace (given the configured
credentials;) authentication tokens are stored in the memcache for quick
access. This package also creates useful methods/data structures for
communications with Rackspace (server types, etc.)

Next, consider the OAuth2 subsystem. The OAuth2 standard is a moving target,
but by combining information from the spec along with several existing
providers (FourSquare, Google, Microsoft, etc.,) I managed to create a
relatively self-contained provider. Unfortunately, the standard isn't super
straight-forward and I'd rather not bore you with the details. Instead, I'll
note that a "client" refers to an application which may receive permission
(from a user) to access the user's data -- hence the OAuth2 implementation has
an open signup for applications. One design decision was to *not* store OAuth
tokens (like sessions in a web app) in a database; instead, the token is
*composed of* the encrypted token information. In theory, only our servers
have the key, so any message which decrypts correctly must have come from our
servers. Unfortunately, the encryption scheme is not authenticated, so this
doesn't provide adequate security at the moment.

The http and httphelper libs (/fragspace/http and /fragspace/httphelper)
provide the base concepts for all of the API methods. The handler.go file
describes the basic structure of any Handler; it should have Get, Delete,
Post, and Put methods (with Post and Put accepting JSON data,) though the base
class (BaseHandler) provides default 404 messages.  Each method must return a
"Response" (see /fragspace/http/response,) which may include several common
responses, such as 404, 400, and 500 error messages. Perhaps the most
interesting feature of these libs is the /fragspace/httphelper/requirements.go
file, which includes a few higher-order methods. The idea is that these
methods perform some guard check on the request (e.g. verify token, user,
etc.;) if the check fails, the methods immediately returns an error message;
if it succeeds, the methods will give control to a second, function argument.
That's a bit difficult to understand, so let's look at the api to see how this
is used.

The api (/fragspace/api) represents the RESTful endpoints a user may access.
Consider charge.go, which registers itself with the dispatcher and defines an
action to perform on POST to "/api/charge". When this is called, the method
wraps the interesting logic in an anonymous function, which is handed over to
one of the guard methods in httphelper.  The syntax is a bit cumbersome, but
this allows the guard checking code to be moved to a single location; it also
means that the "interesting logic" is only evaluated if the guard was
successful. Each method's body returns a response, such as a JsonResponse,
which accepts any interface as its parameter. That interface will be
automatically converted into JSON and returned to the user.

## Technology Choices

* Go - This recent, systems-level language was chosen for this project purely
  because I wanted to learn something new. It has relatively good support for
  web applications, but its low-level nature made many tasks needlessly
  tedious.
* App Engine - Generally, app engine is my go-to for small, exploratory
  projects. It's free, stable, and requires very little setup (particularly
  useful when learning a new language.) Unfortunately, App Engine doesn't
  support Go's goroutines well enough that they would make much of a
  difference in the application. This meant that this language feature (along
  with related ideas such as channels) are not used at all.
* Memcache - Super-fast, key-value memory store. As I didn't want to be
  hitting the database on every request (this would be slow and costly,) I
  tried to store most quick-access values (sessions, tokens, etc.) in
  memcache. Further, everything stored here could be easily re-created if the
  entries were ejected.
* Rackspace - Cloud hosting provider used by many (including in my
  professional work.) In general, they have an nice API and pretty solid
  performance.
* OAuth2 - An emerging standard for authentication, OAuth2 allows third
  parties to access a user's data on behalf of that user without completely
  compromising that user's account. As all API developers hope, I wanted the
  API to be useful enough that others would want to integrate with it. OAuth2
  lowers the integration barrier by providing a standard(-ish) interface for
  authentication.
