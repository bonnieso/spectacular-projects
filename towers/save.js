$(document).ready(function(){
  var array1 = ["small", "medium", "large"];
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
      array1.unshift(selected);
      $(".row").find("."+selected).remove();
      drawBlocks(array1);
      $("#stand-1").append(arrayDraw);
      arrayDraw = [];
      selected = "";
    }
    else if ($this.is("#stand-2") && selected){
      array2.unshift(selected);
      $(".row").find("."+selected).remove();
      drawBlocks(array2);
      $("#stand-2").append(arrayDraw);
      arrayDraw = [];
      selected = "";
    }
    else if ($this.is("#stand-3") && selected){
      array3.unshift(selected);
      $(".row").find("."+selected).remove();
      drawBlocks(array3);
      $("#stand-3").append(arrayDraw);
      arrayDraw = [];
      selected = "";
      //$this.append("<div class='"+selected+"'></div>"); 
    }
    
  });
});