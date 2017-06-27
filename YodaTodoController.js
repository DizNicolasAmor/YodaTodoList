/*
YodaTodoList
- - - - - - - - - -
My first angularjs project. 
https://diznicolasamor.github.io/YodaTodoList/
See this project in GitHub (https://github.com/DizNicolasAmor)
Be free to use it and change it. 
- - - - - - 
It is a todo list builded with angularjs and a local storage service. 
You write the tasks you must do and they are stored in Yoda's language. 
Be free to use it and change it. 
*/


angular.module("YodaTodoList",["LocalStorageModule"])
.controller("YodaTodoController", ["$scope", "localStorageService", function(s, localStorageService){

  if(localStorageService.get("angular-todolist")){
  	s.todos = localStorageService.get("angular-todolist");
  }
  else{
    s.todos = [
                  {"text": "YOUR PASSION FOLLOW YOU MUST.", done: false},
                  {"text": "EXERCISE DO SOME YOU MUST.", done: false}
                ];
  }

  s.$watchCollection("todos", function(){
  	localStorageService.set("angular-todolist", s.todos);
  });


  s.totalToDo = function(){
     return s.todos.length;
  }

  s.addToDo = function(){
	if(s.input == ""){
	  s.error ="Please enter a task";
	}else {  

    //auxiliar function 
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

       // Pick a remaining element...
       randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
       temporaryValue = array[currentIndex];
       array[currentIndex] = array[randomIndex];
       array[randomIndex] = temporaryValue;
     }

      return array;
    }


    //toUpperCase();
    s.input = s.input.toUpperCase();

    //shuffle the input because this is how Yoda speaks
    s.input = shuffle(s.input.split(" ")).join(" ")  + " YOU MUST. ";

    s.todos.push({"text":s.input,"done":false});
	  s.error ="";
	  s.input = "";
  	}
  }
  
  s.clearCompleted = function(){
    for(var i = 0; i<s.todos.length; i++){
      if(s.todos[i].done == true){
        s.todos.splice(i,1);
      }      
    }
  }

}]);
