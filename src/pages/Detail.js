import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";
import { db } from "../firebase";
// import Comment from "../components/Comment";

const Detail = ({ setActive }) => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [games, setGames] = useState([]);
  const [tags, setTags] = useState([]);

  // new
  // const [comments, setComments] = useState([]);
  // const [likes, setLikes] = useState([]);

  // end new

  useEffect(() => {
    const getgamesData = async () => {
      const gameRef = collection(db, "games");
      const games = await getDocs(gameRef);
      setGames(games.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      let tags = [];
      games.docs.map((doc) => tags.push(...doc.get("tags")));
      let uniqueTags = [...new Set(tags)];
      setTags(uniqueTags);
      //new 
      // let comments = [];
      // games.docs.map((doc) => tags.push(...doc.get("comments")));
      // setComments(comments)
      //endnew
      
    };

    getgamesData();
  }, []);

  useEffect(() => {
    id && getgameDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getgameDetail = async () => {
    const docRef = doc(db, "games", id);
    const gameDetail = await getDoc(docRef);
    setGame(gameDetail.data());
    setActive(null);
  };
  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${game?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{game?.timestamp.toDate().toDateString()}</span>
          <h2>{game?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{game?.author}</p> -&nbsp;
                {game?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{game?.description}</p>
            </div>
            {/* <div> <Comment id={game.id} /></div> */}
           
            
            <div className="col-md-3">
              <Tags tags={tags} />
              <MostPopular games={games} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
