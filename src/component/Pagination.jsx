import React, { useContext } from 'react';
import { clientContext } from '../context/ClientContext';


const Pagination = () => {
    const { totalPosts, postsPerPage, handlePage, currentPage } = useContext(clientContext)
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)

    }
    console.log(pageNumbers)
    return (
        <div className="pagination">
            <ul>
                {
                    pageNumbers.map((page) => (
                        <li key={page}>
                            <button
                                style={{ background: page === currentPage ? "red" : "lightblue" }}
                                onClick={() => handlePage(page)}>{page}</button>
                        </li>
                    ))
                }
            </ul>

        </div>
    );
};

export default Pagination;