import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPost } from "../../actions/postActions";
import Spinner from "../common/Spinner";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import { Typography } from "antd";

const { Title } = Typography;

class PostPage extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.post;
    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Spinner />;
    } else {
      postContent = (
        <div className="postPage" style={{ width: "80%", margin: "3rem auto" }}>
          <Title level={2}>{post.writer.name}`s Post</Title>
          <br />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Title level={4}>{post.createdAt}</Title>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          <CommentForm postId={post._id} />
          <div className="col-sm-auto offset-sm-1">
            <CommentFeed postId={post._id} comments={post.comments} />
          </div>
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/blog" className="btn btn-light mb-3">
                Back To Blog Feed
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PostPage.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
});
export default connect(mapStateToProps, { getPost })(PostPage);
