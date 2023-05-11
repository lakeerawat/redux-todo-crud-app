import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import {setFilter } from "../redux/features/contactSlice";
import Record from "./Record";
import Pagination from "./Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { contacts, filterData } = useSelector((state) => state.contact);
  const [data, setData] = useState(contacts);
  const [query, setQuery] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    if (filterData === "Reset" || filterData === undefined) {
      setData(contacts);
    } else {
      const newdata = contacts.filter((item) => item.status === filterData);
      setData([...newdata]);
    }
  }, [filterData, contacts]);
  console.log(data, filterData);

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
  }, [query]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentData = data.slice(indexOfFirstPost, indexOfLastPost);
  
    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="homeDiv">
      {/* <div style={{ marginTop: "150px" }}>
      <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link>

      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.filter((item)=> {
            if(filterData === "Reset" || filterData === undefined){
              return item
            }else{
              return item.status === filterData
            }
          }
          )
          .map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDeleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <label>Status:</label>
      <button className="btn btn-active" onClick={()=>dispatch(setFilter("Active"))}>Active</button>
      <button className="btn btn-inactive" onClick={()=>dispatch(setFilter("Inactive"))}>Inactive</button>
      <button className="btn btn-reset" onClick={()=>dispatch(setFilter("Reset"))}>Reset</button>
    </div> */}
      <div className="SearchDiv">
        <input
          type="text"
          placeholder="search..."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      {query === "" ? 
      <><Record data={currentData} />
            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={data.length}
            paginate={paginate}
          />
          </>
       : <Record data={searchData} />}

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