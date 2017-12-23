---
title: Logging Example
url: https://github.com/cmc333333/loggingexample
languages: [Scala]
libraries: [Lift]
tools: [MongoDB]
summary: |
  This is a short example of logging a JSON-based RESTful API using MongoDB.
  It was plucked from a presentation I gave a few years ago and is as close as
  I can get to showing production code. Interesting technologies include Scala
  (language,) Lift (framework,) MongoDB (storage,) and Actors (programming
  paradigm.)
---

A few years ago, I gave a short talk at CASE (Chicago Area Scala Enthusiasts)
describing the use of MongoDB for logging purposes. To aid that talk, I
created a small Lift project to demonstrate the basic architecture I used when
developing a logging system for Toodalu. I include this code sample because it
demonstrates a very practical solution using some interesting technologies,
it's pretty short, and it's more or less what we use in production.

The base project is available on
[Github](https://github.com/cmc333333/loggingexample), though the interesting
bits are in
[/src/main/scala/loggingexample/lib](https://github.com/cmc333333/loggingexample/blob/master/src/main/scala/loggingexample/lib)
directory.

It's mentioned a bit in the README.md, but let me briefly explain the
environment for this code snippet before I explain the solutions it presents.
For Toodalu, all of the webservices I have developed have relied on RESTful,
JSON-oriented communications. For the most part, JSON is the only format
accepted and the only format that the services output. Further, the service
end points were under heavy development (even still, they change quite often.)
It would be incredible cumbersome to have to change the log format every time
these end points needed to change.

MongoDB serves as a very fine solution for this situation. Not only does it
operate exclusively with JSON, but it is also relatively easy to setup and
maintain. Further, though logs are important, they are append-only and largely
self-contained -- there's no need for ACID.

Though Mongo is quite speedy, I also wanted to create a barrier between
handling the response and creating a log. In particular, the logging process
should not hinder the response from being presented to the client. To do this,
the bulk of the logging logistics occur in a separate thread via a logging
Actor. This actor is independent of the http thread and so may take all the
time it needs to record a hit.

Finally, although this is a relatively stream-lined example, I wanted to
emphasize that security should be kept in mind at all stages of development. I
therefore added a step which strips any passwords from the logged information.
It certainly isn't a big step, but I hoped it would remind the audience of
some simple precautions they should be taking with user data.


## Code

First, the dispatcher (RestDispatch.) As this is just a toy example, we can
keep all of the dispatching code (including the response!) in a single object.
The RestDispatcher checks the format of the request, and if it begins with
"api", the dispatcher knows it is responsible for this request. The dispatcher
logs the current time and forces the evaluation of a lazy field (params) on
the request -- this is a workaround (Lift ties the evaluation of certain
fields to the response thread, which causes problems when we are evaluating
the response in a different thread -- the logger.) The dispatcher then
processes the request and creates a response (here, always the same.) It then
asynchronously notifies the Logging actor of the response and gives the
response back to the HTTP client.

The logger (RespLogger) is an "actor" -- an abstraction for multi-threaded
communication via message passing. When it checks its queue, it'll see a
message containing the start time, stop time, request, and response for a
given HTTP request. It'll then build up a JSON representation of that request
(including finding the associated user) along with the response. Before the
logger saves that JSON to MongoDB, it recursively passes over all of the
fields, replacing any problematic field names (such as any that contain a
period) as well as wiping out any passwords. This is more a token mention of
security than anything else, but is still a good practice.


## Technology Choices

* Scala - A strongly-typed, functional language, with all of
  the latest bells and whistles in language design. This is my language of
  choice for web applications in part due to its strong emphasis on
  immutability (HTTP is stateless,) sophisticated type system (allowing rapid
  re-writes,) and speed (built on the JVM.)
* Lift - A Scala web framework. While other, lighter frameworks would have
  made more sense for this example, Lift's what's used at Toodalu, so I
  included it here.
* MongoDB - For logging JSON input and output, Mongo is a great choice. Not
  only is it blazingly fast, but the JSON-oriented documents make it ideal for
  storing this type of data. Further, as these are only logs, there's no need
  for ACID.
* Actors - While not a technology per se, Actors are a very nice abstraction
  for multi-threaded applications. In this case, they allowed me to push
  certain chunks of processing into a separate thread via a message-queueing
  model.
