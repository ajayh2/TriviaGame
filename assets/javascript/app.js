$(document).ready(function () {
    var options = [
        {
            question: "What is the capital of washington?", 
            choices: ["Olympia", "Seatle", "Redmond", "Bellevue"],
            answer: 1,
         },
         {
             question: "What is the capital of oregon?", 
            choices: ["Salem ", "Portland", ],
            answer: 0,
         }, 
         {
             question: "What is the capital of California?", 
            choices: ["Trenton", "Sacromento", "LA", ],
            answer: 1,
        }, 
        {
            question: "What is the capital of New Jersey?", 
            choices: ["Jersey City", "Trenton", "Mexico", ],
            answer: 1,
        }, 
        ];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })

        function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    

        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#rightans").html("<p>Time is up! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            ans();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    function displayQuestion() {
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    
            $("#questions").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choices.length; i++) {
                var userchoices = $("<div>");
                userchoices.addClass("answerchoices");
                userchoices.html(pick.choices[i]);
                userchoices.attr("data-guessvalue", i);
                $("#rightans").append(userchoices);
    
    }
    $(".answerchoices").on("click", function () {
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#rightans").html("<p>Correct!</p>");
            ans();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#rightans").html("<p>Wrong! The correct answer is: " + pick.choices[pick.answer] + "</p>");
            ans();
        }
    })
    }
    
    
    function ans () {
        $("#rightans").append;
        newArray.push(pick);
        options.splice(index,1);
    
        var rightorwrong = setTimeout(function() {
            $("#rightans").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questions").empty();
            $("#questions").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#rightans").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#rightans").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#rightans").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    

    
    })