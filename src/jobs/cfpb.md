---
company: Consumer Financial Protection Bureau
companyUrl: http://www.consumerfinance.gov/
jobTitle: Backend Developer
start: 2012-12-03
end: 2014-09-05
---
[*Mapusaurus*](https://github.com/cfpb/mapusaurus): Open source map software
to detect red-lining concerns written with Python, GeoDjango, Leaflet,
PostGIS, & CentOS

* Worked on a capital-Agile team: three devs, two designers, product owner, and
  scrum master using two-week sprints
* Parsed and loaded decennial census tract shapes, population metrics, and HMDA 
  loan applications into Postgres/GIS
* Using an API-first approach, pre-rendered shares as GeoJSON and separated
  statistic and shape endpoints
* Served data via a Leaflet-driven UI; data loaded as needed to allow for
  infinite exploration without high load times 
* Configured and maintained demo server, integrating with Jenkins for
  continuous deployment and Travis for testing

[*eRegs*](https://github.com/cfpb/eregulations): An open source regulation
parser/display, ~500 daily users written with Python, Django, Backbone, MySql,
Solr, & CentOS

* Served with a brilliant team (4 devs, 2 design, product owner, PM) in 2-week
  sprints, with two major rollouts
* Led the bureau in best practices: code commits, reviews, coverage, tests,
  PEP8 standards, and UI testing (Sauce Labs)
* Co-wrote a Python parser for regulations (plaintext + XML) with lxml,
  PyParsing, python-constraint, and inflection
* Derived hierarchical structure from a stream of paragraph markers using
  constraint programming & limited heuristics
* Discovered citations (including implicit context) and definitions (including
  scope) via parser combinators & regexes
* Automated regulation compilation (from final rules) by tokenizing,
  normalizing, and processing amendment texts
* Created multiple output options for these regulation trees, including an
  API, the file system, and even a git repository
* Designed and later migrating a data storage API from Flask + Elastic Search
  to Django + Haystack, MySql, and Solr
* Helped develop a Django+Backbone-based regulation viewer, heralded as
  “[user-friendly](https://twitter.com/danrozas/status/475957994325557248)” and
  “[magnificent](https://twitter.com/imlwilliams/status/466263631978844160)”
* [Cited](https://www.whitehouse.gov/sites/default/files/docs/us_national_action_plan_6p.pdf)
  by the White House in the “Second Open Government National Action Plan”,
  December 5, 2013
* Using cachegrind & jmeter, optimized many segments of a quite-intensive
  rendering pipeline to minimize load times
* Configured and maintained demo and continuous-build environments as well as
  Travis-based automated test scripts
* Shared code via pull requests (Github); code built using pip, virtualenv,
  buildout, node.js, and django-south

[*HMDApolis*](https://github.com/cmc333333/hmdapolis): A game to explore HMDA
data written with Python, Flask, Backbone, Postgres, & CentOS

* Designed & implemented a board-game style webapp with two front-end devs and
  a designer over a weekend
* Stored and served HMDA data (>50 million records) utilizing carefully
  tweaked Postgres indices
* Configured and maintained demo server, a particular challenge given the
  amount of data we queried

[*Idea Box*](https://github.com/cfpb/idea-box/): An open-source Django app for
sharing and voting on ideas written with Python, Django, MySql, Solr, & CentOS

* Designed & implemented an Idea Scale-like platform for Django on a team of 3
  devs and 2 designers in two weeks
* Utilized Solr's more-like-this API and stop-word configuration to reduce the
  number of duplicate submissions
* Our code was eventually picked up for a bureau-wide rollout of the
  application, saving a great deal of money

*Better Government*: One step at a time

* Co-chair of the Transparency & Communications working group, writing the
  first CFPB technical blog
  [post](http://cfpb.github.io/articles/rules-rules/) (Jekyll)
* Heavily involved in the Open Source working group; reviewed projects for
  release and became CFPB's top committer
* Participated in release/change management meetings, “business capability”
  discussions, etc. to help steer our efforts
* Maintained an internal Prose.io instance to make contributing to our
  enterprise Github easier for non-tech folks
* Championed pull-request code reviews; copious, automated tests; license
  attribution; and rapid, public deployments
* Internal technical presentations on TastyPie, security, parsing, static site
  generators, and tech-centric project proposals
* Worked remotely, visiting D.C. once a quarter; kept in contact with my team
  via chat, phone, and occasional webex
