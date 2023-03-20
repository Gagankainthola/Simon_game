var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

//starting the game
var level = 0;
var started = false;
$(document).keydown(function(){

  if(!started)
  {
     $("#level-title").text("level "+level);
    nextSequence();
    started = true;
  }
});


//function next sequence
function nextSequence(){
  level++;
   userClickedPattern = [];
    $("h1").html("level  "+level);
    var randomnumber = Math.random();
     randomnumber = randomnumber * 4;
     randomnumber = Math.floor(randomnumber);
 var randomChosenColour = buttonColours[randomnumber];
 gamePattern.push(randomChosenColour);


 $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

 //sounds to play
  playSound(randomChosenColour);
 
}


//detecting cclick
$(".btn").click(function(){
              var userChosenColour = $(this).attr("id");
              userClickedPattern.push(userChosenColour) ;
              animatePress(userChosenColour);
              var crlen = userClickedPattern.length;
              checkAnswer(crlen-1);
})

//function to play  sound
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

//function for pressed animation
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function()
  {
      $("#"+currentColour).removeClass("pressed");
  },100);
}

//function to check users annswer
function checkAnswer(currentLevel){
      if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
       if(gamePattern.length ===userClickedPattern.length)
       {
        setTimeout(function(){
          nextSequence();
         },1000);
         
       }

    }
    else{
      $("body").addClass("game-over");
      $("#level-title").text("Game Over,Press any key to restart");
      setTimeout(function()
      {
          $("body").removeClass("game-over");
          var wrong1 = new Audio("sounds/wrong.mp3");
          wrong1.play();

      },500);
      startOver();
    }
      
}

//start Over Function
function startOver()
{ level = 0;
  gamePattern = [];
  started = false;

}