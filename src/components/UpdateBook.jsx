import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

const UpdateBooks = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState({
    isbn: "",
    title: "",
    authors: "",
    publisher: "",
    version: "",
    totalCopies: "",
    availableCopies: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5101/getBookById/${bookId}`)
      .then((res) => res.json())
      .then((res) => setBook((prev) => ({ ...prev, ...res.data })));
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (!book.title) {
      setError("Title is required !");
      return;
    }

    if (!book.authors) {
      setError("Authors is required !");
      return;
    }

    if (!book.publisher) {
      setError("Publisher is required !");
      return;
    }

    if (!book.version) {
      setError("Version is required !");
      return;
    }

    if (!book.totalCopies) {
      setError("Total Copies is required !");
      return;
    }

    let regex = /^[a-zA-Z][a-zA-Z \\s]+$/;

    if (!regex.test(book.title)) {
      setError("enter valid title");
      return;
    }

    if (!regex.test(book.authors)) {
      setError("enter valid Author");
      return;
    }

    let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+[.](com|in|edu)/;
    if (!emailRegex.test(book.publisher)) {
      setError("enter valid email Id");
      return;
    }
  };

  return (
    <div>
      <h3>Update Book</h3>
      <div style={{ marginTop: "-40px" }}>
        {book && (
          <form action="#" onSubmit={handleUpdate}>
            <div>
              <label htmlFor="title">Title : </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                autoFocus
                placeholder={book.title}
                value={book.title}
              />
            </div>

            <div>
              <label htmlFor="authors">authors : </label>
              <input
                type="text"
                name="authors"
                onChange={handleChange}
                autoFocus
                placeholder={book.authors}
                value={book.authors}
              />
            </div>
            <div>
              <label htmlFor="publisher">Publisher : </label>
              <input
                type="text"
                name="publisher"
                onChange={handleChange}
                autoFocus
                placeholder={book.publisher}
                value={book.publisher}
              />
            </div>
            <div>
              <label htmlFor="version">Version : </label>
              <input
                type="number"
                name="version"
                onChange={handleChange}
                autoFocus
                placeholder={book.version}
                value={book.version}
              />
            </div>
            <div>
              <label htmlFor="totalCopies">Total Copies : </label>
              <input
                type="number"
                name="totalCopies"
                onChange={handleChange}
                autoFocus
                placeholder={book.totalCopies}
                value={book.totalCopies}
              />
            </div>
            <div>
              <label htmlFor="availableCopies">Available Copies: </label>
              <input
                type="number"
                name="availableCoies"
                onChange={handleChange}
                autoFocus
                placeholder={book.availableCopies}
                value={book.availableCopies}
              />
            </div>
            <button type="submit">Update</button>
            {error && <ErrorAlert value={error} />}
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateBooks;
