import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./App.css";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState([]);

  const fetchPost = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((posts) => {
        const slice = posts.slice(offset, offset + perPage);
        setPosts(slice);
        setPageCount(Math.ceil(posts.length / perPage));
      });
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);
    fetchPost();
  };

  useEffect(() => {
    fetchPost();
  }, [posts]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.id}</h3>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      <ReactPaginate
        previousLabel={"prev"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default App;
