import { Link } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import reviewContext from '../../context/Review/reviewContext.js';
import Spinner from '../layout/Spinner.js';

const Categories = () => {
    const ReviewContext = useContext(reviewContext)

    const { setFilter, getCategories, categories, loading } = ReviewContext;


    useEffect(() => {
        getCategories()
        // eslint-disable-next-line 
    }, [])

    if (loading) return <Spinner />;

    return (
        <section className="container">
            {categories.map(category => {
                return (
                    <div className="categoryList" key={category.slug}>
                        <Link to="/">
                            <h2 className='link--colour a' onClick={() => setFilter('CATEGORY', category.slug)}>{category.slug}</h2>
                        </Link>

                    </div>
                )
            })}
        </section>
    );
};

export default Categories;