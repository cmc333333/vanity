$(window).load(function(){
  var events = [];
  $("#cal-data .event").each(function(idx, el) {
    var $el = $(el);
    var start = $el.find(".start");
    var end = $el.find(".end");
    var ev = {
      title: $el.find("h3, h5").text(),
      description: $el.find("div").clone()
    };
    if (start.data("day") == end.data("day")) {
      ev.dates = [new Date(parseInt(start.data("year")),
                           parseInt(start.data("month")),
                           parseInt(start.data("day")))];
    } else {
      ev.dates = [new Date(parseInt(start.data("year")),
                           parseInt(start.data("month")),
                           parseInt(start.data("day"))),
                  new Date(parseInt(end.data("year")),
                           parseInt(end.data("month")),
                           parseInt(end.data("day")))];
    }
    events.push(ev);
  });

      var sections = [
      {dates: [new Date(2011, 2, 31), new Date(2011, 9, 28)], title: "2011 MLB Season", section: 0, attrs: {fill: "#d4e3fd"}},
      {dates: [new Date(2012, 2, 28), new Date(2012, 9, 3)], title: "2012 MLB Regular Season", section: 1, attrs: {fill: "#d4e3fd"}},
      {dates: [new Date(2012, 1, 29), new Date(2012, 3, 4)], title: "Spring Training", section: 2, attrs: {fill: "#eaf0fa"}},
      {dates: [new Date(2012, 9, 4), new Date(2012, 9, 31)], title: "2012 MLB Playoffs", section: 3, attrs: {fill: "#eaf0fa"}}
      ];

  function isTenthDay(date) {
    var day = date.getDate();
    return (day == 1 || day % 10 == 0) && day != 30;
  }

  function backJump(date) {
    var newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() - 45);
    return newDate;
  }

  function forwardJump(date) {
    var newDate = new Date(date.getTime());
    newDate.setDate(newDate.getDate() + 45);
    return newDate;
  }

  new Chronoline(document.getElementById("cal-display"), events, {
    visibleSpan: DAY_IN_MILLISECONDS * 183,
    animated: true,
    tooltips: true,
    timelinePadding: DAY_IN_MILLISECONDS * 10,
    //sections: sections,
    sectionLabelAttrs: {'fill': '#997e3d', 'font-weight': 'bold'},
    labelInterval: isTenthDay,
    hashInterval: isTenthDay,
    scrollLeft: backJump,
    scrollRight: forwardJump,
    floatingSubLabels: false,
  });
});
