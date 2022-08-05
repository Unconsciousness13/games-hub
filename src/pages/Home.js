import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import GameSection from "../components/GameSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";
// import LikeGame from "../components/LikeGame";
// import Comment from "../components/Comment";

const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);
  // const [comments , setComments] = useState([]);
  // const [likes , setLikes ] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "games"),
      (snapshot) => {
        let list = [];
        let tags = [];
        // let comments = [];
        // let likes = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          // comments.push(...doc.get("comments"));
          // likes.push(...doc.get("likes"));
          list.push({ id: doc.id, ...doc.data() });
          
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
        // setComments(comments);
        // setLikes(likes);
        setGames(list);
        setLoading(false);
        setActive("home");
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, [setActive]);

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that game ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "games", id));
        toast.success("Game deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="row mx-0">
          <div className="col-md-8">
            <GameSection
              games={games}
              user={user}
              handleDelete={handleDelete}
            />
          </div>
          
          <div className="col-md-3">
            {/* <LikeGame likes={likes} />
            <Comment comments={comments} /> */}
            <Tags tags={tags} />
            <MostPopular games={games} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
