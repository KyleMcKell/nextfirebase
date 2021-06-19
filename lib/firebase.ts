import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyDJRiTyCyPW86vdSpGAlJtdInGHSYrCHsE',
	authDomain: 'nextfirebase-4ad90.firebaseapp.com',
	projectId: 'nextfirebase-4ad90',
	storageBucket: 'nextfirebase-4ad90.appspot.com',
	messagingSenderId: '1054286844036',
	appId: '1:1054286844036:web:f8aad93d8c48c6e7f4b2d1',
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
