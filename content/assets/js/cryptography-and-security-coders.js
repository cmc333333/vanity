$(document).ready(function() {
  //  mapping of topic name to requirements
  var topics = {
    'encryption': null,
    'key-management': 'encryption',
    'symmetric-encryption': 'encryption',
    'encryption-modes': 'symmetric-encryption',
    'password-hashing': null,
    'authentication': null,
    'injection': null,
    'logging': null,
    'asymmetric-encryption': 'encryption',
    'ssl': 'asymmetric-encryption',
    'searching': 'encryption-modes'
  }
  var history = [{name: 'index', page: 0}];
  var future = [];
  function previous() {
    if (history.length > 1) {
      future.push(history.pop());
      var toShow = history.pop();
      history.push(toShow);
      displayPage(toShow);
    }
  }
  function next() {
    if (future.length > 0) {
      var toShow = future.pop();
      history.push(toShow);
      displayPage(toShow);
    }
  }

  function displayPage(page) {
    $('#presentation .slides').hide();
    $('#index').hide();
    if (page.name == "index") {
      $('#index').html('<h2>Index</h2>').append(index()).show();
    } else {
      $('#' + page.name + ' .slides > div').hide();
      $('#' + page.name + ' .slides > div').slice(page.page, page.page+1).show();
      $('#' + page.name + ' .slides').show();
    }
  }
  function index() {
    var toRet = $('<ul />');
    $.each(topics, function(topic) {
      var requirement = topics[topic];
      if (requirement != null) {
        //  check if we've seen the requirement
        var seen = false;
        $.each(history, function(idx) {
          if (history[idx].name == requirement) seen = true;
        });
        if (!seen) {
          return; //  equivalent to "break"
        }
      }

      //  Don't show ones we've already seen
      var seen = false;
      $.each(history, function(idx) {
        if (history[idx].name == topic) seen = true;
      });
      if (seen) return; //  equivalent to "break"

      var header = $('#' + topic + ' .slides h2').text();
      var li = $('<li />');
      var link = $('<a href="#presentation-' + topic + '">' + header + '</a>').click(function() {
        var topic = $(this).attr('href').substr(14);
        $('#' + topic + ' .slides div').hide();
        $('#' + topic + ' .slides').show();
        var length = $('#' + topic + ' .slides div').length
        future = [];
        for (var i = 0; i < length; i++) {
          future.push({name: topic, page: i});
        }
        future.push({name: 'index', page: 0});
        future.reverse();
        next();
      }).appendTo(li);
      li.appendTo(toRet);
    });
    return toRet;
  }
  $('#start-presentation').show();

  $('#start-presentation').click(function() {
    $('<button>Prev</button>').click(previous).insertBefore(this);
    $('<button>Next</button>').click(next).insertBefore(this);
    $('<div id="index"></div>').hide().insertBefore('#intro');
    $(this).hide();
    $('#presentation .detail').hide();
    displayPage({name: 'index', page: 0});
  });
});
