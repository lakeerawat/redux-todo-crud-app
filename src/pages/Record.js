import React from "react";
import { Link } from "react-router-dom";
import "./Record.css";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/features/contactSlice";
import { toast } from "react-toastify";

const Record = ({ data }) => {
  console.log(data);
  const dispatch = useDispatch();
  const onDeleteContact = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      dispatch(deleteContact(id));
      toast.success("Contact deleted Successfully");
    }
  };
  return (
    <>
      {data?.length === 0 ? (
        <div>
          <h1>Sorry data found!!</h1>{" "}
          {/* <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link> */}
        </div>
      ) : (
        <div className="recordDiv">
          <Link to="/addContact">
            <button className="btn btn-contact">Add Contact</button>
          </Link>

          <table className="styled-table">
            <thead>
              <tr className="trsection">
                <th>No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
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
        </div>
      )}
    </>
  );
};

export default Record;
