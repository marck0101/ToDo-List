import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // pra  poder ter conexão com o banco
import { getAuth } from "firebase/auth"; // para trabalhar  com autenticação

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// inicializou o firebase
const firebaseApp = initializeApp(firebaseConfig);
// inicializando as  configurações
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }; // pra poder consumir os dados do firebase
