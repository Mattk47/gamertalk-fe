import React from 'react';
import { useState, useEffect } from 'react';
import { getReviews } from '../utils.js'
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Home = ({ categoryFilterObj }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [reviewList, setReviewList] = useState([]);
    const [reviewFilter, setReviewFilter] = useState('created_at');
    const [page, setPage] = useState(1);
    const { categoryFilter, description } = categoryFilterObj
    const [totalGames, setTotalGames] = useState(0)
    const gamesPerPage = 5
    const pageCount = Math.ceil(totalGames / gamesPerPage)
    const pages = Array.from({ length: pageCount }).map((el, i) => i + 1)

    useEffect(() => {
        setIsLoading(true);
        if (totalGames === 0) {
            let reviews = getReviews(reviewFilter, "desc", page, categoryFilter)
            let totalReviews = getReviews(reviewFilter, "desc", page, categoryFilter, 100)
            Promise.all([reviews, totalReviews]).then((resArr) => {
                setReviewList(resArr[0].data.reviews);
                setTotalGames(resArr[1].data.total_count);
            })
        } else {
            getReviews(reviewFilter, "desc", page, categoryFilter).then(res => {
                setReviewList(res.data.reviews);

            })
            setIsLoading(false);
        }
    }, [reviewFilter, page, categoryFilter, totalGames]);

    if (isLoading) return <p>Loading.....</p>;

    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <section>
            <nav >
                <ul className="nav_bar">
                    <button onClick={() => setReviewFilter('comment_count')} className="filterButton">Hot🔥</button>
                    <button onClick={() => setReviewFilter("votes")} className="filterButton">Best</button>
                    <button onClick={() => setReviewFilter("created_at")} className="filterButton">New</button>
                </ul>
            </nav>
            {categoryFilter ? <h2 >{categoryFilter}</h2> : null}
            {description ? <p className='text--margin'>{description}</p> : null}
            <ul>
                {reviewList.map(review => {
                    return (
                        <li className="review_container" key={review.review_id}>
                            <Link to={`reviews/${review.review_id}`}>
                                <h2 >{review.title}</h2>
                                <img className="review_image" src={review.review_img_url} alt={review.category} />
                            </Link>
                            <div className="text--white">
                                <p>{dayjs(review.created_at).format("D MMM YYYY")}</p>
                                <h3 >&#8679;{review.votes}</h3>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Stack spacing={2} alignItems="center" >
                <Typography>Page: {page}</Typography>
                <Pagination count={pageCount} page={page} onChange={handleChange} />
            </Stack>
        </section>
    );
};

export default Home;
