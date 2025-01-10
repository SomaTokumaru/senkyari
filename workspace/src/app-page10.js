const quizContainer = document.getElementById("quiz-container");
// const totalScoreDisplay = document.getElementById("total-score");
// const resetButton = document.getElementById("reset-button");
const nextButton = document.getElementById("next-button");
// sessionStorage から合計点を読み込む (ページ読み込み時)
let totalScore = sessionStorage.getItem("totalScore");
if (totalScore === null) {
  totalScore = 0;
} else {
  totalScore = parseInt(totalScore, 10);
}
// totalScoreDisplay.textContent = `合計点: ${totalScore}`;

// ボタンに割り当てる点数
const buttonScores = [0, 1, 2, 3, 4];

// 問題文とボタンのセットを定義
const quizData = [
  { question: "できる限り初対面の人には<wbr>好印象でいたいと努力する。" },
  { question: "チームでの会議やオフラインで<wbr>関わることは重要だと思う。" },
  { question: "正直であることも重要だが<wbr>思いやりを持つことを優先したい。" },
  {
    question:
      "社交の場では、できる限り目立ちたいし<wbr>人気になりたいと頭では思っている。",
  },
  { question: "1人でいるよりも人と<wbr>一緒にいたいほうが多い。" },
  { question: "他人からは活発で社交的と言われる。" },
  { question: "電話をするのに抵抗はあまりない。" },
  { question: "誰かに評価をされると<wbr>疑うことなく自信を持てる。" },
];

// 10セットの問題とボタンを作成
quizData.forEach((data, i) => {
  // 問題とボタンセットをまとめるdiv
  const quizItem = document.createElement("div");
  quizItem.classList.add("quiz-item");

  // 質問文用のdiv要素
  const questionDiv = document.createElement("div");
  questionDiv.classList.add("question");
  questionDiv.innerHTML = data.question;

  // ボタンセット用のdiv要素
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.id = `button-set-${i}`;

  // 各セットに5つのボタンを作成
  for (let j = 0; j < 5; j++) {
    const button = document.createElement("button");
    button.classList.add("exclusive-button");
    button.textContent = `　`;
    button.dataset.score = buttonScores[j];
    buttonContainer.appendChild(button);
  }

  // 「全く思わない」「非常にそう思う」のラベルをまとめるdiv
  const labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container");

  // 「全く思わない」のラベル
  const leftLabel = document.createElement("span");
  leftLabel.classList.add("label-no");
  leftLabel.textContent = "全く思わない";

  // 「非常にそう思う」のラベル
  const rightLabel = document.createElement("span");
  rightLabel.classList.add("label-yes");
  rightLabel.textContent = "非常にそう思う";

  // ラベルを labelContainer に追加
  labelContainer.appendChild(leftLabel);
  labelContainer.appendChild(rightLabel);

  // 要素を quizItem に追加
  quizItem.appendChild(questionDiv);
  quizItem.appendChild(buttonContainer);
  quizItem.appendChild(labelContainer);

  // quizItem を quiz-container に追加
  quizContainer.appendChild(quizItem);

  // 各セットのボタンにイベントリスナーを追加
  const buttons = buttonContainer.querySelectorAll(".exclusive-button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let previousScore = 0;
      const activeButton = buttonContainer.querySelector(
        ".exclusive-button.active"
      );
      if (activeButton) {
        previousScore = parseInt(activeButton.dataset.score, 10);
      }

      buttons.forEach((b) => {
        b.disabled = false;
        b.classList.remove("active");
      });

      button.disabled = true;
      button.classList.add("active");

      const currentScore = parseInt(button.dataset.score, 10);
      totalScore = totalScore - previousScore + currentScore;
      //   totalScoreDisplay.textContent = `合計点: ${totalScore}`;

      sessionStorage.setItem("totalScore", totalScore);

      // 現在の状態を履歴に追加
      const state = {
        totalScore: totalScore,
        activeButtons: getActiveButtonIndices(),
      };
      history.pushState(state, "", window.location.href);
    });
  });
});

// アクティブなボタンのインデックスをセットごとに取得する関数
function getActiveButtonIndices() {
  let activeButtons = [];
  for (let i = 0; i < 8; i++) {
    const buttonContainer = document.getElementById(`button-set-${i}`);
    if (!buttonContainer) continue;
    const buttons = buttonContainer.querySelectorAll(".exclusive-button");
    for (let j = 0; j < buttons.length; j++) {
      if (buttons[j].classList.contains("active")) {
        activeButtons.push({ setId: `button-set-${i}`, buttonIndex: j });
      }
    }
  }
  return activeButtons;
}

// ページ読み込み時と popstate イベント発生時に状態を復元
function restoreState(state) {
  if (state) {
    totalScore = state.totalScore;
    // totalScoreDisplay.textContent = `合計点: ${totalScore}`;
    sessionStorage.setItem("totalScore", totalScore);

    // すべてのボタンを非アクティブにする
    const allButtons = document.querySelectorAll(".exclusive-button");
    allButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove("active");
    });

    // アクティブなボタンを復元
    state.activeButtons.forEach((buttonInfo) => {
      const container = document.getElementById(buttonInfo.setId);
      if (container) {
        const button =
          container.querySelectorAll(".exclusive-button")[
            buttonInfo.buttonIndex
          ];
        if (button) {
          button.disabled = true;
          button.classList.add("active");
        }
      }
    });
  }
}

// popstate イベントリスナー
window.addEventListener("popstate", (event) => {
  restoreState(event.state);
});

// ページ読み込み時に状態を復元
const initialState = {
  totalScore: totalScore,
  activeButtons: getActiveButtonIndices(),
};
restoreState(initialState);

// 「次へ」ボタンのクリックイベント
nextButton.addEventListener("click", () => {
  let nextPageURL;
  if (totalScore >= 0 && totalScore <= 42) {
    nextPageURL = "result1.html";
  } else if (totalScore >= 43 && totalScore <= 84) {
    nextPageURL = "result2.html";
  } else if (totalScore >= 85 && totalScore <= 126) {
    nextPageURL = "result3.html";
  } else if (totalScore >= 127 && totalScore <= 168) {
    nextPageURL = "result4.html";
  } else if (totalScore >= 169 && totalScore <= 210) {
    nextPageURL = "result5.html";
  } else if (totalScore >= 211 && totalScore <= 252) {
    nextPageURL = "result6.html";
  } else if (totalScore >= 253 && totalScore <= 294) {
    nextPageURL = "result7.html";
  } else if (totalScore >= 295 && totalScore <= 336) {
    nextPageURL = "result8.html";
  } else if (totalScore >= 337 && totalScore <= 378) {
    nextPageURL = "result9.html";
  } else if (totalScore >= 379 && totalScore <= 420) {
    nextPageURL = "result10.html";
  } else {
    // 念のため、デフォルトの遷移先
    nextPageURL = "result1.html";
  }

  // ページ遷移
  window.location.href = nextPageURL;
});
console.log(`合計点: ${totalScore}`); //確認用
