/*
Calculator assignment with all the functions. Everything seems to work except for the keydown events for operators.
*/

/*jslint white: true*/
'use strict';

$(document).ready(function () {
  var firstNumber = "";
  var secondNumber = "";
  var someOperator = "";
  var result;

  $(".key").on("click", function () {
    var clicked = this.innerHTML;
    if (clicked.match(/[0-9\.]/g)) {
      if(firstNumber && someOperator){
        secondNumber += clicked;
        $(".screen").text(secondNumber);
      }
      else{
        firstNumber += clicked;
        $(".screen").text(firstNumber);
      }  
    }
    
    // /([(\+\/\-)][\/\+\-\*x%])/

    else if (clicked.match(/[\/\+\-\*x]/) && !result) {
      someOperator = clicked;
      result = "best calculation ever";
      //console.log(someOperator);
    }
    
    else if (clicked === "=") {
      
      switch (someOperator) {
        case "+":
          result = parseFloat(firstNumber) + parseFloat(secondNumber);
          break;  
        case "-":
          result = parseFloat(firstNumber) - parseFloat(secondNumber);
          break;
        case "x":
          result = parseFloat(firstNumber) * parseFloat(secondNumber);
          break;
        case "/":
          result = parseFloat(firstNumber) / parseFloat(secondNumber);
          break;
      }
      
      
      $(".screen").text(result);
    }
    
    else if (clicked === "%"){
        result = parseFloat(firstNumber) / 100;
        $(".screen").text(result);
    }
    
    else if (this.id === "negative" ){
      if (firstNumber < 0){
        result = Math.abs(firstNumber);
        $(".screen").text(result);
        console.log(result);
      }
      else if(firstNumber > 0){
        result = -Math.abs(firstNumber);
        $(".screen").text(result);
        console.log(result);
      }
      else{
        result = 0;
        $(".screen").text(result);
        console.log(result);
      }
    }
    
    else if (clicked.match(/[\/\+\-\*x]/) && result){
      
      switch (someOperator) {
        case "+":
          result = parseFloat(firstNumber) + parseFloat(secondNumber);
          
          break;  
        case "-":
          result = parseFloat(firstNumber) - parseFloat(secondNumber);
          break;
        case "x":
          result = parseFloat(firstNumber) * parseFloat(secondNumber);
          break;
        case "/":
          result = parseFloat(firstNumber) / parseFloat(secondNumber);
          break;
      }
      
      $(".screen").text(result);
      
      firstNumber = result;
      console.log(firstNumber);
      result = "";
      secondNumber = "";
      someOperator = clicked;
    
    }

    else if (clicked === "AC") {
      $(".screen").text("");
      firstNumber = "";
      secondNumber = "";
      someOperator = "";
      result = "";
    }
  });

//start key events
  

$(document).on("keydown", function (e) {
    var keycode = e.which;
    var skeycode;
  if (keycode === 190){
    skeycode = "."
  }
  
  console.log(String.fromCharCode(keycode));
    if (String.fromCharCode(keycode).match(/[0-9]/g) 
        || skeycode === ".") {
      var skeycode = String.fromCharCode(keycode);
      if(firstNumber && someOperator){
        secondNumber += skeycode;
        $(".screen").text(secondNumber);
      }
      else{
        firstNumber += skeycode;
        $(".screen").text(firstNumber);
      }  
    }
    
    // /([(\+\/\-)][\/\+\-\*x%])/
  
//   String.fromCharCode(keycode) === "x"
//             || String.fromCharCode(keycode) === "-"
//             && !result) {
//      someOperator = String.fromCharCode(keycode);
//      result = "best calculation ever";
//      console.log(someOperator); 
//    }
//    
    else if (keycode === 187) {
      
      switch (someOperator) {
        case "+":
          result = parseFloat(firstNumber) + parseFloat(secondNumber);
          break;  
        case "-":
          result = parseFloat(firstNumber) - parseFloat(secondNumber);
          break;
        case "x":
          result = parseFloat(firstNumber) * parseFloat(secondNumber);
          break;
        case "/":
          result = parseFloat(firstNumber) / parseFloat(secondNumber);
          break;
      }
      
      
      $(".screen").text(result);
    }
//    
//    else if (keycode === 53){ //pushed percent
//      if (e.shiftKey){
//        result = parseFloat(firstNumber) / 100;
//        $(".screen").text(result);
//      }
//    }
    
//    
//    else if (String.fromCharCode(keycode).match(/[\/\+\-\*x]/) && result){
//      
//      switch (someOperator) {
//        case "+":
//          result = parseFloat(firstNumber) + parseFloat(secondNumber);
//          break;  
//        case "-":
//          result = parseFloat(firstNumber) - parseFloat(secondNumber);
//          break;
//        case "x":
//          result = parseFloat(firstNumber) * parseFloat(secondNumber);
//          break;
//        case "/":
//          result = parseFloat(firstNumber) / parseFloat(secondNumber);
//          break;
//      }
//      
//      $(".screen").text(result);
//      
//      firstNumber = result;
//      console.log(firstNumber);
//      result = "";
//      secondNumber = "";
//      someOperator = String.fromCharCode(keycode);
//    }

  });
});