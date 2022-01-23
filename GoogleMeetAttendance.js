var studentNames = "zWGUib" // Use your own class name

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



var attendance = JSON.parse(localStorage.getItem("attendance"));
var studentPresence = JSON.parse(localStorage.getItem("studentPresence"));
var attendanceCounter = 0;
var classIsRunning = false;

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
        console.log("attendance updated");
    }
    else {
        console.log("Class is not active");
    }
    setTimeout(takeAttendance, 10000);
}

function studentStats() {
    var studentPresence = JSON.parse(localStorage.getItem("studentPresence"));
    for (let i = 0; i < Object.keys(attendance).length; i += 1) {
        studentPresence[Object.keys(attendance)[i]] = Math.round(
            (parseInt(Object.values(attendance)[i]) / attendanceCounter) * 100
        );
    }
    localStorage.setItem("studentPresence", JSON.stringify(studentPresence));
}

takeAttendance();
