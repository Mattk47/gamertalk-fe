import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById } from '../utils'

const GameReview = () => {
    const [review, setReview] = useState({})
    const { review_id } = useParams()
    useEffect(() => {
        getReviewById(review_id)
            .then(result => setReview(result.data.review))
    }, [review_id])
    return (
        <div>
            <h2>{review.title}</h2>
            <p>{review.review_body}</p>
            <img className="review_image" alt={review.category} src={review.review_img_url} />
            <p>Author: {review.owner}</p>
        </div>
    );
};

export default GameReview;