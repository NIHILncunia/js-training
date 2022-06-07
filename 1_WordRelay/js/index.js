const $divModal = document.querySelector('#modal');
const $divApp = document.querySelector('#app');
const $divGameOver = document.querySelector('#game-over');
const $pPlayer = document.querySelector('#player');
const $pWord = document.querySelector('#word');
const $pMessage = document.querySelector('#message');
const $playerInput = document.querySelector('#player-input');
const $wordInput = document.querySelector('#word-input');
const $playerButton = document.querySelector('#player-button');
const $wordButton = document.querySelector('#word-button');
const $gameOverButton = document.querySelector('#game-over-button');
const $spanGameOverMessageDetail = document.querySelector('#game-over-message-detail');
const $pRed = document.querySelector('.red');
const $divWordList = document.querySelector('#word-list');
let word;
let player;
let currentPlayer = 1;
const wordArray = [];
// eslint-disable-next-line no-unused-vars
var GameStatus;
(function (GameStatus) {
    // eslint-disable-next-line no-unused-vars
    GameStatus[GameStatus["FIRST"] = 0] = "FIRST";
    // eslint-disable-next-line no-unused-vars
    GameStatus[GameStatus["NOT_FIRST"] = 1] = "NOT_FIRST";
})(GameStatus || (GameStatus = {}));
let gameStatus;
const gameStart = (e) => {
    e.preventDefault();
    if ($playerInput.value !== '') {
        gameStatus = GameStatus.FIRST;
        player = parseInt($playerInput.value, 10);
        $pPlayer.textContent = `플레이어: ${player}`;
        $pMessage.textContent = `${currentPlayer}번 플레이어님의 턴.`;
        $pWord.textContent = '제시어를 입력하세요.';
        $divModal.classList.add('hidden');
        $divGameOver.classList.add('hidden');
        $divApp.classList.remove('hidden');
        wordArray.length = 0;
        $divWordList.textContent = '제시어 목록이 없습니다.';
        currentPlayer = 1;
    }
    else {
        $pRed.classList.remove('hidden');
    }
};
$playerButton.addEventListener('click', gameStart);
const gameOver = (message) => {
    $divApp.classList.add('hidden');
    $divGameOver.classList.remove('hidden');
    $spanGameOverMessageDetail.textContent = message;
};
const validateWord = (words, nextWord) => {
    const currentWord = words[words.length - 1];
    if (nextWord === '') {
        gameOver('단어를 입력해주세요.');
    }
    if (gameStatus === GameStatus.FIRST) {
        words.push(nextWord);
    }
    else {
        if (words.includes(nextWord)) {
            gameOver('다른 플레이어가 이미 사용한 단어입니다.');
        }
        else {
            if (currentWord[currentWord.length - 1] === nextWord[0]) {
                words.push(nextWord);
            }
            else {
                gameOver('기존 제시어의 마지막 문자와 현재 제시어의 첫 문자가 다릅니다.');
            }
        }
    }
};
const playerCount = () => {
    currentPlayer = currentPlayer === player ? 1 : currentPlayer + 1;
    $pMessage.textContent = `${currentPlayer}번 플레이어님의 턴.`;
    $wordInput.value = '';
};
const wordServe = (e) => {
    e.preventDefault();
    if (gameStatus === GameStatus.FIRST) {
        word = $wordInput.value;
        $pWord.textContent = `단어: ${word}`;
        validateWord(wordArray, word);
        playerCount();
        $divWordList.textContent = wordArray.join('<br />');
        gameStatus = GameStatus.NOT_FIRST;
    }
    else if (gameStatus === GameStatus.NOT_FIRST) {
        word = $wordInput.value;
        $pWord.textContent = `단어: ${word}`;
        validateWord(wordArray, word);
        playerCount();
        $divWordList.textContent = wordArray.join('<br />');
    }
};
const newGame = () => {
    $divModal.classList.remove('hidden');
    $divApp.classList.add('hidden');
    $divGameOver.classList.add('hidden');
    $playerInput.value = '';
};
$wordButton.addEventListener('click', wordServe);
$gameOverButton.addEventListener('click', newGame);
//# sourceMappingURL=index.js.map