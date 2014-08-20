$(document).ready(function() {
  var $player = $('#jquery_jplayer');
  $player.jPlayer({
    swfPath: "http://www.jplayer.org/latest/js/Jplayer.swf",
    supplied: "mp3",
    volume: 1,
    wmode:"window",
    solution: "html,flash",
    errorAlerts: true,
    warningAlerts: false
  });
  $('a.play-pause').click(function(ev) {
    var $link = $(this),
        mp3Url = $link.attr('href'),
        status = $player.jPlayer().data().jPlayer.status;
    ev.preventDefault();

    //  New file. Reset everything and set the new media
    if (status.src !== mp3Url) {
      $player.jPlayer('stop');
      $('a.play-pause').text('[Play]');
      $player.jPlayer('setMedia', {mp3: mp3Url});
    }

    if (status.paused) {
      $player.jPlayer('play');
      $link.text('[Pause]');
    } else {
      $player.jPlayer('pause');
      $link.text('[Play]');
    }
  });
});
