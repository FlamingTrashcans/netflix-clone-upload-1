import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAkazh_6so4v2-q8sDBJ7Ok0ylfetFYFFg",
  authDomain: "netflix-clone-80362.firebaseapp.com",
  projectId: "netflix-clone-80362",
  storageBucket: "netflix-clone-80362.firebasestorage.app",
  messagingSenderId: "846145729761",
  appId: "1:846145729761:web:c3cdf6c48a2a681ed0b3a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
       toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};