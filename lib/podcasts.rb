include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering

require 'kramdown'

def podcast_list
  items.select {|i| 
    not i.binary? \
    and i[:filename] \
    and i[:filename].start_with? "content/data/podcasts"
  }.sort_by {|i| 
    i[:title]
  }
end
