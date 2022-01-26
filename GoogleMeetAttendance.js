var studentNames = "zWGUib" // Use your own class name

// Set new local storage if there is not previously
if (
    localStorage.getItem("attendance") == undefined ||
    localStorage.getItem("attendance") == null
) {
    localStorage.setItem("attendance", "{}"); 
}
if (
    localStorage.getItem("studentPresence") == undefined ||
    localStorage.getItem("studentPresence") == null
) {
    localStorage.setItem("studentPresence", "{}"); 
}
if (
    localStorage.getItem("counter") == undefined ||
    localStorage.getItem("counter") == null
) {
    localStorage.setItem("counter", "0"); 
}


// Load from local storage
var attendance = JSON.parse(localStorage.getItem("attendance"));
var studentPresence = JSON.parse(localStorage.getItem("studentPresence"));
var attendanceCounter = parseInt(localStorage.getItem("counter"));
var classIsRunning = false;

// Take attendance
function takeAttendance() {
    if (classIsRunning == true){
        attendance = JSON.parse(localStorage.getItem("attendance"));
        var studentsOnRoom = document.getElementsByClassName(studentNames);
        for (let i = 0; i < studentsOnRoom.length; i += 1) {
            if (studentsOnRoom[i].textContent in attendance) {
                attendance[studentsOnRoom[i].textContent] += 1;
            } else {
                attendance[studentsOnRoom[i].textContent] = 0;
            }
        }
        
        localStorage.setItem("attendance", JSON.stringify(attendance));
        studentStats();
        attendanceCounter += 1;
        localStorage.setItem("counter", `${attendanceCounter}`); 
        console.log("attendance updated");
    }
    else {
        console.log("Class is not active");
    }
    setTimeout(takeAttendance, 10000);
}

// Convert attended time to precentage
function studentStats() {
    var studentPresence = JSON.parse(localStorage.getItem("studentPresence"));
    for (let i = 0; i < Object.keys(attendance).length; i += 1) {
        studentPresence[Object.keys(attendance)[i]] = Math.round(
            (parseInt(Object.values(attendance)[i]) / attendanceCounter) * 100
        );
    }
    localStorage.setItem("studentPresence", JSON.stringify(studentPresence));
}

// Execute
takeAttendance();



// Start taking attendance
classIsRunning = true;
// Stop taking attendance
classIsRunning = false;
// see attended people
localStorage.studentPresence;
// Clear attendance for brand new
localStorage.clear();

// I recommend you to save attendance in spreadsheet for backup.
