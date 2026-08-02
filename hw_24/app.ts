function highlightForbiddenWords(text: string, forbiddenWords: string[]): string {
    if (forbiddenWords.length === 0) {
        return text;
    }

    const pattern = forbiddenWords.join('|');

    const regex = new RegExp(pattern, 'gi');

    return text.replace(regex, '<del>$&</del>');
}

document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput') as HTMLInputElement;
    const wordsInput = document.getElementById('wordsInput') as HTMLInputElement;
    const processBtn = document.getElementById('processBtn') as HTMLButtonElement;
    const resultDiv = document.getElementById('result') as HTMLDivElement;

    processBtn.addEventListener('click', () => {
        const text = textInput.value;

        const forbiddenWords = wordsInput.value
            .split(',')
            .map(word => word.trim())
            .filter(word => word.length > 0);

        const highlightedText = highlightForbiddenWords(text, forbiddenWords);

        resultDiv.innerHTML = highlightedText;
    });
});