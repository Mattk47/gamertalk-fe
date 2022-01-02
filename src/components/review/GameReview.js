import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { patchVote } from '../../utils'
import ExpandableComments from './ExpandableComments';
import { Button } from '@mui/material';
import reviewContext from '../../context/Review/reviewContext.js';
import Spinner from '../layout/Spinner.js';

const GameReview = () => {
    const ReviewContext = useContext(reviewContext)
    const { review, getReview, comments, loading, isOpen } = ReviewContext;
    const [newVote, setNewVote] = useState(0)
    const { review_id } = useParams()

    useEffect(() => {
        getReview(review_id)
        // eslint-disable-next-line
    }, [review_id, comments])

    useEffect(() => {
        window.localStorage.setItem('newVote', newVote);
    }, [newVote]);

    const updateVote = () => {
        const vote = JSON.parse(window.localStorage.getItem('newVote'));
        console.log(vote)
        if (vote === 0) {
            setNewVote(1)
            patchVote(review_id, 1)
        } else {
            setNewVote(0)
            patchVote(review_id, -1)
        }
    }
    if (loading && !isOpen) return <Spinner />;
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

            <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>Comments</h2>
            <ExpandableComments reviewId={review_id}>
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

            </ExpandableComments>
        </div>
    );
};

export default GameReview;
