import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deleteForum, addVote, removeVote } from "../../actions/forumActions";

class ForumItem extends Component {
  onDeleteClick(id) {
    this.props.deleteForum(id);
  }
  onLikeClick(id) {
    this.props.addVote(id);
  }
  onUnlikeClick(id) {
    this.props.removeVote(id);
  }
  findUserVote(votes) {
    const { auth } = this.props;
    if (votes.filter((vote) => vote.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { forum, auth, showActions, showDescription } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={forum.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{forum.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead "></p>
            {showDescription ? (
              <div dangerouslySetInnerHTML={{ __html: forum.text }} />
            ) : null}

            {showActions ? (
              <span>
                <button
                  onClick={this.onLikeClick.bind(this, forum._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserVote(forum.votes),
                    })}
                  ></i>
                  <span className="badge badge-light">
                    {forum.votes.length}
                  </span>
                </button>
                <button
                  onClick={this.onUnlikeClick.bind(this, forum._id)}
                  type="button"
                  className="btn btn-light mr-1"
                >
                  <i className="text-secondary fas fa-thumbs-down"></i>
                </button>
                <Link to={`/forums/${forum._id}`} className="btn btn-info mr-1">
                  Discussion
                </Link>
                {forum.user === auth.user.id ||
                auth.user.role === "Admin" ||
                auth.user.role === "Moderator" ? (
                  <div className="mt-5 ">
                    <button
                      onClick={this.onDeleteClick.bind(this, forum._id)}
                      type="button"
                      className="btn btn-danger mr-1 pull-right mt-5"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
ForumItem.propTypes = {
  forum: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteForum: PropTypes.func.isRequired,
  addVote: PropTypes.func.isRequired,
  removeVote: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
ForumItem.defaultProps = {
  showActions: true,
  showDescription: true,
};

export default connect(mapStateToProps, { deleteForum, addVote, removeVote })(
  ForumItem
);
