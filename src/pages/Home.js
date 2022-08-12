import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import GameSection from "../components/GameSection";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Tags from "../components/Tags";
import MostPopular from "../components/MostPopular";


const Home = ({ setActive, user }) => {
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);


  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "games"),
      (snapshot) => {
        let list = [];
        let tags = [];

        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));

          list.push({ id: doc.id, ...doc.data() });
          
        });
        const uniqueTags = [...new Set(tags)];
        setTags(uniqueTags);
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
            <Tags tags={tags} />
            <MostPopular games={games} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
