def code_samples
  items.select {|i|
    i[:filename] \
    and i[:filename].start_with? "content/cv/code-samples"\
    and not i.url.end_with? "index"
  }.sort_by{|i| i[:mtime]}.reverse
end
