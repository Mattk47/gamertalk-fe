import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById, patchVote, deleteReview, getCommentByReview } from '../utils'
import { Redirect } from 'react-router-dom'
import Expandable from '../Expandable';

const GameReview = () => {
    const [review, setReview] = useState({})
    const [newVote, setNewVote] = useState(0)
    const [redirect, setRedirect] = useState();
    const [comments, setComments] = useState([])
    const { review_id } = useParams()
    useEffect(() => {
        const getReview = getReviewById(review_id)
        const getComment = getCommentByReview(review_id)
        Promise.all([getReview, getComment]).then(resArr => {
            setReview(resArr[0].data.review)
            setComments(resArr[1].data.comments)
        })

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
            <h2>Comments</h2>
            <Expandable>
                <ul>
                    {
                        comments.map(comment => {
                            return (
                                <li className="comment" key={comment.comment_id}>
                                    <p><strong>{comment.author}</strong></p>
                                    <p>{comment.body}</p>
                                </li>
                            )
                        })
                    }
                </ul>

            </Expandable>
        </div>
    );
};

export default GameReview;