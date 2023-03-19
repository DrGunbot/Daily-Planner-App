$(document).ready(function () {
  // Get the current day
  const currentDay = moment();
  // Declare a variable to track dark mode state
  let darkModeEnabled = false;

  // Display the current day on the page
  $("#currentDay").text(currentDay.format("dddd, MMMM Do YYYY"));

  // Add a click event listener to the dark mode toggle button
  $(".btn--toggle-dark-mode").on("click", function () {
    // Toggle the dark mode state
    darkModeEnabled = !darkModeEnabled;

    // Add or remove the dark-mode class based on the current state
    if (darkModeEnabled) {
      $("body").addClass("dark-mode");
    } else {
      $("body").removeClass("dark-mode");
    }
  });

  // Function to load events from localStorage
  function loadEvents() {
    // Iterate through each textarea with class "description"
    $(".description").each(function () {
      const hour = $(this).attr("data-hour");
      const eventKey = `event-${currentDay.format("YYYY-MM-DD")}-${hour}`;
      const event = localStorage.getItem(eventKey);

      // If there is an event, set the textarea value to the event
      if (event) {
        $(this).val(event);
      } else {
        // If there is no event, clear the textarea value
        $(this).val("");
      }
    });
  }

  // Load events on page load
  loadEvents();

  // Add a click event listener to the save buttons
  $(".saveBtn").on("click", function () {
    // Save an event for the current day and hour
    const hour = $(this).siblings(".description").attr("data-hour");
    const event = $(this).siblings(".description").val();
    const eventKey = `event-${currentDay.format("YYYY-MM-DD")}-${hour}`;

    localStorage.setItem(eventKey, event);
    toastr.success("Event saved!");
  });

  // Function to update timeblock colors based on the current time
  function updateTimeblockColors() {
    const currentHour = moment().hour();

    // Iterate through each textarea with class "description"
    $(".description").each(function () {
      const hour = parseInt($(this).attr("data-hour"));

      // Update the textarea classes based on the current time
      if (hour < currentHour) {
        $(this).addClass("past").removeClass("present future");
      } else if (hour === currentHour) {
        $(this).addClass("present").removeClass("past future");
      } else {
        $(this).addClass("future").removeClass("past present");
      }
    });
  }

  // Update timeblock colors on page load
  updateTimeblockColors();

  // Set an interval to update timeblock colors every minute
  setInterval(updateTimeblockColors, 60000);
});
