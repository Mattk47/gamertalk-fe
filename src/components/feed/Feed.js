import React, { useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import reviewContext from '../../context/Review/reviewContext.js';
import Spinner from '../layout/Spinner.js';
import Filters from '../layout/Filters.js';
import { Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import FeedItem from './FeedItem.js';

const Feed = () => {
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

    const filterButton = { color: 'white', border: 'solid', borderColor: 'rgb(26, 33, 46)', border: '2px solid', backgroundColor: 'rgb(26, 33, 46)' }

    return (
        <section>
            <Filters />
            {
                categoryFilter ? (<div className='relative'>
                    <Button variant='contained' color='primary' style={filterButton}>{categoryFilter}</Button>
                    <div className='x animate-pulse'>
                        <CancelIcon style={{ color: 'red' }} onClick={() => window.location.reload(false)} />
                    </div>
                </div>) : null
            }
            <ul>
                {reviewList.map(review => {
                    console.log(review)
                    return (
                        <FeedItem key={review.review_id}
                            review_id={review.review_id}
                            votes={review.votes}
                            created_at={review.created_at}
                            title={review.title}
                            review_img_url={review.review_img_url}
                            category={review.category}
                            author={review.owner} />
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

export default Feed;
