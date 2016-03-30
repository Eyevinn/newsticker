// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('testcanvas');

// create a rectangle object
var rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'blue',
    width: 30,
    height: 30
});

// "add" rectangle onto canvas
canvas.add(rect);
