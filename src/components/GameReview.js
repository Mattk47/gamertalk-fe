import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById, patchVote, deleteReview } from '../utils'
import { Redirect } from 'react-router-dom'

const GameReview = () => {
    const [review, setReview] = useState({})
    const [newVote, setNewVote] = useState(0)
    const [redirect, setRedirect] = useState();
    const { review_id } = useParams()
    useEffect(() => {
        getReviewById(review_id)
            .then(result => setReview(result.data.review))
    }, [review_id])

    const updateVote = () => {
        if (newVote === 0) {
            setNewVote((currVote) => currVote + 1)
            patchVote(review_id, 1).then()
        } else {
            setNewVote((currVote) => currVote - 1)
            patchVote(review_id, -1).then()
        }
    }
    const removeReview = () => {
        deleteReview(review_id).then(res => setRedirect(true))
    }
    if (redirect) return <Redirect to={`/`} />
    return (
        <div>
            <h2>{review.title}</h2>
            <div align="right">
                <button className="deleteButton " onClick={removeReview}>Delete</button>
            </div>
            <img className="review_image" alt={review.category} src={review.review_img_url} />
            <p>{review.review_body}</p>
            <p>Author: {review.owner}</p>
            <h3 >&#8679;{review.votes + newVote}</h3>
            <button className="upvoteButton" onClick={updateVote}>Upvote</button>
        </div>
    );
};

export default GameReview;