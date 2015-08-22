//Towers of Hanoi

$(document).ready(function(){
  var array1 = ["small", "medium", "largest"];
  var array2 = [];
  var array3 = [];
  var selected = "";
  var arrayDraw = [];

  function drawBlocks(array){
    var bpadding = 15;
    for(var i = array.length-1; i>=0; i--){
      arrayDraw.push("<div style='bottom: "+bpadding+"px' class='"+array[i]+"'></div>");
      bpadding += 35;
    }
  }
  drawBlocks(array1); //initializing blocks

  $("button").on("click", function(){
    $("#stand-1").append(arrayDraw);
    arrayDraw = [];
  });


  $(".stand").on("click", function(){
    var $this = $(this);

    if ($this.is("#stand-1") && !selected){
      selected = array1.shift();
      $("."+selected).css('bottom', '+=10px');
    }
    else if ($this.is("#stand-2") && !selected){
      selected = array2.shift();
      $("."+selected).css('bottom', '+=10px');
    }
    else if ($this.is("#stand-3") && !selected){
      selected = array3.shift();
      $("."+selected).css('bottom', '+=10px');
    }
    else if ($this.is("#stand-1") && selected){
      if (array1.length === 0){
        array1.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array1);
        $("#stand-1").append(arrayDraw);
        arrayDraw = [];
        selected = "";
      }
      else if(selected.length < array1[0].length){
        array1.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array1);
        $("#stand-1").append(arrayDraw);
        arrayDraw = [];
        selected = "";
      }
    }
    else if ($this.is("#stand-2") && selected){
      console.log();
      if (array2.length === 0){
        array2.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array2);
        $("#stand-2").append(arrayDraw);
        arrayDraw = [];
        selected = "";
      }
      else if(selected.length < array2[0].length){
        array2.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array2);
        $("#stand-2").append(arrayDraw);
        arrayDraw = [];
        selected = "";
      }
    }
    else if ($this.is("#stand-3") && selected){
      if(array3.length === 0){
        array3.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array3);
        $("#stand-3").append(arrayDraw);
        arrayDraw = [];
        selected = "";
      }
      else if(selected.length < array3[0].length){
        array3.unshift(selected);
        $(".row").find("."+selected).remove();
        drawBlocks(array3);
        $("#stand-3").append(arrayDraw);
        arrayDraw = [];
        selected = "";

        var win = ["small", "medium", "largest"];
        var winner = (array3.length === win.length) && array3.every(function(element, index) {
        return element === win[index];
      });
        if (winner){
          swal("You win!");
        }
      }
    }
  });
});
