import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/features/contactSlice";
import Record from "./Record";
import Pagination from "./Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { contacts, filterData } = useSelector((state) => state.contact);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  useEffect(() => {
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    setCurrentData([...contacts.slice(indexOfFirstPost, indexOfLastPost)]);
  }, [filterData, contacts ,currentPage,searchData]);

  function handleSearch(qry) {
    const result = contacts.filter((item) =>
      item.name.toLowerCase().includes(qry.toLowerCase())
    );
    setSearchData(result);
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      handleSearch(query);
    }, 1000);
    return () => clearTimeout(timer);
  }, [query,searchData]);



  // const currentData = data.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log(  "all" , currentData , contacts)
  return (
    <div className="homeDiv">
      <div className="SearchDiv">
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query === "" ? (
        <>
          <Record data={currentData} filterData = {filterData} />
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={contacts.length}
            paginate={paginate}
            currentPage = {currentPage}
          />
        </>
      ) : (
        <Record data={searchData} />
      )}

      {query === "" ? (
        <div className="btn-Div">
          <label>Status:</label>
          <button
            className="btn btn-active"
            onClick={() => dispatch(setFilter("Active"))}
          >
            Active
          </button>
          <button
            className="btn btn-inactive"
            onClick={() => dispatch(setFilter("Inactive"))}
          >
            Inactive
          </button>
          <button
            className="btn btn-reset"
            onClick={() => dispatch(setFilter("Reset"))}
          >
            Reset
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
