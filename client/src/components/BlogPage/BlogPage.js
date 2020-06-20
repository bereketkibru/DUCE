import React, { Component } from "react";
import { connect } from "mongoose";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";

import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import BlogFeed from "./BlogFeed";

class BlogPage extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    const { user } = this.state.auth;

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
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <BlogFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {create}
              <Container fluid>
                <Row>
                  <h2> BlogPage Lists</h2>
                  <Row>{postContent}</Row>
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
BlogPage.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPosts })(BlogPage);
