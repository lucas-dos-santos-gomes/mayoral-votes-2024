import { indicators } from "./indicators.mjs"
import { signOut, auth } from "./config.mjs";

const profileLink = document.querySelector('.profile-link');
const painelVoting = document.querySelector('.painel_voting');
const painelEnd = document.querySelector('.painel_end');
const painelNumber = document.querySelectorAll('.painel_voting_number');
const indicatorImage = document.querySelector('.painel_voting_image img');
const numberBtns = document.querySelectorAll('.keyboard_numbers button');
const indicatorName = document.querySelector('.indicators-name');
const indicatorEntourage = document.querySelector('.indicators-entourage');
const whiteBtn = document.querySelector('.white-btn');
const correctBtn = document.querySelector('.correct-btn');
const confirmBtn = document.querySelector('.confirm-btn');

let indicatorNumber = '';

const keyAudio = new Audio('../assets/audios/key.wav');
const confirmAudio = new Audio('../assets/audios/confirm.wav');

profileLink.onclick = (e) => {
  e.preventDefault();
  signOut(auth);
  alert('Você saiu da sua conta.');
  window.location.pathname = '/src/pages/sign.html';
}

numberBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    keyAudio.play();
    if(indicatorNumber.length < 2) {
      indicatorNumber += btn.innerHTML;
      for(let i = 0; i < indicatorNumber.length; i++) {
        painelNumber[i].innerHTML = indicatorNumber[i];
      }
    }

    if(indicatorNumber.length >= 2) {
      if(indicators[indicatorNumber]) {
        indicatorName.innerHTML = indicators[indicatorNumber].shortName;
        indicatorEntourage.innerHTML = indicators[indicatorNumber].entourage;

        indicatorImage.src = `../assets/imgs/${indicators[indicatorNumber].shortName.toLowerCase().replace(' ', '-').replace('ç', 'c')}.jpg`;
        indicatorImage.classList.remove('none');
      } else {
        indicatorName.innerHTML = 'Voto nulo';
        indicatorEntourage.innerHTML = 'Voto nulo';
      }
    }
  });
});

whiteBtn.addEventListener('click', () => {
  confirmAudio.play();
  painelVoting.classList.add('none');
  painelEnd.classList.remove('none');
});

correctBtn.addEventListener('click', () => {
  keyAudio.play();
  indicatorNumber = '';
  painelNumber.forEach(el => el.innerHTML = '');
  indicatorName.innerHTML = '__________';
  indicatorEntourage.innerHTML = '__________';
  indicatorImage.classList.toggle('none', true);
});

