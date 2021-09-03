import React from 'react';
import { useState, useEffect } from 'react';
import { getReviews } from '../utils.js'
import { Link } from 'react-router-dom';

const Home = ({ categoryFilterObj }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviewList, setReviewList] = useState([]);
    const [reviewFilter, setReviewFilter] = useState('created_at');
    const [page, setPage] = useState(1);
    const { categoryFilter, description } = categoryFilterObj
    const [totalGames, setTotalGames] = useState(0)
    const gamesPerPage = 5
    const pageCount = Math.ceil(totalGames / gamesPerPage)
    const pages = Array.from({ length: 5 }).map((el, i) => i + 1)


    useEffect(() => {
        setIsLoading(true);
        getReviews(reviewFilter, "desc", page, categoryFilter).then((result) => {
            setReviewList(result.data.reviews);
            setTotalGames(result.data.total_count);
            setIsLoading(false);
        })
    }, [reviewFilter, page, categoryFilter]);
    if (isLoading) return <p>Loading.....</p>;

    return (
        <section>
            <nav >
                <ul className="nav_bar">
                    <button onClick={() => setReviewFilter('comment_count')} className="filterButton">Hot🔥</button>
                    <button onClick={() => setReviewFilter("votes")} className="filterButton">Best</button>
                    <button onClick={() => setReviewFilter("created_at")} className="filterButton">New</button>
                </ul>
            </nav>
            {categoryFilter ? <h2>{categoryFilter}</h2> : null}
            {description ? <p>{description}</p> : null}
            <ul>
                {reviewList.map(review => {
                    return (
                        <li className="review_container" key={review.review_id}>
                            <Link to={`reviews/${review.review_id}`}>
                                <h2 >{review.title}</h2>
                                <img className="review_image" src={review.review_img_url} alt={review.category} />
                            </Link>
                            <h3 >&#8679;{review.votes}</h3>
                        </li>
                    )
                })}
            </ul>
            <section>
                <button disabled={page === 1} onClick={() => { setPage((currPage) => currPage - 1) }}>&larr;</button>
                {pages.map(page => (
                    <button key={page} onClick={() => setPage(page)}>{page}</button>
                ))}
                <button disabled={page === 7} onClick={() => { setPage((currPage) => currPage + 1) }}>&rarr;</button>
            </section>

        </section>
    );
};

export default Home;
