document.getElementById("btn").addEventListener("click", generateDiv);
function generateDiv() {
    var divA = document.getElementById('mainDiv');
    var dfrag = document.createDocumentFragment();
    var numFrom = document.getElementById('numFrom').value;
    var intNumFrom = parseInt(numFrom);
    var numTo = document.getElementById('numTo').value;
    var intNumTo = parseInt(numTo);
    _getValidation(numFrom, numTo);
    var count = _generateRandom(intNumFrom, intNumTo);
    

    for (var i = 0; i <= count; i++) {
        var div = document.createElement("div");
        dfrag.appendChild(div);
    }
    for (var i = 0; i < dfrag.childNodes.length; i++) {
        div = dfrag.childNodes[i];
        _getDivStyle(div);
    }
    divA.appendChild(dfrag);
};
function _getRndColor() {
    var r = ('0' + _generateRandom(0, 255).toString(16)).substr(-2),
        g = ('0' + _generateRandom(0, 255).toString(16)).substr(-2),
        b = ('0' + _generateRandom(0, 255).toString(16)).substr(-2);
    return '#' + r + g + b;
};

function _generateRandom(min, max) {
    var number = Math.floor(Math.random() * (max - min)) + min;
    return number;

};

function _getBorderColor(width, height) {

    if ((parseInt(width, 10) > 755) || (parseInt(height, 10)) > 505) {
        color = 'RED';
    } else {
        color = _getRndColor()
    } return color;
};

function _getDivStyle(div) {
    div.className = "newDivs";
    div.style.width = _generateRandom(10, 800) + "px";
    div.style.height = _generateRandom(10, 800) + "px";
    div.style.backgroundColor = _getRndColor();
    div.style.color = _getRndColor();
    div.style.position = "absolute";
    div.style.border = "solid";
    div.style.borderColor = _getBorderColor(div.style.width, div.style.height);
    div.style.borderWidth = _generateRandom(0.5, 5) + 'px';
    div.style.borderRadius = _generateRandom(2, 3) + "px";
};
function _getValidation(numbOne, numbTwo) {
    if ((numbOne == "") || (numbTwo == "")) {
        alert("Please fill the empty fields")

    }
    else if (isNaN(parseInt(numbOne)) || isNaN(parseInt(numbTwo))) {
        alert("Please enter a valid Numbers")
    }
};
