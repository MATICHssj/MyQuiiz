class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question();
      question.display();
    }
  }

  play(){

    question.hide();//write code here to hide question elements,

    background('blue');//write code to change the background color here,

    Contestant.getPlayerInfo();//call getContestantInfo() here,

    if(allContestants !== undefined){
      var display_answer = 230 
      question.note.html("El color verde es el que dio una respuesta corecta");
      question.note.position(250,25);
   }

    contestant.name = question.input1.value();
    for(var plr in allContestants){
      var corectns = "3"
      if(corectns == allContestants[plr].answer){
        fill("green");
        text("Bien "+ contestant.name);
      }
      else{
        fill("red");
        text(":( "+ contestant.name);
      }
      display_answer+=30
      text(allContestants[plr].name+" "+allContestants[plr].answer,250,display_answer);
    } //write code to show a heading for showing the result of Quiz,
 }
}