$(document).ready(function() {

     var data = [
        { question: "HTML stands for?", opt: ["Hyper Text Markup Language", "High Text Making Language", "Hyper Transfer Markup Level", "None"], ans: "Hyper Text Markup Language" },
        { question: "CSS is used for?", opt: ["Designing", "Database", "Logic", "Networking"], ans: "Designing" },
        { question: "JS stands for?", opt: ["Java Structure", "JavaScript", "Join Style", "Jump Script"], ans: "JavaScript" },
        { question: "Which is a backend language?", opt: ["Python", "HTML", "CSS", "Bootstrap"], ans: "Python" },
        { question: "How do you change text color in CSS?", opt:["color: red;","text-color: red;","font-color: red;","text-style: red;"], ans:"color: red;" },
        { question:"How to write 'Hello World' in alert box?", opt:["alert('Hello World')","msg('Hello World')","alertBox('Hello World')","show('Hello World')"], ans:"alert('Hello World')" },
        { question: "Which CSS property controls the text size?", opt: ["font-style", "text-size", "font-size", "text-style"], ans: "font-size" },
        { question: "Which attribute is used in HTML to define inline styles?", opt: ["style", "class", "font", "design"], ans: "style" },
        { question: "Which symbol is used for comments in JavaScript?", opt: ["//", "!-- --", "#", "/* */"], ans: "//" },
        { question: "Which property is used to change the background color in CSS?", opt: ["background-color", "bgcolor", "color-background", "background"], ans: "background-color" },
        
    ];
     data.sort(() => Math.random() - 0.5);

    var totalTime = 5400; // 1.5 hr in seconds
    var timer;
    var current = 0;
    var correct = 0;
    var wrong = 0;
    var userAnswers = {}; 
    var wrongAnswers = [];

    var name = localStorage.getItem("userName");
    var img = localStorage.getItem("userImage");
    if (name) {
        $("#username").text( name)
            
    }
    if (img) {
        $("#userPhoto").attr("src", img);
    }
    
    function startGlobalTimer() {
        updateTimerDisplay(totalTime); 
        timer = setInterval(() => {
            totalTime--; 
            updateTimerDisplay(totalTime);
            if (totalTime <= 0) {
                clearInterval(timer);
                alert("⏰ Time’s up!");
            }
        }, 1000);
    }

    function updateTimerDisplay(seconds) {
        let hrs = Math.floor(seconds / 3600);
        let mins = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;
        $("#timer").text(
            `${hrs.toString().padStart(2,'0')}:${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`
        );
    }

    function loadQuestion() {
  var x = data[current];
  var html = `<h3>${current + 1}. ${x.question}</h3>`;
  
  x.opt.forEach(o => {
    var checked = (userAnswers[current] === o) ? "checked" : "";
    html += `
      <div class='option'>
        <label>
          <input type='radio' name='a' value='${o}' ${checked}> ${o}
        </label>
      </div>`;
  });

  $("#box").html(html);

  // store selected answer correctly
  $("input[name='a']").change(function () {
    userAnswers[current] = $(this).val().trim(); // trim spaces
  });

  // Update counter
  $("#counter").text(`Question ${current + 1} of ${data.length}`);
}


     $(document).off('change', "input[name='a']").on('change', "input[name='a']", function () {
    // store trimmed value to avoid mismatch due to spaces
    let val = $(this).val();
    if (typeof val === 'string') val = val.trim();
    userAnswers[current] = val;
  });

    //  Button clicks
    $("#nextBtn").click(function(){
      if(current < data.length - 1){
        current++;
        loadQuestion();
      } else {
        $("#box").html("<div class='done'>✅ Quiz Completed!</div>");
        $("#nextBtn").hide();
      }
    });

    $("#prevBtn").click(function(){
      if(current > 0){
        current--;
        loadQuestion();
      }
    });
    function calculateScore() {
    correct = 0;
    wrong = 0;
    wrongAnswers = [];

    data.forEach((q, i) => {
      let userAns = userAnswers[i];
      if (userAns === q.ans) {
        correct++;
      } else {
        wrong++;
        wrongAnswers.push({
          question: q.question,
          given: userAns || "Not Answered",
          correct: q.ans
        });
      }
    });

    let percent = ((correct / data.length) * 100).toFixed(2);

    // 🔹 Save result in localStorage for result.html
    localStorage.setItem("correct", correct);
    localStorage.setItem("wrong", wrong);
    localStorage.setItem("total", data.length);
    localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));
    localStorage.setItem("percentage", percent);

    window.location.href = "result.html";
  }

    
    $("#submitBtn").click(function () {

        {
            calculateScore();
            // window.location.href = "result.html";
        }
    });
startGlobalTimer();
    loadQuestion();
    

}); 
   

   
    

