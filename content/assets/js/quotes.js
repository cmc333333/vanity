$(function() {
  if (WordCloud.isSupported) {
    $('[data-quotes-vis=true]').each(function(_, ul) {
      var $ul = $(ul),
          hasLonger = false;
          quoteData = [],
          $container = $('<div>').css({
            position: "relative",
            height: "500px",
            width: "100%"
          }).insertBefore($ul);
      $ul.find("li a").each(function(_, el) {
        var $el = $(el),
            text = $el.text().trim(),
            href = $el.attr('href');
        if (text.length < 50) {
          $el.parent().hide();
          quoteData.push({
            word: text,
            weight: 20 + Math.random()*20,
            attributes: {href: href}
          });
        } else {
          hasLonger = true;
        }
      });
      WordCloud($container[0], {
        list: quoteData,
        rotateRatio: .9,
        shape: 'square',
        backgroundColor: "rgba(255, 255, 255, 0)"
      });
      if (hasLonger) {
        $('<div>').text('And more:').insertBefore($ul);
      } else {
        $ul.hide();
      }
    });
  }
});
