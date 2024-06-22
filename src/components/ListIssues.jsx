import { useEffect } from "react";
import "./styles/listissues.css";
import { useState } from "react";

const ListIssues = () => {
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5101/issuerequest", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;
        const finalData = data.filter((item) => item.approverId === 0);
        console.log(finalData);
        setAllIssues(finalData);
      });
  }, [setAllIssues]);

  const handleApprove = (issue) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    issue.ApproverID = parseInt(currentUser.id);

    fetch("http://localhost:5101/approveissue", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.status = "approved")) {
          window.location.reload();
        } else {
          console.log("Rejected");
        }
      });
  };

  const handleReject = (issue) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    issue.ApproverID = parseInt(currentUser.id);

    fetch("http://localhost:5101/rejectissue", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issue),
    })
      .then((res) => res.json())
      .then((data) => {
        if ((data.status = "rejected")) {
          window.location.reload();
        } else {
          console.log(data.error);
        }
      });
  };

  return (
    <>
      <h1>LMS - List issues</h1>
      {allIssues.length <= 0 && <h2>No Issues found</h2>}
      {allIssues.length > 0 && (
        <>
          <table>
            <thead>
              <tr>
                <th>Reader ID</th>
                <th>Book ID</th>
                <th>Request Type</th>
                <th>Request Date</th>
                <th>Approve/Reject</th>
              </tr>
            </thead>
            <tbody>
              {allIssues.map((issue) => {
                return (
                  <tr key={issue.ReqID}>
                    <td>{issue.readerId}</td>
                    <td>{issue.bookId}</td>
                    <td>{issue.requestType}</td>
                    <td>{issue.RequestDate}</td>
                    <td>
                      <button
                        onClick={(e) => handleApprove(issue)}
                        style={{
                          backgroundColor: "#9BC53D",
                          color: "whitesmoke",
                        }}
                      >
                        Approve
                      </button>{" "}
                      <button
                        onClick={(e) => handleReject(issue)}
                        style={{
                          backgroundColor: "#C3423F",
                          color: "whitesmoke",
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default ListIssues;
