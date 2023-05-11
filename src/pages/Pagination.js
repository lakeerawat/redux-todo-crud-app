import React from 'react';
import "./Pagination.css";


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)} className='page-item'>
              {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;