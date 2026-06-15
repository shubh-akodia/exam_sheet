$(document).ready(function () {

    let captchaText = "";
    let captchaVerified = false;

    // Default error messages
    $("#name_error_msg").text("Please fill the name");
    $("#fname_error_msg").text("Please fill the father name");
    $("#email_error_msg").text("Please fill the email");
    $("#dob_error_msg").text("Please fill the DOB");
    $("#mobile_error_msg").text("Please fill the mobile");
    $("#address_error_msg").text("Please fill the address");

    // Email validation
    $("#email").on("input", function () {
        let email = $(this).val().trim();
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "") {
            $("#email_error_msg").text("Please fill the email").css("color", "red");
        } else if (!emailPattern.test(email)) {
            $("#email_error_msg").text("Invalid email format").css("color", "red");
        } else {
            $("#email_error_msg").text("Valid email ✅").css("color", "green");
        }
        checkAllFields();
    });

    // Other inputs
    $("input:not(#email), textarea").on("input", function () {
        let id = $(this).attr("id");
        if ($(this).val().trim() !== "") {
            $("#" + id + "_error_msg").text("Done ✅").css("color", "green");
        } else {
            $("#" + id + "_error_msg").text("Please fill the field").css("color", "red");
        }
        checkAllFields();
    });

    // Gender check
    $(".gender").on("change", function () {
        checkAllFields();
    });

    // Captcha
    function generateCaptcha() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        captchaText = "";
        for (let i = 0; i < 6; i++) {
            captchaText += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        let canvas = document.getElementById("captchaCanvas");
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "28px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(captchaText, 30, 35);
    }

    generateCaptcha();

    $("#refreshCaptcha").click(function () {
        generateCaptcha();
        $("#captcha_result").text("");
    });

    $("#captcha_input").on("input", function () {
        let userInput = $(this).val();
        if (userInput === "") {
            $("#captcha_result").text("Please enter captcha").css("color", "red");
            captchaVerified = false;
        } else if (userInput === captchaText) {
            $("#captcha_result").text("✅ Captcha Verified").css("color", "green");
            captchaVerified = true;
        } else {
            $("#captcha_result").text("Wrong Captcha").css("color", "red");
            captchaVerified = false;
        }
        checkAllFields();
    });

    // Image upload
    $("#image").on("change", function (e) {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function (event) {
                localStorage.setItem("userImage", event.target.result);
                $("#image_error_msg").text("Image uploaded ✅").css("color", "green");
                checkAllFields();
            };
            reader.readAsDataURL(file);
        } else {
            $("#image_error_msg").text("Please upload image").css("color", "red");
            checkAllFields();
        }
    });

    //  Check all fields filled
    function checkAllFields() {
        let email = $("#email").val().trim();
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        let allFilled =
            $("#name").val().trim() &&
            $("#fname").val().trim() &&
            emailPattern.test(email) &&
            $("#dob").val().trim() &&
            $("#mobile").val().trim() &&
            $("#address").val().trim() &&
            $(".gender:checked").length > 0 &&
            $("#image").val() &&
            captchaVerified;

        $("#sub_btn").prop("disabled", !allFilled);
    }

    // Submit button click
    $("#sub_btn").click(function (e) {
        e.preventDefault();

        let name = $("#name").val().trim();
        let image = localStorage.getItem("userImage");

        if (!name) {
            Swal.fire({
                icon: "error",
                title: "Missing Info",
                text: "Please enter your name!",
            });
            return;
        }

        // SweetAlert with image and name
        Swal.fire({
            title: `👋 Hello, ${name}!`,
            text: "Your form has been successfully submitted 🎉",
            imageUrl: image,
            imageWidth: 120,
            imageHeight: 120,
            imageAlt: "User Image",
            showConfirmButton: false,
            timer: 2500,
            background: "#f0f9ff",
            color: "#333",
        });

        localStorage.setItem("userName", name);

        // Redirect after alert
        setTimeout(() => {
            window.location.href = "rules.html";
        }, 2500);
    });
});
