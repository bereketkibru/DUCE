import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deletePost } from "../../actions/postActions";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

class BlogCard extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }
  render() {
    let { _id, writer, content } = this.props.blog;
    const { id, role } = this.props.user;
    console.log(writer.role);
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
            src={writer.avatar}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle className="rounded-circle">{writer.name}</CardTitle>
            <CardSubtitle>{}</CardSubtitle>
            <CardText>
              <div style={{ height: 150, overflowY: "scroll", marginTop: 10 }}>
                {" "}
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </CardText>
            <a href={`/blog/post/${_id}`}>
              <Button color="info">Read More</Button>
            </a>
            <div className="float-right">
              {writer._id === id || role === "Admin" ? (
                <Button
                  onClick={this.onDeleteClick.bind(this, _id)}
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
  blog: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(BlogCard);
