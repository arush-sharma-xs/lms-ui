import { useState } from "react";
import "./booklist.css";
import { useEffect } from "react";

const BookList = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5101/book", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAllBooks(res.books));
  }, []);

  return (
    <>
      <h1>LMS - All Books</h1>
      <div id="output"></div>
      <table id="booklist">
        <tr>
          <th>S.No.</th>
          <th>Book'Name</th>
          <th>Author</th>
          <th>Publisher</th>
          <th>Version</th>
          <th>Total Copies</th>
          <th>Available Copies</th>
          <th>QR Code</th>
          <th>Action</th>
        </tr>
        {allBooks.map((book, index) => {
          const encData = encodeURI(
            `Name : ${book.title}\nAuthor : ${book.authors}\nPublisher : ${book.publisher}\nversion : ${book.version} `
          );
          return (
            <tr>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.publisher}</td>
              <td>{book.version}</td>
              <td>{book.totalCopies}</td>
              <td>{book.availableCopies}</td>
              <td>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encData}`}
                />
              </td>
              <td>
                <button
                  class="removeBook"
                  name="${
                    book.isbn
                  }"
                >
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </>
  );
};

export default BookList;
