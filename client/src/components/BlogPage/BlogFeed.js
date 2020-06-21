import React, { Component } from "react";
import PropTypes from "prop-types";
import BlogCard from "./BlogCard";
import { Col } from "reactstrap";
class BlogFeed extends Component {
  render() {
    const posts = this.props.posts;
    console.log(posts);
    return posts.map((post) => (
      <Col sm="4">
        {" "}
        <BlogCard key={post._id} post={post} />
      </Col>
    ));
  }
}
BlogFeed.propTypes = {
  posts: PropTypes.array.isRequired,
};
export default BlogFeed;
