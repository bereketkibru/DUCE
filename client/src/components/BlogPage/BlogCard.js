import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";
import { Link } from "react-router-dom";
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
  render() {
    let post = this.props.post;
    const { user } = this.props.auth;

    return (
      <div>
        <Card
          body
          inverse
          style={{ backgroundColor: "#333", borderColor: "#333" }}
          className="mt-5"
        >
          <CardImg
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

            <Link to={`/blog/${post._id}`} className="btn btn-info mr-1">
              Read More
            </Link>
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { deletePost })(BlogCard);
