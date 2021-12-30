import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewById, patchVote, getCommentByReview } from '../../utils'
import Expandable from '../../Expandable';
import { Button } from '@mui/material';

const GameReview = () => {
    const [review, setReview] = useState({})
    const [newVote, setNewVote] = useState(0)
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

    useEffect(() => {
        window.localStorage.setItem('newVote', newVote);
    }, [newVote]);



    const updateVote = () => {
        const vote = JSON.parse(window.localStorage.getItem('newVote'));
        console.log(vote)
        if (vote === 0) {
            setNewVote(1)
            patchVote(review_id, 1).then()
        } else {
            setNewVote(0)
            patchVote(review_id, -1).then()
        }
    }


    return (
        <div>
            <h2 className="reviewTitle review__text">{review.title}</h2>
            <img className="review_image " alt={review.category} src={review.review_img_url} />
            <p className='text--margin review__text'>{review.review_body}</p>
            <p className='review__text'>Author:<strong> {review.owner}</strong> </p>

            <h3 >&#8679;{review.votes + newVote}</h3>

            {newVote ? <Button variant='contained' color='primary' style={{ color: 'white', borderColor: 'rgb(26, 33, 46)', border: '2px solid', backgroundColor: 'rgb(26, 33, 46)' }} onClick={updateVote}>Upvote</Button>
                : <Button variant='outlined' color='primary' style={{ color: 'rgb(26, 33, 46)', borderColor: 'rgb(26, 33, 46)', border: '2px solid' }} onClick={updateVote}>Upvote</Button>
            }

            <h2>Comments</h2>
            <Expandable reviewId={review_id}>
                <ul>
                    {
                        comments.map(comment => {
                            return (
                                <li className="commentBox" key={comment.comment_id}>
                                    <p><strong>{comment.author}</strong></p>
                                    <p className="text--margin">{comment.body}</p>
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
