import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import { Link } from "react-router-dom";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    const { user } = this.props.auth;
    let postContent;
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    let postForm;
    if (user.role === "Moderator" || user.role === "Admin") {
      postForm = (
        <Link to="/add-post" className="btn btn-light">
          <i className="fab fa-blogger-b fa-2x text-info mr-3"></i>
          Create Post
        </Link>
      );
    } else {
      postForm = null;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {postForm}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPosts })(Posts);
