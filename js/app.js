var keyboard = document.querySelector('#qwerty');
var phraseContainer = document.querySelector('#phrase');
var overlay = document.querySelector('#overlay');
var missed = 0;
var matches = [];

var phrases = [
    'Think big',
    'Let it be',
    'CSS is awesome',
    'Leave no stone unturned',
    'Eye of the tiger',
];

document.querySelector('.btn__reset').addEventListener('click', function() {
    overlay.style.display = 'none';
    reset();
});

keyboard.addEventListener('click', function(e) {
    if(e.target.tagName.toUpperCase() === 'BUTTON') {
        e.target.classList.add('chosen');
        e.target.setAttribute('disabled', true);
        var letterFound = checkLetter(e.target);

        if(letterFound === null) {
            document.querySelector('.tries').remove();
            missed++;
        }
        checkWin();
    }
});

function getRandomPhraseAsArray(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex].split("");
}

function addPhraseToDisplay(arr) {
    arr.forEach(item => {
        let listElement = document.createElement('li');
        listElement.textContent = item;
        if(item !== ' ') {
            listElement.classList.add('letter');
        } else {
            listElement.classList.add('space');
        }
        phraseContainer.querySelector('ul').append(listElement);
    });
}

function checkLetter(selectedLetter) {
    var letters = document.querySelectorAll('.letter');
    var matchedLetter = null;
    [].forEach.call(letters, function(letter) {
        if(letter.textContent.toLowerCase() === selectedLetter.textContent) {
            letter.classList.add('show');
            matchedLetter = selectedLetter.textContent;

        }
    });
    return matchedLetter;
}

function checkWin() {
    var lettersCount = document.querySelectorAll('.letter').length;
    var showedCount = document.querySelectorAll('.show').length;
    if(lettersCount === showedCount) {
        overlay.classList.add('win');
        overlay.style.display = 'flex';
    } else if(missed >= 5) {
        overlay.classList.add('lose');
        overlay.style.display = 'flex';
    }
}

function reset() {
    missed = 0;
    var buttons = document.querySelectorAll('.keyrow button');
    for(var i=0;i<buttons.length;i++) {
        buttons[i].removeAttribute('disabled');
        buttons[i].classList.remove('chosen');
    }
    phraseContainer.querySelector('ul').innerHTML = '';
    document.querySelector('#scoreboard').innerHTML = `
        <ol>
          <li class="tries"><img src="images/liveHeart.png" width="30" alt=""></li>
          <li class="tries"><img src="images/liveHeart.png" width="30" alt=""></li>
          <li class="tries"><img src="images/liveHeart.png" width="30" alt=""></li>
          <li class="tries"><img src="images/liveHeart.png" width="30" alt=""></li>
          <li class="tries"><img src="images/liveHeart.png" width="30" alt=""></li>
        </ol>
    `;
    overlay.classList.remove('win', 'lose');
    startGame();
}

function startGame() {
    var randomPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(randomPhrase);
}

startGame();

