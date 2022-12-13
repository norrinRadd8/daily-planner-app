
// Current date displayed
var currentDay = $("#currentDay")
currentDay.text(moment().format('MMMM Do YYYY'))

// Presenting timeblocks from 9 to 5
var startOfBusiness = moment(09, 'HH');
while (startOfBusiness.hour() < 18) {
    for (i = 9; i <= 18; i++) {
        var rowEl = $(`<div class="row">`)
        var hourEl = $(`<div class="hour col-lg-1">${startOfBusiness.format('hha')}</div>`)
        var textAreaEl = $(`<textarea class="col-lg-10" data-task="${i}" id="txtArea${i}" ></textarea>`)
        var saveBtnEl = $(`<button class="saveBtn col-lg-1" data-index="${i}"><i class="fas fa-save"></i></button>`)
        rowEl.append(hourEl, textAreaEl, saveBtnEl)

        $(".container").append(rowEl)

        startOfBusiness.add(1, 'hours');
    }

// Color-code each timeblock based on past, present and future
var hour = parseInt((moment().format('HH')))
    for (i = 9; i <= 18; i++) {
        if (hour == i) {
            $(`#txtArea${i}`).addClass('present')
        } else if (hour < i) {
            $(`#txtArea${i}`).addClass('past')

        } else $(`#txtArea${i}`).addClass('future')
    }

// Allow user to enter an event when they click a timeblock
// Push entries to the array and localStorage
$("button").click(function () {
    var taskInput = []
    var index = $(this).data("index")
    var task = $(this).data("task") 
    
    taskInput.push(index, task)
    localStorage.setItem(index, task)
    
    
})

        


}

