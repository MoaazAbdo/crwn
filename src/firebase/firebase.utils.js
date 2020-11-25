import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAWrbbvdXoiOCvvWiI6KEDv6Z8uhygfF3o",
    authDomain: "crwn-db-e4960.firebaseapp.com",
    databaseURL: "https://crwn-db-e4960.firebaseio.com",
    projectId: "crwn-db-e4960",
    storageBucket: "crwn-db-e4960.appspot.com",
    messagingSenderId: "778839565107",
    appId: "1:778839565107:web:25f5c91c9d366e27bad446",
    measurementId: "G-30D1LV069H"
};

/**
 * createUserProfileDocument
 * this function allows me to take the user object from auth library and then store in firebase firestore.
*/

export const createUserProfileDocument = async(userAuth, additionalData) => {
    // this mean if userAuth object is not exist close this function.
    
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShopt = await userRef.get();
    

    if (!snapShopt.exists) {
        const { displayName, email } = userAuth; 
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log("error creating user", error.message)            
        }
    }
    
    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// this gives us access to this new google auth provider class from the authentication library.
const provider = new firebase.auth.GoogleAuthProvider();

// this means we want to trigger google popup whenever we use this google auth provider.
provider.setCustomParameters( {prompt: 'select_account'} );
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;