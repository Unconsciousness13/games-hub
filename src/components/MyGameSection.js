import React from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import LikeGame from "./LikeGame"

const myGameSection = ({ games, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className="game-heading text-start py-2 mb-4">My Games</div>
      {games?.map((item) => (



        <div className="row pb-4" key={item.id}>
          {userId && item.userId === userId && (
            <div className="col-md-5">
              <div className="hover-games-img">
                <div className="blogs-img">
                  <img src={item.imgUrl} alt={item.title} />
                  <div></div>
                </div>
              </div>
            </div>
          )}
          {userId && item.userId === userId && (
            <div className="col-md-7">
              <div className="text-start">
                <h6 className="category catg-color">{item.category}</h6>
                {userId && item.userId === userId && (
                  <div style={{ float: "right" }}>
                    <FontAwesome
                      name="trash"
                      style={{ margin: "15px", cursor: "pointer" }}
                      size="2x"
                      onClick={() => handleDelete(item.id)}
                    />
                    <Link to={`/update/${item.id}`}>
                      <FontAwesome
                        name="pencil"
                        style={{ cursor: "pointer" }}
                        size="2x"
                      />

                    </Link>
                  </div>
                )}

                <span className="title py-2">{item.title}</span>
                <span className="meta-info">
                  <p className="author">{item.author}</p> -&nbsp;
                  {item.timestamp.toDate().toDateString()}
                </span>
              </div>
              <div className="short-description text-start">
                {excerpt(item.description, 120)}
              </div>
              <Link to={`/detail/${item.id}`}>
                <button className="btn btn-read">Read More</button>
              </Link>

              <div
                className="d-flex flex-row-reverse"
                style={{ marginTop: "20px" }}
              >
                {user && <LikeGame id={item.id} likes={item.likes} />}
                <div className="pe-2">
                  <p>{item.likes?.length} likes</p>
                </div>
                {item.comments && item.comments.length > 0 && (
                  <div className="pe-2">
                    <p>{item.comments?.length} comments</p>
                  </div>
                )}
              </div>
            </div>)}
        </div>
      ))}
    </div>
  );
};

export default myGameSection;
