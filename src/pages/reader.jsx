import "./reader.css";

const Reader = () => {
  return (
    <div>
      <h1 class="heading">Library Management System - Reader page</h1>

      <h2>Search Books :</h2>

      <form id="searchForm" action="#" onsubmit="handleSearch">
        <label for="searchBy">Search by :</label>
        <select name="searchBy" id="searchBy">
          <option value="title">title</option>
          <option value="authors">author</option>
          <option value="publisher">publishers</option>
        </select>
        <input type="text" name="search" placeholder="Search Book here" />
        <button type="submit">Search</button>
      </form>

      <p id="output"></p>
      <table id="results"></table>
    </div>
  );
};

export default Reader;
