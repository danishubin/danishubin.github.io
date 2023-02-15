let el = document.getElementsByClassName("contain")[0];
const now = new Date();
let xArray = [0];
let lastTime = [now.getTime()]
let yArray = [0];

function getDate() {
    // Get the "date" element we made in step 1
    let text = document.getElementById("date");
    // Create and set variable to current date and time using the Date() function
    const now = new Date();
    const clickTime = now.getTime();
    el.innerHTML = now;
    // Set the content inside the p tag to the date 
    xArray.push((Math.abs(lastTime.slice(-1) - clickTime) / 1000))
    yArray.push(parseInt(yArray.slice(-1)) + 1);
    lastTime.push(clickTime);
    // Define Data
    var data = [{
        x: yArray,
        y: xArray,
        mode: "markers",
        type: "scatter"
    }];

    // Define Layout
    var layout = {
        xaxis: { range: [yArray[0], yArray.slice(-1)], title: "Attempt #" },
        yaxis: { range: [0, 20], title: "Seconds Difference" },
        title: "Seconds Difference Over Time"
    };

    Plotly.newPlot("myPlot", data, layout);
}