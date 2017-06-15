$("#btn-submit").click(function () {

  var numberA = parseInt($("#numberFrom").val(), 10),
    numberB = parseInt($("#numberTo").val(), 10),
    $para = $('#number'),
    randomNumb = _getRandomNumb(numberA, numberB);
  $para.text(randomNumb);


});

function _getRandomNumb(min, max) {
  var random = Math.floor(Math.random() * (max - min) + min);
  return random;

};