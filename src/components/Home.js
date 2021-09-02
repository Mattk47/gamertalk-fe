import React from 'react';
import { useState, useEffect } from 'react';
import { getReviews } from '../utils.js'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home = ({ categoryFilterObj, setReviewId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviewList, setReviewList] = useState([]);
    const [reviewFilter, setReviewFilter] = useState('created_at');
    const [page, setPage] = useState(1);
    const { categoryFilter, description } = categoryFilterObj
    const [totalGames, setTotalGames] = useState(0)
    const gamesPerPage = 5
    const pageCount = Math.ceil(totalGames / gamesPerPage)

    useEffect(() => {
        setIsLoading(true);
        getReviews(reviewFilter, "desc", page, categoryFilter).then((result) => {
            setReviewList(result.data.reviews);
            setTotalGames(result.data.total_count);
            setIsLoading(false);
        })
    }, [reviewFilter, page, categoryFilter]);
    if (isLoading) return <p>Loading.....</p>;
    console.log(totalGames)
    return (
        <section>
            <nav >
                <ul className="nav_bar">
                    <Button onClick={() => setReviewFilter('comment_count')} className="nav_item">Hot🔥</Button>
                    <Button onClick={() => setReviewFilter("votes")} className="nav_item">Best</Button>
                    <Button onClick={() => setReviewFilter("created_at")} className="nav_item">New</Button>
                </ul>
            </nav>
            {categoryFilter ? <h2>{categoryFilter}</h2> : null}
            {description ? <p>{description}</p> : null}
            <ul>
                {reviewList.map(review => {
                    return (
                        <li className="review_container" key={review.review_id}>
                            <Link to={`reviews/${review.review_id}`}>
                                <h2 onClick={() => { setReviewId(review.review_id) }}>{review.title}</h2>
                                <img className="review_image" src={review.review_img_url} alt={review.category} />
                                <p>{review.created_at}</p>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            <section>
                <button disabled={page === 1} onClick={() => { setPage(page - 1) }}>&larr;</button>
                Page: {page}
                <button disabled={page === 7} onClick={() => { setPage(page + 1) }}>&rarr;</button>
            </section>

        </section>
    );
};

export default Home;
