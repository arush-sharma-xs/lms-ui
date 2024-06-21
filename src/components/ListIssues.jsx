import { useEffect } from "react";
import "./listissues.css";
import { useState } from "react";

const ListIssues = () => {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {

   fetch("http://localhost:5101/issuerequest", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAllIssues(res.data));
  }, [setAllIssues])

  return (
    <>

      <h1>LMS - List issues</h1>
        { allIssues.length < 0 && <p>No Issues found</p> }
        { allIssues.length > 0 && <><table>
            <thead>
              <td><th>Reader ID</th></td>
              <td><th>Book ID</th></td>
              <td><th>Request Type</th></td>
              <td><th>Request Date</th></td>
              <td><th>Approve/Reject</th></td>
            </thead>
            <tbody>
              {allIssues.map(issue => { return( <tr><td>{issue.readerId}</td><td>{issue.bookId}</td><td>{issue.requestType}</td><td>{issue.RequestDate}</td><td><button>Approve</button></td></tr>)})}

            </tbody>
          
          </table></>}
      
    </>
  );
};

export default ListIssues;
