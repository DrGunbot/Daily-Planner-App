$(document).ready(function () {
    const businessHoursStart = 9;
    const businessHoursEnd = 17;
    const selectedDate = moment();
  
    function updateSelectedDate(date) {
      selectedDate.date(date.date());
      selectedDate.month(date.month());
      selectedDate.year(date.year());
      $("#currentDay").text(selectedDate.format("dddd, MMMM Do YYYY"));
      loadEvents();
    }
  
    $("#datepicker").datepicker({
      todayHighlight: true,
      autoclose: true,
    }).on('changeDate', function (e) {
      updateSelectedDate(e.date);
    });
  
    updateSelectedDate(moment());
  
    for (let i = businessHoursStart; i <= businessHoursEnd; i++) {
      const row = $("<div>").addClass("row time-block");
      const hourCol = $("<div>").addClass("col-md-1 hour").text(moment({ hour: i }).format("hA"));
      const textareaCol = $("<textarea>").addClass("col-md-10 description");
      const saveBtnCol = $("<button>").addClass("col-md-1 saveBtn").html('<i class="fas fa-save"></i>');
  
      row.append(hourCol, textareaCol, saveBtnCol);
      $(".container").append(row);
  
      textareaCol.attr("data-hour", i);
    }
  
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
  
    function loadEvents() {
      $(".description").each(function () {
        const hour = $(this).attr("data-hour");
        const eventKey = `event-${selectedDate.format("YYYY-MM-DD")}-${hour}`;
        const event = localStorage.getItem(eventKey);
  
        if (event) {
          $(this).val(event);
        } else {
          $(this).val('');
        }
      });
    }
  
    loadEvents();
  
    $(".saveBtn").on("click", function () {
      const hour = $(this).siblings(".description").attr("data-hour");
      const event = $(this).siblings(".description").val();
      const eventKey = `event-${selectedDate.format("YYYY-MM-DD")}-${hour}`;
  
      localStorage.setItem(eventKey, event);
      toastr.success("Event saved!");
    });
  });
  