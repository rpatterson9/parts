import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCVLJ58lokkScxasDUIjMmPlB4nqFTIFA8",
    authDomain: "parts-d386d.firebaseapp.com",
    projectId: "parts-d386d",
    storageBucket: "parts-d386d.appspot.com",
    messagingSenderId: "1043739840967",
    appId: "1:1043739840967:web:d53b31ad56a66dcc4c09e2"
  };
  


  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  
  export { firestore };