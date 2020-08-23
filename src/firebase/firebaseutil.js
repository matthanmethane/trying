import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAVW612N4El8casvrXmihr-88t71N_7wZI",
    authDomain: "crwn-db-497b1.firebaseapp.com",
    databaseURL: "https://crwn-db-497b1.firebaseio.com",
    projectId: "crwn-db-497b1",
    storageBucket: "crwn-db-497b1.appspot.com",
    messagingSenderId: "514377954828",
    appId: "1:514377954828:web:2bb122c599d5c6fd386029",
    measurementId: "G-DFB65MN6XQ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => 
    auth.signInWithPopup(provider);
export default firebase;