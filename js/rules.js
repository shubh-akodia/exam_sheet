
$(document).ready(function () {

    // ✅ Get name & image from localStorage
    let name = localStorage.getItem("userName");
    let img = localStorage.getItem("userImage");

    console.log("Fetched Name:", name);
    console.log("Fetched Image:", img);

    // ✅ Show Name if available
    if (name && name.trim() !== "") {
        $("#username").text(name).css({
            "position": "absolute",
            "top": "20px",
            "left": "80px",
            "font-size": "20px",
            "font-weight": "bold",
            "color": "darkblue"
        });
    } else {
        $("#username").text("Name not found").css({
            "color": "red",
            "position": "absolute",
            "top": "20px",
            "left": "80px"
        });
    }

    // ✅ Show Image if available
    if (img && img.startsWith("data:image")) {
        $("#userPhoto").attr("src", img).css({
            "position": "absolute",
            "top": "5px",
            "left": "20px",
            "width": "50px",
            "height": "50px",
            "border-radius": "50%"
        });
    }

    // ✅ Checkbox enable logic
    $("#checkbox").change(function () {
        $("#next_btn").prop("disabled", !$("#checkbox").is(":checked"));
    });

    // ✅ NEXT Button click
    $("#next_btn").click(function () {
        if ($("#checkbox").is(":checked")) {
            window.location.href = "questions.html";
        } else {
            alert("Please accept terms before continuing.");
        }
    });
});
