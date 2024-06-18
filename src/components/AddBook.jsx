import { useState } from "react";
import "./addbook.css";

const AddBook = () => {
  const [title, setTitle] = useState(null);
  const [authors, setAuthors] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [version, setVersion] = useState(null);
  const [totalCopies, setTotalCopies] = useState(null);
  const [error, setError] = useState("");

  const handleAddBook = async (e) => {
    setError("");
    e.preventDefault();

    if (!title) {
      setError("Title is required !");
      return;
    }

    if (!authors) {
      setError("Authors is required !");
      return;
    }

    if (!publisher) {
      setError("Publisher is required !");
      return;
    }

    if (!version) {
      setError("Version is required !");
      return;
    }

    if (!totalCopies) {
      setError("Total Copies is required !");
      return;
    }

    let regex = /^[a-zA-Z][a-zA-Z \\s]+$/;

    if (!regex.test(title)) {
      setError("enter valid title");
      return;
    }

    if (!regex.test(authors)) {
      setError("enter valid Author");
      return;
    }

    let emailRegex = /^[a-zA-Z][a-zA-Z0-9.]+@[a-zA-Z]+[.](com|in|edu)/;
    if (!emailRegex.test(publisher)) {
      setError("enter valid email Id");
      return;
    }

    // Tweaking the data for sending to server
    const book = {
      libId: 1,
      title,
      authors,
      publisher,
      version: parseInt(version),
      totalCopies: parseInt(totalCopies),
      availableCopies: parseInt(totalCopies),
    };

    console.log(book);

    const response = await fetch("http://localhost:5101/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    });

    if (response.status == 200) {
      const { status } = await response.json();
      window.alert(status);
    } else {
      const { error } = await response.json();
      window.alert(error);
    }
  };

  return (
    <div id="main__container">
      <h2>LMS - Add Book To library</h2>
      <form action="#" onSubmit={handleAddBook} id="addBookForm">
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="authors">Authors:</label>
          <input
            type="text"
            name="authors"
            id="authors"
            onChange={(e) => setAuthors(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="publisher">Publisher:</label>
          <input
            type="email"
            name="publisher"
            id="publisher"
            onChange={(e) => setPublisher(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="version">Version:</label>
          <input
            type="number"
            name="version"
            id="version"
            min="1500"
            max="2024"
            onChange={(e) => setVersion(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="totalCopies">Total Copies:</label>
          <input
            type="number"
            name="totalCopies"
            id="totalCopies"
            min="1"
            max="25"
            onChange={(e) => setTotalCopies(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
