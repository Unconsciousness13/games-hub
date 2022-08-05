// import React from "react";
// import FontAwesome from "react-fontawesome";
// import { Link } from "react-router-dom";
// import { excerpt } from "../utility";


// const myGames = ({ games, user, handleDelete }) => {
//   const userId = user?.uid;

//     return (
//       <div>
//         <div className="game-heading text-start py-2 mb-4">My games</div>
//         {games
//           ?.map((item) => (
//             <div className="row pb-4" key={item.id}>
//               <div className="col-md-5">
//                 <div className="hover-games-img">
//                   <div className="blogs-img">
//                     <img src={item.imgUrl} alt={item.title} />
//                     <div></div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-7">
//                 <div className="text-start">
//                   <h6 className="category catg-color">{item.category}</h6>
//                   <span className="title py-2">{item.title}</span>
//                   <span className="meta-info">
//                     <p className="author">{item.author}</p> -&nbsp;
//                     {item.timestamp.toDate().toDateString()}
//                   </span>
//                 </div>
//                 <div className="short-description text-start">
//                   {excerpt(item.description, 120)}
//                 </div>
//                 <Link to={`/detail/${item.id}`}>
//                   <button className="btn btn-read">Read More</button>
//                 </Link>
//                 {userId && item.userId === userId && (
//                   <div style={{ float: "right" }}>
//                     <FontAwesome
//                       name="trash"
//                       style={{ margin: "15px", cursor: "pointer" }}
//                       size="2x"
//                       onClick={() => handleDelete(item.id)}
//                     />
//                     <Link to={`/update/${item.id}`}>
//                       <FontAwesome
//                         name="edit"
//                         style={{ cursor: "pointer" }}
//                         size="2x"
//                       />
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           ))}
//       </div>
//     );
  
// };

// export default myGames;


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
        // let comments = [];
        // let likes = [];
        snapshot.docs.forEach((doc) => {
          tags.push(...doc.get("tags"));
          list.push({ id: doc.id, ...doc.data() });
          // comments.push(...doc.get("comments"));
          // likes.push(...doc.get("likes"));
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
