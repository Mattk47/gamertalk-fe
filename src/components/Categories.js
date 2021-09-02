import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCategories } from "../utils"

const Categories = ({ setCategoryFilterObj }) => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories().then(result => setCategories(result.data.categories))
    }, [])

    return (
        <section>
            <ul>
                {categories.map(category => {
                    return (
                        <li className="categoryList" key={category.slug}>
                            <Link to="/">
                                <h2 onClick={() => setCategoryFilterObj((currObj) => {
                                    const newObj = { ...currObj }
                                    newObj.categoryFilter = category.slug;
                                    newObj.description = category.description;
                                    return newObj;
                                })}>{category.slug}</h2>
                            </Link>

                        </li>
                    )
                })}
            </ul>
        </section>
    );
};

export default Categories;