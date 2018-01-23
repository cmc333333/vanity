---
company: Toodalu, LLC
url: http://www.toodalu.com/
title: Chief Developer
start: 2010-08-16
end: 2012-11-21
color: "#0e9"
events:
- title: Major Pivot<br />to Charity app
  date: 2011-04-04
- title: Moxie Award Finalist,<br />Startup of the Month<br />(BuiltIn Chicago)
  date: 2012-07-01
- title: Toodalu Acquired<br />(Spring Rewards)
  date: 2013-01-01
---
*Toodalu*: A charity-driven rewards network, ~50 daily users written with
Scala, Lift, Postgres, MongoDB, Solr, & Debian

* Led the majority of technology decisions, such as application stacks, server
  security, and communication protocols
* Navigated the code through many company pivots, from a Foursquare-like
  social network, to an airline points tool, to a dutch-auction Groupon-esque
  model, to a credit-card-tracking charity system, into a white-label rewards
  program
* Designed & developed RESTful JSON web services (Scala + Lift) for user-,
  merchant-, sales- and admin-facing apps
* Documented the API-first approach, which allowed our iPhone developer to
  work in parallel with webapp creation
* Tested these endpoints via over 2000 Python-based integration tests as well
  as manual load testing
* Developed web interfaces for these APIs, including customer (Google Maps +
  Lift + jQuery) & merchant (Flot) apps
* Dived into many realms as needed, including a Swing-based, Windows app and
  the beginnings of an Android client
* Emphasized user security: per-column auth encryption (BouncyCastle),
  password attempt exponential back-off, etc.
* Stored API call logs (excluding sensitive information) in MongoDB, whose
  dynamic structure allowed easy querying
* Created a Wordpress blog for easy content management, running Quercus for
  sharing Tomcat sessions with the app
* Used Solr to provide instantaneous
  auto-completion/search across 1.5 million charities (to associate donations)
* Utilized PostGIS to perform shape and position comparisons to determine
  which merchants were nearby to users
* Integrated with GRS credit card payments via SOAP, SFTP, and embedded
  iframes to track swipes and give rewards
* Pulled user contacts/relationships from social networks and contact lists,
  including Facebook, Twitter, and Gmail
* Sent notifications to users via templated (Mustache) push messages (Urban
  Airship, Parse) and emails (YMLP)
* Configured and maintained all associated servers (Rackspace) including
  binary/JAR hosting
* Hosted code first on an internal subversion; migrated to Bitbucket (using
  git); over 2000 commits; apps build via SBT
* Scripted routine tasks (e.g. key rotation), schema changes
  (scala-migrations), resizing photos (ImageMagick), etc.
* Worked largely remotely, seeing the iPhone developer and administrative team
  roughly once per week
* Stepped out just as Toodalu was acquired by Wildfire; our software would
  become the base for Spring Marketplace
* Recognized as Chicago's Startup of the Month; finalist, “Best Financial
  Services/Payment Startup” Moxie Award
