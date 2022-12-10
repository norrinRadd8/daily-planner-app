var currentDay = $("#currentDay")
var containerEL = $(".container")
var timeBlockEL = $(".time-block")
var rowEl = $(".row")

// Current date displayed
currentDay.text(moment().format('MMMM Do YYYY, h:mm:ss a'))

// While/For Loop that loops starting at 9 and breaks at 5
    // For each loop generate or build html timeblock row
      // Append timeblock to container
        // Hour
          // A number corresponding with the hour in 12 hour format
        // Textarea
          // Show existing event text, if any and allow user to input event text
        // Save Button
          // When clicked, store/reset the event text corresponding with the hour to localStorage
      // Increase hour by one
      // Check if hour is past, current or future and apply corresponding css class to timeblock

console.log(rowEl)

var startOfBusiness = moment(09, 'HH');

while (startOfBusiness.hour() < 18) {
  containerEL.append(`
   <li>
    <div class="row">
      <div class="hour">${startOfBusiness.format('hha')}</div>
      <textarea></textarea>
      <button class="saveBtn">save</button>
    </div>
   </li>
     
      
    

  `)
  console.log(startOfBusiness.format('hha'));

  startOfBusiness.add(1, 'hours');
}




