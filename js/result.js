$(document).ready(function () {

  var name = localStorage.getItem("userName");
  var img = localStorage.getItem("userImage");

  if (name) {
    $("#username").text(name)
   
  }

  if (img) {
    $("#userPhoto").attr("src", img)
     
  }

  // 📊 Result data get from localStorage
  let correct = localStorage.getItem("correct") || 0;
  let wrong = localStorage.getItem("wrong") || 0;
  let total = localStorage.getItem("total") || 0;
  let wrongAnswers = JSON.parse(localStorage.getItem("wrongAnswers") || "[]");

  let percent = ((correct / total) * 100).toFixed(2);
  $("#scoreText").text(`Scored ${correct} / ${total}`);
  $("#summary").text(`✅ Correct: ${correct} | ❌ Wrong: ${wrong} | 📊 ${percent}%`);

  if (percent >= 50) {
    $("#resultTitle").text("Performance : Average 🎉");
  } else if(percent>=90){
    $("#resultTitle").text("Performance : Excellent 🎉");
  }else{
     $("#resultTitle").text("Performance : Poor");
  }


  // ❌ Wrong Answers list
  if (wrongAnswers.length > 0) {
    $("#answers").append("<h3>❌ Review Mistakes:</h3>");
    wrongAnswers.forEach(item => {
      $("#answers").append(`
        <div class='wrong-answer'>
          <b>Q:</b> ${item.question}<br>
          <b>Your Answer:</b> ${item.given}<br>
          <b class='correct'>Correct:</b> ${item.correct}
        </div>
      `);
    });
  }

  // 🔁 Retry
  $("#retryBtn").click(function () {
    localStorage.clear();
    window.location.href = "index.html";
  });

  // 🖨️ Print only certificate
  $("#print").click(function () {
    // Hide unwanted sections before printing
    $("#retryBtn, #answers, #print").hide();

    // Temporarily make only #main visible
    $("body > *").not("#main").hide();

    // Print the certificate
    window.print();

    // After printing, restore everything
    $("body > *").show();
  });

});
