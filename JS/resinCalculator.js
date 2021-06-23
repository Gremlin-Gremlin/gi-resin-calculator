function alertUser() {
  alert("Invalid resin value input!");
}

function getResinValue() {
  var resinValue = isValidInput();
  $("#show-your-resin-quantity").text("Your resin quantity: ").append(resinValue);
  return resinValue;
}

function isValidInput() {
  var input = parseInt($("#resinvalue").val());

  if ($("#resinvalue").val() === "") {
    alertUser();
    $("#show-your-resin-quantity").text("Your resin quantity: ").append(0);
    return 0;
  } else if (isNaN(input)) {
    alertUser();
    input = 0;
    return 0;
  } else {
    if (input > 160) {
      alertUser();
      return 160;
    } else if (input < 0) {
      alertUser();
      return 0;
    } else {
      return input;
    }
  }
}

function covertInputResinToTime(resin) {
  const maxResin = ((160 * 8) * 60000);
  var timeLeftToFullResin = maxResin - ((resin * 8) * 60000);
  return timeLeftToFullResin;
}

var timer;
var isCounting = true;
$("#calculate").click(calculate);

function calculate() {
  var counter = 0;
  var yourResin = getResinValue();
  var timeLeftToFullResin = covertInputResinToTime(yourResin);

  if (isCounting === true) {
    timer = setInterval(function () {
      isCounting = false;
      converter = timeLeftToFullResin - counter;
      resinRestored(converter, yourResin);
      var hoursR = Math.floor((converter % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutesR = Math.floor((converter % (1000 * 60 * 60)) / (1000 * 60));
      var secondsR = Math.floor((converter % (1000 * 60)) / 1000);
      if (converter <= 0) {
        $("#print-countdown").html("You have max resin!");
        alert("You have max resin!");
        clearInterval(timer);
      } else {
        $("#print-countdown").html("Countdown: " + (hoursR) + " : " + (minutesR) + " : " + (secondsR));
        counter += 1000;
      }
    }, 1000);
  } else {
    $("#alert-countdown").html("Stop the ongoing countdown first!");
  }
}

function resinRestored(duration, resin) {
  var minutes = (duration / 60000);
  var totalResin = (minutes / 8);
  var resinRestored = (resin - (160 - totalResin)) * (-1);
  if (resinRestored === parseInt(resinRestored)) {
    $("#resin-restored").html("Resin Restored: " + resinRestored);
  }
}

$("#stop").click(stop);

function stop() {
  clearInterval(timer);
  $("#alert-countdown").empty();
  isCounting = true;
}