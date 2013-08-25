include Nanoc::Helpers::HTMLEscape
include Nanoc::Helpers::Rendering
require 'json'
require 'set'


def course_list
  fields = ["title", "start", "end", "professor", "professorsUniversity", 
    "university", "categories", "languages", "libraries", "syllabus", "id"]

  items.select {|i| 
    not i.binary? \
    and i[:meta_filename] \
    and i[:meta_filename].match(/content\/data\/courses\/.*\.yaml/)
  }.group_by {|i| 
    i[:start].year
  }.to_a.sort_by{|year, courses|
    year
  }.reverse.each_with_index.map{|pair, index|
    year, courses = pair
    courses = courses.sort_by{|i|
      i[:start]
    }.reverse.map{|i| 
      syllabus = i[:syllabus]
      if syllabus
        syllabus = syllabus.to_a.map{|element|
          if element.is_a? Array
            {:label => element[0], :sub => element[1]}
          else
            {:label => element}
          end
        }
      end
      i.attributes.merge({
        :id => i[:meta_filename].match(/content\/data\/courses\/(.*)\.yaml/)[1],
        :professorsUniversity => i["professor's university".to_sym],
        :syllabus => syllabus
      })
    }.map{|i|
      # Remove any fields we don't want
      i.reject { |k,v| ! fields.include? k.to_s } # reject gives us a Hash
    }
    universities = Set.new()
    courses.each{|course|
      universities.add(course[:university])
    }
    {:first => index == 0, :year => year, :universities => universities.to_a.sort,
     :courses => courses}
  }
end

def courses
  items << Nanoc::Item.new(
    File.open("layouts/courses.mustache.html", "r").read,
    {
      :title => "Courses", 
      :extra_css => ["/assets/css/courses.css"],
      :extension => 'mustache',
      :course_list => course_list
    },
    "/cv/courses/"
  )
end
