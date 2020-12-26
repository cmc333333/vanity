---
title: CFPB's eRegulations
job: cfpb
url: https://www.consumerfinance.gov/eregulations/
source: https://github.com/cfpb/eregulations/
summary: An open source regulation parser/display
technology:
  - Python
  - Django
  - Backbone
  - MySql
  - Solr
  - CentOS
users: 500 daily
---

- Served with a brilliant team (4 devs, 2 design, product owner, PM) in 2-week
  sprints, with two major rollouts
- Led the bureau in best practices: code commits, reviews, coverage, tests,
  PEP8 standards, and UI testing (Sauce Labs)
- Co-wrote a Python parser for regulations (plaintext + XML) with lxml,
  PyParsing, python-constraint, and inflection
- Derived hierarchical structure from a stream of paragraph markers using
  constraint programming & limited heuristics
- Discovered citations (including implicit context) and definitions (including
  scope) via parser combinators & regexes
- Automated regulation compilation (from final rules) by tokenizing,
  normalizing, and processing amendment texts
- Created multiple output options for these regulation trees, including an
  API, the file system, and even a git repository
- Designed and later migrating a data storage API from Flask + Elastic Search
  to Django + Haystack, MySql, and Solr
- Helped develop a Django+Backbone-based regulation viewer, heralded as
  “[user-friendly](https://twitter.com/danrozas/status/475957994325557248)” and
  “[magnificent](https://twitter.com/imlwilliams/status/466263631978844160)”
- [Cited](https://www.whitehouse.gov/sites/default/files/docs/us_national_action_plan_6p.pdf)
  by the White House in the “Second Open Government National Action Plan”,
  December 5, 2013
- Using cachegrind & jmeter, optimized many segments of a quite-intensive
  rendering pipeline to minimize load times
- Configured and maintained demo and continuous-build environments as well as
  Travis-based automated test scripts
- Shared code via pull requests (Github); code built using pip, virtualenv,
  buildout, node.js, and django-south
