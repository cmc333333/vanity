include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
require 'json'
require 'set'

def course_markdown
  items.select {|i|
    not i.binary? \
    and i[:filename] \
    and i[:filename].start_with? "content/courses"
  }.group_by {|i| 
    i[:start].year
  }.to_a.sort_by{|year, courses|
    year
  }.reverse.each_with_index.map{|pair, index|
    year, courses = pair
    courses = courses.sort_by{|i|
      i[:start]
    }.reverse
    universities = Set.new()
    courses.each{|course|
      universities.add(course[:university])
    }
    {:first => index == 0, :year => year, 
     :universities => universities.to_a.sort, :courses => courses}
  }
end
