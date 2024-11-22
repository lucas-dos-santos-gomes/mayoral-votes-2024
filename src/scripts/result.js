import { indicators } from "./indicators.mjs"
import { verifyUser, countDocumentsInCollection, collection, getDocs, deleteDoc, doc, db } from "./config.mjs";

verifyUser();

const indicatorImgs = document.querySelectorAll('.indicator-info img');
const indicatorName = document.querySelectorAll('.indicator-info p');
const indicatorBars = document.querySelectorAll('.indicator-bar');
const indicatorVotePercentage = document.querySelectorAll('.vote-percent');
const resetVoteBtn = document.querySelector('.reset-voting');

let totalVotes = 0;
let votes = [
  { number: 15, qtdVotes: 0 },
  { number: 28, qtdVotes: 0 },
  { number: 30, qtdVotes: 0 },
  { number: 40, qtdVotes: 0 },
  { number: 45, qtdVotes: 0 },
  { number: 50, qtdVotes: 0 },
];

async function countIndicatorVoters() {
  for(let i in indicators) {
    const indicatorVotes = await countDocumentsInCollection(i);
    let indicator = votes.find(item => item.number == i);
    indicator.qtdVotes = indicatorVotes;
  }
  votes.sort((a, b) => b.qtdVotes - a.qtdVotes);
  totalVotes = votes.reduce((acumulador, item) => acumulador + item.qtdVotes, 0);
  sortIndicators(votes, totalVotes);
}

function sortIndicators(votes, totalVotes) {
  votes.forEach((element, index) => {
    const { number, qtdVotes } = element;
    indicatorImgs[index].src = `../assets/imgs/profile-${indicators[number].shortName.toLowerCase().replace(' ', '-').replace('ç', 'c')}.jpg`;
    indicatorName[index].innerHTML = indicators[number].shortName;

    const votePercentage = totalVotes && (qtdVotes * 100 / totalVotes).toFixed(1);
    indicatorVotePercentage[index].innerHTML = votePercentage + '%';
    
    if(totalVotes > 0) {
      if(index === 0) {
        indicatorBars[index].style.width = '100%';
      } else {
        const highestPercentage = Number(indicatorVotePercentage[0].innerHTML.replace('%',''));
        const barPercentage = votePercentage * 100 / highestPercentage;
        indicatorBars[index].style.width = barPercentage + '%';
      }
    }
  });
}

countIndicatorVoters();
setInterval(countIndicatorVoters, 3000);

if(sessionStorage.getItem('user-creds')) {
  const adminEmail = JSON.parse(sessionStorage.getItem('user-creds')).email;
  if(adminEmail === 'lucasdev.programador@gmail.com' || adminEmail === 'joaovps48@uni9.edu.br') {
    resetVoteBtn.classList.remove('none');
  }
}

async function deleteCollection(collectionName) {
  try {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, collectionName, docSnapshot.id));
      console.log(`Documento com ID ${docSnapshot.id} deletado.`);
    });

    console.log(`Todos os documentos da coleção ${collectionName} foram deletados.`);
  } catch (error) {
    console.error('Erro ao deletar documentos:', error);
  }
}

resetVoteBtn.onclick = () => {
  deleteCollection('/0/');
  deleteCollection('/15/');
  deleteCollection('/28/');
  deleteCollection('/30/');
  deleteCollection('/40/');
  deleteCollection('/45/');
  deleteCollection('/50/');
  indicatorBars.forEach(el => el.style.width = '0%');
};