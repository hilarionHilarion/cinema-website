/* ================================================
   CINEPLEX - Movie Ticket Booking Website
   External JavaScript File - script.js
   ================================================ */


/* ------------------------------------------------
   BOOKING PAGE
   calculateTotal()
------------------------------------------------ */
function calculateTotal() {

    var movieSelect = document.getElementById("movieSelect");
    var numTickets  = document.getElementById("numTickets");
    var memberType  = document.getElementById("memberType");
    var resultBox   = document.getElementById("resultBox");
    var errorBox    = document.getElementById("errorBox");

    resultBox.style.display = "none";
    errorBox.style.display  = "none";

    var movieName   = movieSelect.options[movieSelect.selectedIndex].text;
    var priceText   = movieSelect.options[movieSelect.selectedIndex].getAttribute("data-price");
    var ticketPrice = parseFloat(priceText);
    var qty         = parseInt(numTickets.value);
    var member      = memberType.value;

    if (isNaN(qty) || qty < 1 || qty > 10) {
        errorBox.innerHTML     = "Please enter a valid number of tickets (between 1 and 10).";
        errorBox.style.display = "block";
        return;
    }

    var subtotal = ticketPrice * qty;

    var discountRate  = 0;
    var discountLabel = "";

    if (member === "regular") {
        discountRate  = 0.10;
        discountLabel = "Regular Member (10% off)";
    } else if (member === "senior") {
        discountRate  = 0.20;
        discountLabel = "Senior Member (20% off)";
    } else if (member === "children") {
        discountRate  = 0.25;
        discountLabel = "Children Member (25% off)";
    } else {
        discountLabel = "Guest (no discount)";
    }

    var discountAmount = subtotal * discountRate;
    var total          = subtotal - discountAmount;

    var resultText = "";
    resultText += "<strong>Order Summary</strong><br><br>";
    resultText += "Film: <strong>" + movieName + "</strong><br>";
    resultText += "Number of Tickets: " + qty + "<br>";
    resultText += "Price per Ticket: £" + ticketPrice.toFixed(2) + "<br>";
    resultText += "Subtotal: £" + subtotal.toFixed(2) + "<br>";
    resultText += "Customer Type: " + discountLabel + "<br>";

    if (discountAmount > 0) {
        resultText += "Discount Applied: -£" + discountAmount.toFixed(2) + "<br>";
    }

    resultText += "<br><strong>Total to Pay: £" + total.toFixed(2) + "</strong>";

    resultBox.innerHTML     = resultText;
    resultBox.style.display = "block";
}



/* ------------------------------------------------
   BOOKING PAGE
   proceedToPayment()
   (Used ONLY if skipping seat selection)
------------------------------------------------ */
function proceedToPayment() {

    var movieSelect = document.getElementById("movieSelect");
    var numTickets  = document.getElementById("numTickets");
    var bookingDate = document.getElementById("bookingDate");
    var showTime    = document.getElementById("showTime");

    var qty = parseInt(numTickets.value);

    if (isNaN(qty) || qty < 1) {
        alert("Please enter the number of tickets before proceeding.");
        return;
    }

    if (bookingDate.value === "") {
        alert("Please select a date for your booking.");
        return;
    }
}   



/* ------------------------------------------------
   SEAT SELECTION PAGE
   goToSeatSelection()
------------------------------------------------ */
function goToSeatSelection() {

    var movieSelect = document.getElementById("movieSelect");
    var numTickets  = document.getElementById("numTickets");
    var bookingDate = document.getElementById("bookingDate");
    var showTime    = document.getElementById("showTime");
    var memberType  = document.getElementById("memberType");

    var qty = parseInt(numTickets.value);

    if (isNaN(qty) || qty < 1) {
        alert("Please enter the number of tickets before selecting seats.");
        return;
    }

    if (bookingDate.value === "") {
        alert("Please select a date for your booking.");
        return;
    }

    var movieName   = movieSelect.options[movieSelect.selectedIndex].text;
    var time        = showTime.options[showTime.selectedIndex].text;
    var member      = memberType.options[memberType.selectedIndex].text;
    var priceText   = movieSelect.options[movieSelect.selectedIndex].getAttribute("data-price");
    var ticketPrice = parseFloat(priceText);

    var subtotal = ticketPrice * qty;

    var discountRate  = 0;
    var discountLabel = "None";

    if (memberType.value === "regular")  { discountRate = 0.10; discountLabel = "10% (Regular Member)"; }
    if (memberType.value === "senior")   { discountRate = 0.20; discountLabel = "20% (Senior Member)"; }
    if (memberType.value === "children") { discountRate = 0.25; discountLabel = "25% (Children Member)"; }

    var discountAmount = subtotal * discountRate;
    var total          = subtotal - discountAmount;

    // SAVE FULL BOOKING DETAILS HERE
    sessionStorage.setItem("cineplexPending", JSON.stringify({
        film:     movieName,
        date:     bookingDate.value,
        time:     time,
        tickets:  qty,
        member:   member,
        discount: discountLabel,
        total:    "£" + total.toFixed(2)
    }));

    // Save seat info for seat.html
    sessionStorage.setItem("cineplexSeatInfo", JSON.stringify({
        film: movieName,
        date: bookingDate.value,
        time: time,
        tickets: qty,
        member: member
    }));

    window.location.href = "seat.html";
}




/* ------------------------------------------------
   LOGIN PAGE
------------------------------------------------ */
function validateLogin() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var errorBox = document.getElementById("loginError");

    errorBox.style.display = "none";

    if (username === "" || password === "") {
        errorBox.innerHTML     = "Please enter both your username and password.";
        errorBox.style.display = "block";
        return;
    }

    if (password.length < 4) {
        errorBox.innerHTML     = "Invalid login details. Please try again.";
        errorBox.style.display = "block";
        return;
    }

    var memberSelect = document.getElementById("memberType");
    var member       = memberSelect.options[memberSelect.selectedIndex].text;

    alert("Login Successful!\n\nWelcome, " + username + ".\nMember Type: " + member);

    window.location.href = "booking.html";
}



/* ------------------------------------------------
   PAYMENT PAGE
------------------------------------------------ */
function confirmPayment() {

    var cardName   = document.getElementById("cardName").value;
    var cardNumber = document.getElementById("cardNumber").value;
    var expiry     = document.getElementById("expiry").value;
    var cvv        = document.getElementById("cvv").value;
    var errorBox   = document.getElementById("payError");

    errorBox.style.display = "none";

    if (cardName === "" || cardNumber === "" || expiry === "" || cvv === "") {
        errorBox.innerHTML     = "Please fill in all payment fields before confirming.";
        errorBox.style.display = "block";
        return;
    }

    if (cardNumber.length < 16) {
        errorBox.innerHTML     = "Please enter a valid 16-digit card number.";
        errorBox.style.display = "block";
        return;
    }

    if (cvv.length < 3) {
        errorBox.innerHTML     = "Please enter a valid CVV.";
        errorBox.style.display = "block";
        return;
    }

    var ref = "CPX" + Math.floor(Math.random() * 90000 + 10000);

    var savedBooking = JSON.parse(sessionStorage.getItem("cineplexPending") || "{}");
    savedBooking.ref   = ref;
    savedBooking.seats = JSON.parse(sessionStorage.getItem("cineplexSeats") || "[]");

    sessionStorage.setItem("cineplexBooking", JSON.stringify(savedBooking));

    alert("Payment Confirmed!\n\nBooking Reference: " + ref);

    window.location.href = "confirmation.html";
}



/* ------------------------------------------------
   EMPLOYEE PAGE
------------------------------------------------ */
function addFilm() {
    var filmTitle    = document.getElementById("filmTitle").value;
    var filmGenre    = document.getElementById("filmGenre").value;
    var filmDuration = document.getElementById("filmDuration").value;
    var filmPrice    = document.getElementById("filmPrice").value;
    var filmTimes    = document.getElementById("filmTimes").value;
    var errorBox     = document.getElementById("addFilmError");

    errorBox.style.display = "none";

    if (filmTitle === "" || filmGenre === "" || filmDuration === "" || filmPrice === "" || filmTimes === "") {
        errorBox.innerHTML     = "Please fill in all fields before adding a film.";
        errorBox.style.display = "block";
        return;
    }

    alert("Film Added Successfully!");
}

function removeFilm(filmName) {
    if (confirm("Remove \"" + filmName + "\"?")) {
        alert(filmName + " removed.");
    }
}

function updateDiscount() {
    var memberType  = document.getElementById("discMemberType").value;
    var newDiscount = document.getElementById("discPercent").value;
    var errorBox    = document.getElementById("discError");

    errorBox.style.display = "none";

    if (newDiscount === "" || isNaN(newDiscount)) {
        errorBox.innerHTML     = "Please enter a valid discount percentage.";
        errorBox.style.display = "block";
        return;
    }

    if (parseInt(newDiscount) < 0 || parseInt(newDiscount) > 100) {
        errorBox.innerHTML     = "Discount must be between 0 and 100.";
        errorBox.style.display = "block";
        return;
    }

    alert("Discount Updated!");
}



/* ------------------------------------------------
   BOOKING PAGE
   updateShowtimes()
------------------------------------------------ */
function updateShowtimes() {

    var movieSelect  = document.getElementById("movieSelect");
    var showTime     = document.getElementById("showTime");
    var selectedFilm = movieSelect.options[movieSelect.selectedIndex].text;

    showTime.innerHTML = "";

    var times = [];

    if (selectedFilm.includes("Dune")) {
        times = ["10:30", "13:45", "17:00", "20:15"];
    } else if (selectedFilm.includes("Oppenheimer")) {
        times = ["11:00", "14:30", "18:00", "21:30"];
    } else if (selectedFilm.includes("Batman")) {
        times = ["12:00", "15:15", "19:00", "22:00"];
    } else if (selectedFilm.includes("Interstellar")) {
        times = ["10:00", "13:00", "16:30", "20:00"];
    } else if (selectedFilm.includes("Gladiator")) {
        times = ["11:30", "14:45", "18:30", "21:45"];
    } else if (selectedFilm.includes("Inside Out")) {
        times = ["09:30", "12:15", "15:00", "17:45"];
    }

    for (var i = 0; i < times.length; i++) {
        var option = document.createElement("option");
        option.text  = times[i];
        option.value = times[i];
        showTime.appendChild(option);
    }
}



/* ------------------------------------------------
   SEAT SELECTION PAGE
------------------------------------------------ */
document.addEventListener("DOMContentLoaded", function () {

    if (!document.getElementById("seatGrid")) return;

    var info = JSON.parse(sessionStorage.getItem("cineplexSeatInfo") || "{}");

    document.getElementById("seatInfo").innerHTML = `
        <strong>Film:</strong> ${info.film}<br>
        <strong>Date:</strong> ${info.date}<br>
        <strong>Time:</strong> ${info.time}<br>
        <strong>Tickets:</strong> ${info.tickets}
    `;

    var seatGrid = document.getElementById("seatGrid");
    var unavailableSeats = ["A3", "A4", "B5", "C1"];

    for (let row = 0; row < 5; row++) {
        for (let col = 1; col <= 10; col++) {

            let seatId = String.fromCharCode(65 + row) + col;

            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.textContent = seatId;

            if (unavailableSeats.includes(seatId)) {
                seat.classList.add("unavailable");
            }

            seat.onclick = function () {
                if (seat.classList.contains("unavailable")) return;

                let selected = document.querySelectorAll(".seat.selected").length;

                if (!seat.classList.contains("selected") && selected >= info.tickets) {
                    alert("You can only select " + info.tickets + " seats.");
                    return;
                }

                seat.classList.toggle("selected");
            };

            seatGrid.appendChild(seat);
        }
    }
});

function confirmSeats() {

    var selectedSeats = Array.from(document.querySelectorAll(".seat.selected"))
                             .map(s => s.textContent);

    if (selectedSeats.length === 0) {
        alert("Please select your seats before continuing.");
        return;
    }

    sessionStorage.setItem("cineplexSeats", JSON.stringify(selectedSeats));

    window.location.href = "payment.html";
}
function goBackToBooking() {
    window.location.href = "booking.html";
}

