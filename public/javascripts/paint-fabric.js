function getTickerText() {
    var texts = [
        'Man nekades sex - hämnades med fis | Skaneby köper Alfa | Eyevinn går från klarhet till klarhet',
        'Giftiga mobilskal | Fredrik på nytt uppdrag från April | Eyevinns Mathias vinnare på Guldtuben'
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}

var video = document.getElementById('videoplayer');

// create a wrapper around native canvas element (with id="c")
var canvas = new fabric.Canvas('testcanvas');
canvas.setHeight(363);
canvas.setWidth(620);

var ticker = new fabric.Rect({
     fill: '#41B6E6',
     width: 620,
     opacity: 0.8,
     height: 30
});

canvas.on('mouse:up', function(options){
    if (!options.target) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }
});

var textcontent = getTickerText();
var text = new fabric.IText(textcontent, { 
    top: 6, 
    fontFamily: 'Verdana', 
    fontSize: 16, 
    fill: 'white'
});
var tickercontainer = new fabric.Group([ ticker, text ], {
    left: 0
});
canvas.add(tickercontainer);
tickercontainer.hasControls = false;
tickercontainer.hasBorders = false;
tickercontainer.lockMovementX = true;
tickercontainer.lockMovementY = true;
tickercontainer.set('hoverCursor','pointer');
tickercontainer.on('mousedown', sayHi);
tickercontainer.on('mouseup', changeClip);
tickercontainer.on('mousemove', sayHi);

function changeClip(opt) {
    var num = (!video.src || video.src.match(/1/)) ? 2 : 1;
    video.src = "videos/video" + num + ".mp4";
}

function sayHi(obj) {
    console.log("Hi " + (obj.e ? obj.e.type : obj));
}

function easeLinear(t, b, c, d) {
    return c*t/d + b;
};

function fallDown() {
    tickercontainer.set('top',-30);
    tickercontainer.animate('top', '325', { 
        onChange: canvas.renderAll.bind(canvas),
        duration: 1000,
        easing: fabric.util.ease.easeOutBounce
    });
}
fallDown();

function scrollLeft() {
    text.set('left',300);
    text.animate('left', -320-textcontent.length*10, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: scrollLeft,
        easing: easeLinear,
        duration: 10000
    });
}
scrollLeft();

