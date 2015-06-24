//var Counter = require("./Countable.js");
// ./ this directory
$(document).ready(function() {
  var updateUI = function(text) {
//    var counts = Counter.count(text);
    var counts;
    Countable.live(document.getElementById('data'), function(counter){
      counts = counter;
    });
      
    $("#paragraphs").text(counts.paragraphs);
    $("#characters").text(counts.characters);
    $("#words").text(counts.words);
    $("#spaces").text(counts.all);
  };

  $("#data").on("keyup", function() {
    updateUI(this.value);
  });
  
  Countable.live(document.getElementById('data'), function(counter){
    console.log(this, counter);
  });
  
});
