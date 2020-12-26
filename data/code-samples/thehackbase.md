---
title: The Hack Base
url: https://github.com/cmc333333/thehackbase
tags: [Python, Django]
summary: |
  This is a small, database-driven application written in Python with Django.
  It's goals were minimal, but included the ability to switch between a Google
  App Engine install and a dedicated server.
---

The Hack Base was my first project to use the Django framework, a very popular
model-view-controller framework for Python projects. While it is a mix between
front-end and back-end technologies, I will focus on the back-end tech (read
"Python") here. The project intended to be a canonical database of journalists
("hacks",) their publishers, and their works (in many ways, similar to
[CrunchBase](http://www.crunchbase.com/) .) As a result, the MVC style of
development would prove particularly beneficial, and the models would be
pretty simple.

The application was written to run on Google App Engine, but needed the
ability to be converted to a traditional RDMS. As such, I created foreign
connections and intermediate tables (e.g. for many-to-many relations) which
generally wouldn't make sense in a Big Table environment. That said, the
number of queries for any particular page was quite small; I didn't see any
need to de-normalize the data.

Regarding the schema layout, there's a table representing publishers,
journalists, work, and a join table to connect publishers to journalists (as
journalists will join and leave publishers over time.) As each piece of work
has a specific author, works have a foreign key to the journalist table. Based
on the date a work was published, it would be possible to determine for which
publisher it was created through a few joins.

## Code

The first Django project, publishers (/publishers,) is the smaller of the two,
containing a single model and few controllers (unfortunately known as "views"
in Django parlance.) The model has a string (a "slug") as its unique
identifier and has the nice property that it will automatically generate a
unique slug from the publisher's name. The controllers are rudimentary,
offering listing page and a profile/edit page.

The second project, journalists (/journalists,) has a bit more going for it in
terms of complexity. The journalist model follows a similar slug-based unique
identifier (this time using the journalist's full name.) There's also a model
representing a work (including a permalink to that work's content,) and a
multi-to-multi table connecting journalists and publishers. This join table
has additional fields to keep track of when the journalist joined and
potentially left the publisher.

While the majority of the functions in the journalists view.py file are
to-be-expected from django (listings, profiles, etc.,) both the
editPublishing() and editWork() functions have something a bit uncommon. From
a single page (the journalist profile,) users were able to add multiple
objects representing publisher history and/or work. To accomplish this, I had
some javascript which would generate new (hereto unseen) form fields. The
Python backend would then check the entries in the database against those
provided by the user, saving existing and new entries, and deleting any
entries which were not in the user's input.

## Technology Choices

- Python - As mentioned before, Python's a great, general-purpose language.
  The ability to meta-program and dynamic typing allow it to work particularly
  well with a framework like Django, which uses these traits to create
  concise, largely-legible code.
- Django - One of the primary Python frameworks, Django should definitely be
  reviewed whenever starting a new project. It has a great deal of support in
  the Python community, including many, many plugins which will make life much
  easier for development (consider that XSS tokens were added to all forms
  without any of my code declaring them.) Django also runs well on Google App
  Engine as well as in dedicated boxes, which makes it a particularly portable
  solution.
