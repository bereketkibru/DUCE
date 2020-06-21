import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost, addLike, removeLike } from "../../actions/postActions";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

class BlogCard extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  onLikeClick(id) {
    this.props.addLike(id);
  }
  onUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserVote(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth } = this.props;
    const user = auth.user;
    console.log(post);

    let clapContent = (
      <span>
        <button
          onClick={this.onLikeClick.bind(this, post._id)}
          type="button"
          className="btn btn-light mr-1"
        >
          <i
            className={classnames("fas fa-thumbs-up", {
              "text-info": this.findUserVote(post.likes),
            })}
          ></i>
          <span className="badge badge-light">{post.likes.length}</span>
        </button>
        <button
          onClick={this.onUnlikeClick.bind(this, post._id)}
          type="button"
          className="btn btn-light mr-1"
        >
          <i className="text-secondary fas fa-thumbs-down"></i>
        </button>
      </span>
    );
    return (
      <div>
        <Card className="mt-5">
          <CardImg
            className="rounded-circle"
            top
            style={{ width: "35px", marginRight: "5px" }}
            src={post.writer.avatar}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle className="rounded-circle">{post.writer.name}</CardTitle>
            <CardSubtitle>{}</CardSubtitle>
            <CardText>
              <div style={{ height: 150, overflowY: "scroll", marginTop: 10 }}>
                {" "}
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </CardText>
            <div>
              <Link to={`/blog/${post._id}`} className="btn btn-info mr-1">
                Read More
              </Link>
              {clapContent}
            </div>

            <div className="float-right">
              {post.writer._id === user.id || user.role === "Admin" ? (
                <Button
                  onClick={this.onDeleteClick.bind(this, post._id)}
                  type="button"
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-trash " />
                </Button>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}
BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  BlogCard
);
