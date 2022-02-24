import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import reviewContext from '../../context/Review/reviewContext.js';

const Category = ({ categorySlug }) => {
    const ReviewContext = useContext(reviewContext)
    return (
        <div className="categoryList" key={categorySlug}>
            <Link to="/">
                <h2 className='link--colour a' onClick={() => ReviewContext.setFilter('CATEGORY', categorySlug)}>{categorySlug}</h2>
            </Link>

        </div>
    )
}

export default Category