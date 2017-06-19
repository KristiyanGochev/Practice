(function () {
    document.getElementById("btn").addEventListener("click", generateDiv);
    function generateDiv() {
        "use strict"
        var divA = document.getElementById('mainDiv');
        var dfrag = document.createDocumentFragment();
        var numFrom = document.getElementById('numFrom').value;
        var intNumFrom = parseInt(numFrom);
        var numTo = document.getElementById('numTo').value;
        var intNumTo = parseInt(numTo);
        _getValidation(numFrom, numTo);
        var count = _generateRandom(intNumFrom, intNumTo);
	_clearBox(divA);
		
        for (var i = intNumFrom; i <= count; i++) {
            var div = document.createElement("div");
            dfrag.appendChild(div);
        }
        for (var i = 0; i < dfrag.childNodes.length; i++) {
            div = dfrag.childNodes[i];
            _setDivStyle(div);
        }
        divA.appendChild(dfrag);
	};
	
    function _setDivStyle(div) {
        "use strict"
        div.className = "newDivs";
        div.style.width = _generateRandom(50, 200) + "px";
        div.style.height = _generateRandom(50, 200) + "px";
        div.style.backgroundColor = _setRndColor();
        div.style.border = "solid";
        div.style.left = _generateRandom(10, 800) + "px";
        div.style.top = _generateRandom(10, 800) + "px";
        div.style.borderColor = _setBorderColor(div.style.width, div.style.height, div.style.top, div.style.left);
        div.style.borderWidth = _generateRandom(0.5, 5) + 'px';
        div.style.borderRadius = _generateRandom(0, 100) + "px";
    };

    function _setRndColor() {
        "use strict"
        var r = _generateRandom(0, 255), // red
            g = _generateRandom(0, 255), // green
            b = _generateRandom(0, 255); // blue
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    };

    function _generateRandom(min, max) {
        "use strict"
        var number = Math.floor(Math.random() * (max - min)) + min;
        return number;
    };

    function _setBorderColor(width, height, top, left) {
        "use strict"
        if ((parseInt(left, 10) + (parseInt(width, 10)) > 800) || (parseInt(top, 10)) + (parseInt(height, 10)) > 600) {
            var color = 'RED';
        } else {
            var color = _setRndColor()
        } return color;
    };
	
    function _clearBox(divA){
    	divA.innerHTML = "";
    };

    function _getValidation(numbOne, numbTwo) {
        "use strict"
        if ((numbOne == "") || (numbTwo == "")) {
            alert("Please fill the empty fields")
        }
        else if (isNaN(parseInt(numbOne)) || isNaN(parseInt(numbTwo))) {
            alert("Please enter a valid Numbers")
        }else if(numbOne > numbTwo){
	    alert("Please note that the 'From' number must be with lower value than the 'To' number ")
	}
        return;
    };
}());
