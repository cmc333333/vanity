$(function() {
  var quotes = $('#quotes'),
      quote_data = [];
  if (WordCloud.isSupported) {
    quotes.hide();
    var container = $('<div style="position: relative; height: 500px; width: 100%">').insertAfter(quotes);
    quotes.find("li a").each(function(idx, el) {
      var $el = $(el),
          text = $el.text().trim(),
          href = $el.attr('href');
      if (text.length < 100) {
        quote_data.push({
          word: text,
          weight: 20 + Math.random()*20,
          attributes: {href: href}
        });
      }
    });
    WordCloud(container[0], {
      list: quote_data,
      rotateRatio: 0.6,
      backgroundColor: "rgba(255, 255, 255, 0)"
    });
  }
});
