// ポイントを格納する変数
let points = 0;

// ボタンがクリックされたときの処理
document.getElementById("answer-1").addEventListener("click", function () {
  points += 0;
  console.log("現在のポイント: " + points);
});

document.getElementById("answer-2").addEventListener("click", function () {
  points += 1;
  console.log("現在のポイント: " + points);
});

document.getElementById("answer-3").addEventListener("click", function () {
  points += 2;
  console.log("現在のポイント: " + points);
});

document.getElementById("answer-4").addEventListener("click", function () {
  points += 3;
  console.log("現在のポイント: " + points);
});

document.getElementById("answer-5").addEventListener("click", function () {
  points += 4;
  console.log("現在のポイント: " + points);
});
