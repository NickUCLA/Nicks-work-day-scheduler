$(function () {
  $(".saveBtn").on("click", function () {
    var description = $(this).siblings(".description").val();
    var timeBlockId = $(this).parent().attr("id");
    //saves the description and timeblockId in local storage
    localStorage.setItem(timeBlockId, description);
  });

  var currentHour = dayjs().hour();
  $(".time-block").each(function () {
    timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
    if (timeBlockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (timeBlockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
    // compares timeblock to current hour and applies classes
  });

  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedEvent = localStorage.getItem(timeBlockId);
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
      // gets time blocks description if one is saved to local storage
    }
  });

  // displays the current day and date
  var currentDate = dayjs().format("dddd, MMM DD, YYYY");
  // adds css style to the day
  var formattedDate = currentDate.replace(
    dayjs().format("dddd"),
    '<span class="day">' + dayjs().format("dddd") + "</span>"
  );
  $("#currentDay").html("Today is " + formattedDate);
});
