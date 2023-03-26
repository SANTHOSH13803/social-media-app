import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import "./index.css";
import { v4 } from "uuid";
// import Post from "../Post/Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({ uid: doc.data.uid, data: doc.data() }))
      );
    });
    return () => {
      unSub();
    };
  }, []);
  // console.log(posts);

  return (
    <div className="feed mt-5">
      <div className="feed-wrapper d-flex flex-column align-items-center">
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => {
            const postWithImage = p.data.img !== undefined;
            return (
              <div
                key={v4()}
                className="shadow mt-3 mb-3 w-75 rounded-2 bg-white"
              >
                <div className="p-3 d-flex justify-content-between align-items-center">
                  <div className="user-details d-flex align-items-center">
                    <p className="profile-icon">{p.data.displayName[0]}</p>
                    <p>{p.data.displayName}</p>
                  </div>
                  <div className="text">
                    <div>
                      {new Date(p.data.timestamp?.toDate()).toLocaleString()}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="p-3">
                  <p className="fs-3">{p.data.inputText}</p>
                </div>
                <div className="p-3 d-flex justify-content-center">
                  {postWithImage && (
                    <img className="image" src={p.data.img} alt="post" />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Feed;
