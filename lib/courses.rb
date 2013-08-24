include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
require 'json'
require 'set'


def course_list
  fields = ["title", "start", "end", "professor", "professor's university", 
    "university", "categories", "languages", "libraries", "syllabus", "id"]

  items.select {|i| 
    not i.binary? \
    and i[:meta_filename] \
    and i[:meta_filename].match(/content\/data\/courses\/.*\.yaml/)
  }.group_by {|i| 
    i[:start].year
  }.to_a.sort_by{|year, courses|
    year
  }.reverse.map{|year, courses|
    courses = courses.sort_by{|i|
      i[:start]
    }.reverse.map{|i| 
      i.attributes.merge({:id => 
        i[:meta_filename].match(/content\/data\/courses\/(.*)\.yaml/)[1]})
    }.map{|i|
      # Remove any fields we don't want
      i.reject { |k,v| ! fields.include? k.to_s } # reject gives us a Hash
    }
    universities = Set.new()
    courses.each{|course|
      universities.add(course[:university])
    }
    [year, universities.to_a.sort, courses]
  }
end

def courses
  items << Nanoc::Item.new(
    "<%= render 'courses' %>",
    {
      :title => "Courses", 
      :extra_css => ["/assets/css/courses.css"]
    },
    "/cv/courses/"
  )
end
