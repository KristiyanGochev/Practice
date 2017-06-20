(function () {
    var divs = new Array(5);
    for (var i = 0; i < divs.length; i++) {
        var currentDiv = document.createElement('div');
        var currentDivNode = currentDiv.cloneNode(true);
        document.body.appendChild(currentDivNode);
        divs[i] = currentDivNode;
    }
    var x = 300;
    var y = 200;
    var radius = 100;
    var angle = 0;
    var functionInterval = setInterval(function _moveDivs() {
        angle++;
        if (angle == 180) {
            angle = 0;
        };

        for (var i = 0; i < divs.length; i++) {
            var addition = (180 / divs.length) * i;
            var left = x + Math.cos((2 * 3.14 / 180) * (angle + addition)) * radius;
            var top = y + Math.sin((2 * 3.14 / 180) * (angle + addition)) * radius;
            divs[i].style.left = left + "px";
            divs[i].style.top = top + "px";
        };

        window.addEventListener('mousemove', function (event) {
            x = event.clientX - radius/2;
            y = event.clientY - radius/2;
        }, true);
    }, 100);
}());

