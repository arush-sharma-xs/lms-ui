import { useState } from "react";
import "./reader.css";

const Reader = () => {
  const [searchBy, setSearchBy] = useState("title");
  const [search, setSearch] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) {
      window.alert("Enter seach value.");
      return;
    }
    searchBook(searchBy, search);
  };

  const searchBook = async (key, value) => {
    const response = await fetch(
      `http://localhost:5101/search/${key}/${value}`
    );
    const { result } = await response.json();
    setAllBooks(result);
  };

  const handleRaiseIssue = async (bookId) => {
    console.log("issue Raised", bookId);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const readerId = currentUser.email;

    const data = {
      readerId,
      bookId,
      requestType: "issue",
    };

    const response = await fetch("http://localhost:5101/raiseissue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (response.status === 200) {
      window.alert(res.status);
    } else {
      window.alert(res.error);
    }
  };


  const handleReturnIssue = async (bookId) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const readerId = currentUser.email;

    const data = {
      readerId,
      bookId,
      requestType: "return",
    };

    const response = await fetch("http://localhost:5101/raiseissue", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    const res = await response.json();

    if (response.status === 200) {
      window.alert(res.status)
    } else {
      window.alert(res.status);
    }
  
  };

  return (
    <div>
      <h1 className="heading">Reader page : Search Book</h1>

      <form id="searchForm" action="#" onSubmit={handleSearch}>
        <label htmlFor="searchBy">Search by :</label>
        <select
          name="searchBy"
          id="searchBy"
          onChange={(e) => setSearchBy(e.target.value)}
        >
          <option value="title">title</option>
          <option value="authors">author</option>
          <option value="publisher">publishers</option>
        </select>
        <input
          type="text"
          name="search"
          placeholder="Search Book here"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <p id="output"></p>

      {allBooks.length > 0 && (
        <table id="results">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Book'Name</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Version</th>
              <th>QR Code</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allBooks.map((book, index) => {
              const encData = encodeURI(
                `Name : ${book.title}\nAuthor : ${book.authors}\nPublisher : ${book.publisher}\nversion : ${book.version} `
              );
              return (
                <tr key={book.isbn}>
                  <td>{index + 1}</td>
                  <td>{book.title}</td>
                  <td>{book.authors}</td>
                  <td>{book.publisher}</td>
                  <td>{book.version}</td>
                  <td>
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encData}`}
                    />
                  </td>
                  <td>
                    <button
                      className="raiseIssue"
                      onClick={(e) => handleRaiseIssue(book.isbn)}
                    >
                      Raise Issue
                    </button><br />
                    <button
                      className="raiseReturnIssue"
                      onClick={(e) => handleReturnIssue(book.isbn)}
                    >
                      Raise Return Issue
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reader;
