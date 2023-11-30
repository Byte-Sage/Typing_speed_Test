document.addEventListener('DOMContentLoaded', function () {
  const quoteText = "The quick brown fox jumps over the lazy dog.";
  const input = document.getElementById('input');
  const startButton = document.getElementById('startButton');
  const result = document.getElementById('result');

  let startTime, endTime;

  function startTest() {
    input.value = '';
    input.focus();
    startButton.style.display = 'none';
    result.innerText = '';
    startTime = Date.now();
    highlightWords(quoteText);
  }

  function endTest() {
    endTime = Date.now();
    const inputText = input.value.trim().toLowerCase();
    const wordsTyped = inputText.split(/\s+/).filter(word => word !== '').length;
    const timeTaken = (endTime - startTime) / 1000; // in seconds

    const speed = timeTaken !== 0 ? Math.round((wordsTyped / timeTaken) * 60) : 0;
    
    const accuracy = calculateAccuracy(inputText, quoteText);
    result.innerText = `Your typing speed: ${speed} WPM | Accuracy: ${accuracy}%`;
    startButton.style.display = 'block';
  }

  function calculateAccuracy(input, quote) {
    const correctCharacters = input.split('').filter((char, index) => char === quote[index]).length;
    return ((correctCharacters / quote.length) * 100).toFixed(2);
  }

  function highlightWords(quote) {
    const words = quote.split(' ');
    let currentWord = 0;
    input.addEventListener('input', function () {
      const inputWords = input.value.trim().split(/\s+/);
      let text = '';
      inputWords.forEach((word, index) => {
        const space = index === inputWords.length - 1 ? '' : ' ';
        if (word === words[currentWord] && currentWord !== words.length - 1) {
          text += `<span class="correct">${word}</span>${space}`;
          currentWord++;
        } else {
          text += `<span class="incorrect">${word}</span>${space}`;
        }
      });
      input.innerHTML = text;
    });
  }

  startButton.addEventListener('click', startTest);
  input.addEventListener('input', function () {
    if (input.value.toLowerCase() === quoteText.toLowerCase()) {
      endTest();
    }
  });
});
