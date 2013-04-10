include Nanoc::Helpers::Rendering

def course_list
  items.select {|i| not i.binary? and i[:meta_filename] and
    i[:meta_filename].match(/content\/data\/courses\/.*\.yaml/)
  }.sort_by {|i| i[:end]}.reverse
end

def courses
  items << Nanoc::Item.new(
    "<%= render 'courses' %>",
    {:title => "Courses"},
    "/cv/courses/"
  )
end
