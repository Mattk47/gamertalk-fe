import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const FeedItem = ({
  review_id,
  votes,
  created_at,
  title,
  review_img_url,
  category,
  author,
}) => {
  return (
    <div className="review_container">
      <Link to={`reviews/${review_id}`} className="link">
        <h2>{title}</h2>
        <img className="review_image" src={review_img_url} alt={category} />
      </Link>
      <div className="text--white">
        <p className="text--margin">{dayjs(created_at).format("D MMM YYYY")}</p>
        <p>{author}</p>
        <h3>&#8679;{votes}</h3>
      </div>
    </div>
  );
};

export default FeedItem;
