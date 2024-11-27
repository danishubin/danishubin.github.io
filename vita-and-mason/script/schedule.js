var leftArrow = document.getElementsByClassName("left")[0];
var rightArrow = document.getElementsByClassName("right")[0];
var schedule = document.getElementsByClassName("schedule")[0];

leftArrow.addEventListener("click", function() {
    schedule.scrollBy(-200, 0);
});

rightArrow.addEventListener("click", function() {
    schedule.scrollBy(200, 0);
});

// click and drag

// const pointerScroll = (elem) => {
//     const dragStart = (ev) => elem.setPointerCapture(ev.pointerId);
//     const dragEnd = (ev) => elem.releasePointerCapture(ev.pointerId);
//     const drag = (ev) => elem.hasPointerCapture(ev.pointerId) && (elem.scrollLeft -= ev.movementX);

//     elem.addEventListen("pointerdown", dragStart);
//     elem.addEventListen("pointerup", dragEnd);
//     elem.addEventListen("pointermove", drag);
// }

// document.querySelectorAll(".schedule").forEach(pointerScroll);