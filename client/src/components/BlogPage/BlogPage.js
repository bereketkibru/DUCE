import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { Container, Row, Col } from "reactstrap";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios.get("/api/blog/getBlogs").then((response) => {
      if (response.data.success) {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } else {
        alert("Couldnt get blog`s lists");
      }
    });
  }, []);
  let hasPrivilage = false;
  if (user.role === "Moderator" || user.role === "Admin") {
    hasPrivilage = true;
  }
  const create = hasPrivilage ? (
    <Link to="/blog/create" className="btn btn-light">
      <i className="fab fa-blogger-b fa-2x text-info mr-3"></i>
      Create Post
    </Link>
  ) : null;

  let blogCards = blogs.map((blog) => {
    return (
      <Col sm="4">
        <BlogCard key={blog._id} blog={blog} user={user} />
      </Col>
    );
  });
  return (
    <div>
      {create}
      <Container fluid>
        <Row>
          <h2> Blog Lists</h2>
          <Row>{blogCards}</Row>
        </Row>
      </Container>
    </div>
  );
}

export default BlogPage;
