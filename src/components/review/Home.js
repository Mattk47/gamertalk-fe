import React from 'react';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import dayjs from "dayjs";
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import reviewContext from '../../context/Review/reviewContext.js';
import Spinner from '../layout/Spinner.js';
import Filters from '../layout/Filters.js';

const Home = () => {
    const ReviewContext = useContext(reviewContext)
    const { reviewList, loading, getReviews, totalGames, reviewFilter, categoryFilter, page, setPage } = ReviewContext;
    const gamesPerPage = 5
    const pageCount = Math.ceil(totalGames / gamesPerPage)

    useEffect(() => {

        getReviews(reviewFilter, "desc", page, categoryFilter)

    }, [reviewFilter, page, categoryFilter, totalGames]);


    if (loading) return <Spinner />;

    const handleChange = (_, value) => {
        setPage(value);
    };

    return (
        <section>
            <Filters />
            {categoryFilter ? <h2 >{categoryFilter}</h2> : null}
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
