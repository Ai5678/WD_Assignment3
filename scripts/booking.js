/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?
let costPerDay = 35;
let costHalfDay = 20;
var daysSelected = [];
var dayButtons = document.querySelectorAll('.day-selector li');
var fullButton = document.getElementById('full');
var halfButton = document.getElementById('half');
var calculatedCost = document.getElementById("calculated-cost");
var clearButton = document.getElementById("clear-button");

/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!
dayButtons.forEach(function(dayButton) {
    dayButton.addEventListener("click",function() {
        var day = this.id;
        if (!daysSelected.includes(day)) {
            daysSelected.push(day);
            this.style.background = "#E5AF42";
            this.classList.add("clicked");
        }
        else {
            daysSelected = daysSelected.filter(function (selectedDay) {
                return selectedDay !== day;
            });
            this.classList.remove("clicked");
            this.style.background = "";
        }
        calculateTotalcost();
    });
});


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.
clearButton.addEventListener("click", function() {
    daysSelected = [];
    dayButtons.forEach(function(dayButton) {
        dayButton.classList.remove("clicked");
        dayButton.style.background = "";
    });
    calculatedCost.textContent = "0";
});

/********* change rate *********/
// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.
halfButton.addEventListener("click",function() {
    costPerDay = costHalfDay;
    halfButton.classList.add("clicked");
    document.getElementById("full").classList.remove("clicked");
    halfButton.style.background = "#E5AF42";
    fullButton.style.background = "";
    calculateTotalcost();
});

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.
fullButton.addEventListener("click",function() {
    costHalfDay = costPerDay;
    costPerDay = 35;
    fullButton.classList.add("clicked");
    document.getElementById("half").classList.remove("clicked");
    fullButton.style.background = "#E5AF42";
    halfButton.style.background = "";
    calculateTotalcost();
});

/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value
function calculateTotalcost() {
    var totalCost = daysSelected.length * costPerDay;
    calculatedCost.textContent = totalCost;
}

