var totalScore = 0;
var choicesMap = new Map();
function selectChoice(questionId, choiceValue) {
  choicesMap.set(questionId, choiceValue);
}
function showResult() {
  var resultElement = document.getElementById("result");
  totalScore = 0;
  choicesMap.forEach(function (value) {
    totalScore += value;
  });
  resultElement.innerText =
    "\u3042\u306A\u305F\u306E\u30B9\u30B3\u30A2: ".concat(totalScore, " / 4");
  resultElement.style.display = "block";
}
var choicesElements = document.querySelectorAll(
  '.choice-label input[type="radio"]'
);
choicesElements.forEach(function (choiceElement) {
  choiceElement.addEventListener("change", function () {
    var selectdValue = parseInt(choiceElement.value);
    var questionId = 1; // ここでは質問は1つだけなので、IDは1に固定
    selectChoice(questionId, selectedValue);
  });
});

//if文でページ遷移
//何を指定しているのかを記述するべき　コメントアウト
//ゆっくり読めばわかる
//ABテスト　保守運用ができるのか
//色の明瞭度

//
