import React, { useEffect, useState, } from 'react';
import { getReviewsByUsername, deleteReview } from '../utils'
import { useAppContext } from "../lib/contextLib";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

const MyReviews = () => {
    const { user } = useAppContext();
    const [reviews, setReviews] = useState([]);
    const [deleteId, setDeleteId] = useState()
    useEffect(() => {
        getReviewsByUsername(user).then(res => {
            setReviews(res.data.reviews)
        })
    }, [])

    const removeReview = () => {
        deleteReview(deleteId).then(res => window.location.reload(false))
    }

    return (
        <section>
            <ul>
                {reviews.map(review => {
                    return (
                        <li onMouseEnter={() => setDeleteId(review.review_id)} className="review_container text--white" key={review.review_id}>
                            <Link className='item-a' to={`reviews/${review.review_id}`}>
                                <h2 className="header--margin">{review.title}</h2>
                                <img className="review_image" src={review.review_img_url} alt={review.category} />
                            </Link>
                            <div className="text--white">
                                <p>{dayjs(review.created_at).format("D MMM YYYY")}</p>
                                <h3 >&#8679;{review.votes}</h3>
                                <Button onClick={e =>
                                    window.confirm("Are you sure you wish to delete this item?") &&
                                    removeReview()
                                } variant="outlined" startIcon={<DeleteForeverSharpIcon />} style={{ color: 'white', 'border-color': 'white' }}>
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

