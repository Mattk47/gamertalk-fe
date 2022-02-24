import React, { useEffect, useState, useContext } from 'react';
import { useAppContext } from "../../lib/contextLib";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import reviewContext from '../../context/Review/reviewContext.js';

const MyReviews = () => {
    const { user } = useAppContext();
    const [userId, setUserId] = useState(null)
    const ReviewContext = useContext(reviewContext)
    const { getUserReviews, userReviews, deleteReview } = ReviewContext

    useEffect(() => {
        getUserReviews(user);
        // eslint-disable-next-line
    }, [userReviews])

    const removeReview = () => {
        deleteReview(userId).then(res => window.location.reload(false))
    }

    return (
        <section>
            <ul>
                {userReviews.map(review => {
                    return (
                        <li onMouseEnter={() => setUserId(review.review_id)} className="review_container text--white" key={review.review_id}>
                            <Link className='item-a' to={`/reviews/${review.review_id}`}>
                                <h2 className="header--margin">{review.title}</h2>
                                <img className="review_image" src={review.review_img_url} alt={review.category} />
                            </Link>
                            <div className="text--white">
                                <p>{dayjs(review.created_at).format("D MMM YYYY")}</p>
                                <h3 >&#8679;{review.votes}</h3>
                                <Button onClick={e =>
                                    window.confirm("Are you sure you wish to delete this item?") &&
                                    removeReview()
                                } variant="outlined" startIcon={<DeleteForeverSharpIcon />} style={{ color: 'white', 'borderColor': 'white' }}>
                                    Delete
                                </Button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </section>
    )



}
export default MyReviews;

