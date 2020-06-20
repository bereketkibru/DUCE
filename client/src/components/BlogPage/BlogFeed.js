import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col } from "reactstrap";
import BlogCard from "./BlogCard";
class BlogFeed extends Component {
  render() {
    const { posts } = this.props;
    return posts.map((post) => (
      <Col sm="4">
        {" "}
        <BlogCard key={post._id} post={post} />{" "}
      </Col>
    ));
  }
}
BlogFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default BlogFeed;
