var myDataRef = new Firebase('https://dazzling-torch-3533.firebaseio.com/todo');

$(".button").on("click", function(){
  var newItem = $(".input").val();
  addItem(newItem);
});

var addItem = function(newItem){
  myDataRef.push({
    task: newItem,
    status: "not done"
  });
};

myDataRef.on('child_added', function(snapshot) {
  var item = snapshot.val();
  var $p = $("<p>");
  $p.append(item.task).addClass("item").data("info", snapshot.key());
  $(".items").append($p);
  $(".input").val("");
});

$(".items").on("click", "p", function(){
  var currentItem = $(this);
  if(!currentItem.hasClass("done")){
    myDataRef.child(currentItem.data("info")).update({status: "done"});
    currentItem.addClass("done");
  }
  else{
    myDataRef.child(currentItem.data("info")).update({status: "not done"});
    currentItem.removeClass("done");
  }
  console.log(currentItem.data("info"));
});


//button clear all status dones