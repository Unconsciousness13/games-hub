import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../firebase";
import Likegame from "../components/LikeGame";
import Comment from "../components/Comment";
import MostPopular from "../components/MostPopular";
import Tags from "../components/Tags";

export default function Detail() {
  const { id } = useParams();
  const [game, setgame] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "games", id);
    onSnapshot(docRef, (snapshot) => {
      setgame({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);
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
      {game && (
        <div className="container-fluid pb-4 pt-4 padding blog-single-content">
          <div className="container padding">
            <div className="row mx-0">
              <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{game?.author}</p> -&nbsp;
                {game?.timestamp.toDate().toDateString()}
              </span>
              <p className="text-start">{game?.description}</p>
              <div className="d-flex flex-row-reverse">
              {user && <Likegame id={id} likes={game.likes} />}
              <div className="pe-2">
              {user && (
                <p>
                  {game.likes.length}  
                </p>
                )}
              </div>
            </div>
              <Comment id={game.id} />
            </div>          
                
              </div>
            </div>
        
        
          {/* <div className="col-md-3">
            <Tags tags={game.tags} />
            <MostPopular games={game} />
          </div> */}
        </div>
      )}
    </div>
  );
}
