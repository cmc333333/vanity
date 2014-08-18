def all_jobs
  items.select {|i|
    not i.binary? \
    and i[:filename] \
    and i[:filename].start_with? "content/data/jobs"
  }.sort_by {|i|
    if (i[:end]) then
      [i[:end], i[:start]]
    else
      [Date.parse(Time.now.to_s), i[:start]]
    end
  }.reverse
end
