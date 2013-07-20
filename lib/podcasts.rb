include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering

require 'kramdown'

def podcast_list
  items.select {|i| 
    not i.binary? and i[:meta_filename] and i[:meta_filename].match(/content\/data\/podcasts\/.*\.yaml/)
  }.sort_by {|i| 
    i[:title]
  }.map{|i| 
    i.attributes.merge({
      :description_html => Kramdown::Document.new(i[:description]).to_html
    })
  }
end

def podcasts
  items << Nanoc::Item.new(
    "<%= render 'podcasts' %>",
    {
      :title => "Podcasts",
      :extra_css => ["/assets/css/podcasts.css"]
    },
    "/misc/podcasts/"
  )
end

