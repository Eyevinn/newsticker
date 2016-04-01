function getTickerText() {
    var texts = [
        'Man nekades sex - hämnades med fis | Skaneby köper Alfa | Eyevinn går från klarhet till klarhet',
        'Giftiga mobilskal | Fredrik på nytt uppdrag från April | Eyevinns Mathias vinnare på Guldtuben'
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}

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

canvas.observe('mouse:up', function(options){
    var video = document.getElementById('videoplayer');
    if (!options.target) {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        return;
    }
    var num = (!video.src || video.src.match(/1/)) ? 2 : 1;
    video.src = "videos/video" + num + ".mp4";
    //console.log(options.target)
});

var textcontent = getTickerText();
var text = new fabric.IText(textcontent, { 
    top: 4, 
    fontFamily: 'Verdana', 
    fontSize: 16, 
    fill: 'white' 
});
var tickercontainer = new fabric.Group([ ticker, text ], {
    left: 0,
    top: 0
});
canvas.add(tickercontainer);
tickercontainer.hasControls = false;
tickercontainer.hasBorders = false;
tickercontainer.lockMovementX = true;
tickercontainer.lockMovementY = true;

tickercontainer.animate('top', '325', { 
    onChange: canvas.renderAll.bind(canvas),
    duration: 1000,
    easing: fabric.util.ease.easeOutBounce
});
function scrollLeft() {
    text.set('left',300);
    text.animate('left', -320-textcontent.length*10, {
        onChange: canvas.renderAll.bind(canvas),
        onComplete: scrollLeft,
        duration: 10000
    });
}
scrollLeft();

