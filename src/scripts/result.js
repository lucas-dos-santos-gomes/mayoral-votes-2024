import { indicators } from "./indicators.mjs"
import { signOut, auth, verifyUser, setDoc, doc, db, countDocumentsInCollection } from "./config.mjs";
verifyUser(true);

const uid = JSON.parse(sessionStorage.getItem('uid'));


const collectionName = '/voters/indicators/';
countDocumentsInCollection(collectionName);