#/bin/sh
export PATH=$PATH:/usr/local/bin/
ruby lib/goodreads.rb
ruby lib/podcasts.rb
nanoc
