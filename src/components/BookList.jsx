import { useState } from "react";
import "./booklist.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5101/book", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => setAllBooks(res.books));
  }, []);

  const handleEdit = (bookId) => {
    navigate(`/update/${bookId}`);
  };

  const handleRemove = (bookId) => {
    console.log(bookId);
  };

  return (
    <>
      <h1>LMS - All Books</h1>
      <div id="output"></div>
      <table id="booklist">
        <thead>
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
                <td>{book.totalCopies}</td>
                <td>{book.availableCopies}</td>
                <td>
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encData}`}
                  />
                </td>
                <td>
                  <button
                    className="removeBook"
                    onClick={(e) => handleRemove(book.isbn)}
                  >
                    Remove
                  </button>
                  <br />
                  <button
                    className="updateBook"
                    onClick={(e) => handleEdit(book.isbn)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BookList;
