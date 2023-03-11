// Current date displayed
var currentDay = $("#currentDay");
currentDay.text(moment().format("MMMM Do YYYY"));

// Presenting timeblocks from 9 to 5
var startOfBusiness = moment(09, "HH");
while (startOfBusiness.hour() < 18) {
  for (i = 9; i <= 18; i++) {
    var rowEl = $(`<div class="row">`);
    var hourEl = $(`<div class="hour">${startOfBusiness.format("ha")}</div>`);
    var textAreaEl = $(
      `<textarea class="text" data-task="${i}" id="txtArea${i}" ></textarea>`
    );
    var saveBtnEl = $(
      `<button class="saveBtn" data-index="${i}"><i class="fas fa-save"></i></button>`
    );
    rowEl.append(hourEl, textAreaEl, saveBtnEl);

    $(".container").append(rowEl);

    startOfBusiness.add(1, "hours");

    // Retrieve saved data from localStorage and display it on the timeblocks
    var tasks = JSON.parse(localStorage.getItem(i));
    if (tasks !== null) {
      $(`#txtArea${i}`).val(tasks[tasks.length - 1]);
    }
  }

  // Color-code each timeblock based on past, present and future
  var hour = parseInt(moment().format("HH"));
  for (i = 9; i <= 18; i++) {
    if (hour == i) {
      $(`#txtArea${i}`).addClass("present");
    } else if (hour < i) {
      $(`#txtArea${i}`).addClass("past");
    } else $(`#txtArea${i}`).addClass("future");
  }

  // Allow user to enter an event when they click a timeblock
  // Push entries to the array and localStorage
  $("button").click(function () {
    var index = $(this).data("index");
    var task = $(`#txtArea${index}`).val();
    var tasks = JSON.parse(localStorage.getItem(index)) || [];

    if (!task.trim()) {
      // If the entry is empty, show an error message
      var messageEl = $("<p>");
      messageEl.text("🚫 Please enter a task before saving.");
      $(".message").append(messageEl);

      // Fade out the error message after a few seconds
      setTimeout(function () {
        messageEl.fadeOut();
      }, 1000);
    } else {
      tasks.push(task);
      localStorage.setItem(index, JSON.stringify(tasks));

      // Add a message to indicate the entry was saved to local storage
      var messageEl = $("<p>");
      messageEl.text("✅ Entry saved to local storage.");
      $(".message").append(messageEl);

      // Fade out the message after a few seconds
      setTimeout(function () {
        messageEl.fadeOut();
      }, 1000);
    }
  });
}

// Add a "Clear All" button at the end of the scheduler
var clearBtnEl = $("<button>").addClass("clearBtn").text("Clear All");
$(".container").append($("<div>").addClass("rowBtn").append(clearBtnEl));

// Attach a click event handler to the "Clear All" button
clearBtnEl.click(function () {
  // Show a confirmation dialog with "Yes" and "No" options
  var confirmDelete = confirm("Are you sure you want to delete all entries?");

  if (confirmDelete) {
    // Clear all tasks from localStorage and reset the textareas
    for (i = 9; i <= 18; i++) {
      localStorage.removeItem(i);
      $(`#txtArea${i}`).val("");
    }

    // Add a message to indicate that all entries were cleared
    var messageEl = $("<p>").text("✅ All entries cleared from local storage.");
    $(".message").append(messageEl);

    // Fade out the message after a few seconds
    setTimeout(function () {
      messageEl.fadeOut();
    }, 1000);
  }
});
