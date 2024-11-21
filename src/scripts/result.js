import { indicators } from "./indicators.mjs"
import { signOut, auth, verifyUser, setDoc, doc, db, countDocumentsInCollection } from "./config.mjs";
verifyUser(true);

const uid = JSON.parse(sessionStorage.getItem('uid'));

setInterval(async() => {
  for(let i in indicators) {
    const span = document.querySelector('.nmr-' + indicators[i].shortName.toLowerCase().replace(' ', '-').replace('ç', 'c'));
    
    span.innerHTML = await countDocumentsInCollection(i);
  }
}, 2500);