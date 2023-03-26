import React, { useState, useContext } from "react";
import "./index.css";
import { AuthContext } from "../Auth";
// import { signOut } from "firebase/auth";
import { storage, db } from "../Firebase";
// import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { FcStackOfPhotos } from "react-icons/fc";
import Navbar from "../Navbar/Navbar";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import Feed from "../Feed/Feed";
const Home = () => {
  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.displayName);

  const handleOnPost = async (e) => {
    e.preventDefault();
    if (image) {
      const storageRef = ref(storage, "Post/" + uuidv4());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        (error) => {
          setError(true);
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await addDoc(collection(db, "posts"), {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              img: downloadURL,
              timestamp: serverTimestamp(),
              userPhotoName: currentUser.displayName,
              inputText: text,
            });
            await updateDoc(doc(db, "userPosts", currentUser.uid), {
              messages: arrayUnion({
                id: uuidv4(),
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                userPhotoName: currentUser.displayName,
                inputText: text,
                img: downloadURL,
                timestamp: Timestamp.now(),
              }),
            });
          });
          console.log("ended");
        }
      );
    } else {
      console.log("entered else block");
      await addDoc(collection(db, "posts"), {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        timestamp: serverTimestamp(),
        userPhotoName: currentUser.displayName,
        inputText: text,
      });
      await updateDoc(doc(db, "userPosts", currentUser.uid), {
        messages: arrayUnion({
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          id: uuidv4(),
          inputText: text,
          userPhotoName: currentUser.displayName,
          timestamp: Timestamp.now(),
        }),
      });
    }
    setText("");
    setImage(null);
    setError(false);
  };
  return (
    <div className="app__home">
      <div className="wrapper">
        <Navbar />
        <div className="container mt-4">
          <div className="row">
            {/* Add Post card */}
            <div className="col-12 bg-light rounded-3 p-3">
              <h1 className="post-box-heading">Post Something</h1>
              <div className="border rounded-2">
                <textarea
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                  style={{
                    border: "none",
                    height: "100px",
                    resize: "none",
                    backgroundColor: "transparent",
                  }}
                  placeholder="What's on your mind?"
                />

                {image && (
                  <div className="d-flex justify-content-center post-image-box">
                    <img
                      src={URL.createObjectURL(image)}
                      alt=""
                      className="post-image"
                    />
                    <div className="close-btn">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => setImage(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="d-flex justify-content-between mt-3">
                <div>
                  <input
                    type="file"
                    className="d-none"
                    id="photofile"
                    accept=".png,.jpeg,.jpg"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <label htmlFor="photofile" className="photo-video-label">
                    <FcStackOfPhotos size={35} />
                    Photo/Video
                  </label>
                </div>
                <div className="div">
                  <div className="btn btn-primary" onClick={handleOnPost}>
                    Post
                  </div>
                </div>
              </div>
              {error && <p className="text-danger">Something went wrong</p>}
            </div>
          </div>
        </div>
        <div className="feed-container">
          <Feed />
        </div>
      </div>
    </div>
  );
};

export default Home;
