
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore"; 
import { auth, db } from "../../firbase";

const registerUser = async ({username, email, password}) => {
  createUserWithEmailAndPassword(auth, email, password) //creates new user in auth
    .then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user)
      try {
        await setDoc(doc(db, "users", user.uid), {  //creating a doc with user details and custom doc id
          username: username,
          email: email,
          likes: [],
        });
        await updateProfile(user, { displayName: username }).catch(
          (err) => console.log(err)
        );
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      console.log("User Registered");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const loginUser = ({email, password}) => {  //logging in user using auth
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User Logged in");
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const logoutUser = () =>{
  signOut(auth).then(() => {
    console.log("User Logged out!!!")
  }).catch((error) => {
    console.log(error)
  });
}


export { registerUser, loginUser, logoutUser };
