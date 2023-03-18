$(document).ready(function () {
    const businessHoursStart = 9;
    const businessHoursEnd = 17;
  
    // Display the current day at the top of the calendar
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
  
    // Create timeblocks for standard business hours
    for (let i = businessHoursStart; i <= businessHoursEnd; i++) {
      const row = $("<div>").addClass("row time-block");
      const hourCol = $("<div>").addClass("col-md-1 hour").text(moment({ hour: i }).format("hA"));
      const textareaCol = $("<textarea>").addClass("col-md-10 description");
      const saveBtnCol = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
  
      row.append(hourCol, textareaCol, saveBtnCol);
      $(".container").append(row);
  
      textareaCol.attr("data-hour", i);
    }
  
    // Color-code each timeblock based on past, present, and future
    function updateTimeblockColors() {
      const currentHour = moment().hour();
  
      $(".description").each(function () {
        const hour = parseInt($(this).attr("data-hour"));
  
        if (hour < currentHour) {
          $(this).addClass("past");
        } else if (hour === currentHour) {
          $(this).removeClass("past").addClass("present");
        } else {
          $(this).removeClass("past present").addClass("future");
        }
      });
    }
  
    updateTimeblockColors();
    setInterval(updateTimeblockColors, 60000); // Update colors every minute
  
    // Load events from local storage
    function loadEvents() {
      $(".description").each(function () {
        const hour = $(this).attr("data-hour");
        const event = localStorage.getItem("event-" + hour);
  
        if (event) {
          $(this).val(event);
        }
      });
    }
  
    loadEvents();
  
    // Save event in local storage when the save button is clicked
    $(".saveBtn").on("click", function () {
      const hour = $(this).siblings(".description").attr("data-hour");
      const event = $(this).siblings(".description").val();
  
      localStorage.setItem("event-" + hour, event);
    });
  });
  