import { indicators } from "./indicators.mjs"
import { verifyUser, countDocumentsInCollection } from "./config.mjs";
verifyUser();

let votes = [
  { number: 15, qtdVotes: 0 },
  { number: 28, qtdVotes: 0 },
  { number: 30, qtdVotes: 0 },
  { number: 40, qtdVotes: 0 },
  { number: 45, qtdVotes: 0 },
  { number: 50, qtdVotes: 0 },
];
console.log(votes);

async function countIndicatorVoters() {
  for(let i in indicators) {
    const span = document.querySelector('.nmr-' + indicators[i].shortName.toLowerCase().replace(' ', '-').replace('ç', 'c'));
    const indicatorVotes = await countDocumentsInCollection(i);
    let indicator = votes.find(item => item.number == i);
    indicator.qtdVotes = indicatorVotes;
  }
  console.log(votes)
}
countIndicatorVoters();

setInterval(countIndicatorVoters, 2500);