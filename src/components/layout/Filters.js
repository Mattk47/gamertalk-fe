import React, { useContext } from 'react'
import reviewContext from '../../context/Review/reviewContext.js';

const Filters = () => {
    const ReviewContext = useContext(reviewContext)

    const { setFilter } = ReviewContext
    return (
        <div>
            <ul className="filter_bar">
                <button onClick={() => setFilter('REVIEW', 'comment_count')} className="filterButton">Hot🔥</button>
                <button onClick={() => setFilter('REVIEW', 'votes')} className="filterButton">Best</button>
                <button onClick={() => setFilter('REVIEW', 'created_at')} className="filterButton">New</button>
            </ul>
        </div>
    )
}

export default Filters
