let totalScore = 0;
const choicesMap: Map<number, number> = new Map();

function selectChoice(questionId: number, choiceValue: number) {
  choicesMap.set(questionId, choiceValue);
}

function showResult() {
  const resultElement = document.getElementById("result") as HTMLDivElement;

  totalScore = 0;
  choicesMap.forEach((value) => {
    totalScore += value;
  });

  resultElement.innerText = `あなたのスコア: ${totalScore} / 4`;
  resultElement.style.display = "block";
}

const choicesElements = document.querySelectorAll('.choice-label input[type="radio"]');

choicesElements.forEach((choiceElement) => {
    choiceElement.addEventListener('change', () => {
        const selectedValue = parseInt((choiceElement as HTMLInputElement).value);
        const questionId = 1; // ここでは質問は1つだけなので、IDは1に固定
        selectChoice(questionId, selectedValue);
    });
});