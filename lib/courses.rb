include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
require 'json'


def course_list
  fields = ["title", "start", "end", "professor", "professor's university", 
    "university", "categories", "languages", "libraries", "syllabus", "id"]

  items.select {|i| 
    not i.binary? and i[:meta_filename] and i[:meta_filename].match(/content\/data\/courses\/.*\.yaml/)
  }.sort_by {|i| 
    i[:end]
  }.reverse.map{|i| 
    i.attributes.merge({:id => i[:meta_filename].match(/content\/data\/courses\/(.*)\.yaml/)[1]})
  }.map{|i|
    i.reject { |k,v| ! fields.include? k.to_s } # reject gives us a Hash
  }
end

def courses
  items << Nanoc::Item.new(
    "<%= render 'courses' %>",
    {:title => "Courses", :extra_css => ["/assets/css/courses.css"]},
    "/cv/courses/"
  )
end
