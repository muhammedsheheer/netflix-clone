import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth/web-extension";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
	apiKey: "AIzaSyBYxAm3huxC67KisA7pMOB1pXP2vxxVeds",
	authDomain: "netflix-clone-3da9d.firebaseapp.com",
	projectId: "netflix-clone-3da9d",
	storageBucket: "netflix-clone-3da9d.appspot.com",
	messagingSenderId: "229154184251",
	appId: "1:229154184251:web:1878fa68dc145c7628901e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
	try {
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = response.user;
		await addDoc(collection(db, "user"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
		});
	} catch (error) {
		console.log(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const login = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
	} catch (error) {
		console.log(error);
		toast.error(error.code.split("/")[1].split("-").join(" "));
	}
};

const logout = () => {
	signOut(auth);
};

export { auth, db, login, signup, logout };
