import { db } from "../../firbase";
import {
  doc,
  getDoc,
  addDoc,
  query,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";

const addLikes = async (userID, postID) => {
  try {
    const docRef = doc(db, `users`, `${userID}`);
    const likeAdd = await updateDoc(docRef, {
      likes: arrayUnion(postID),
    });
    try {
      var likeRef = doc(db, `posts`, `${postID}`);
      const likeAddCount = await updateDoc(likeRef, {
        likes: increment(1),
      });
    } catch (error) {
      console.error("Error increasing like: ", error);
    }
    console.log("post liked!");
  } catch (e) {
    console.error("Error adding like: ", e);
  }
};

const removeLikes = async (userID, postID) => {
  try {
    const docRef = doc(db, `users`, `${userID}`);
    const likeRemove = await updateDoc(docRef, {
      likes: arrayRemove(postID),
    });
    try {
      var likeRef = doc(db, `posts`, `${postID}`);
      const likeRemoveCount = await updateDoc(likeRef, {
        likes: increment(-1),
      });
    } catch (error) {
      console.error("Error decreasing like: ", error);
    }
    console.log("post disliked!");
  } catch (e) {
    console.error("Error removing like: ", e);
  }
};

const fetchLikedPosts = async (userID) => {
  let posts = [];
  console.log("fetching Current user liked Posts");
  try {
    const docRef = doc(db, "users", userID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().likes;
      console.log("liked Posts fetched");
    }
    else {
      console.log("No such document!");
    }
  }
  catch (error) {
    console.log(error);
  }
  return posts;
};
export { removeLikes, addLikes, fetchLikedPosts };
