import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteThread } from "../../actions/forumActions";
class ThreadItme extends Component {
  onDeleteClick(forumId, threadId) {
    this.props.deleteThread(forumId, threadId);
  }
  render() {
    const { forumId, thread, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={thread.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{thread.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{thread.text}</p>
            {thread.user === auth.user.id ||
            auth.user.role === "Admin" ||
            auth.user.role === "Moderator" ? (
              <button
                onClick={this.onDeleteClick.bind(this, forumId, thread._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

ThreadItme.propTypes = {
  deleteThread: PropTypes.func.isRequired,
  thread: PropTypes.object.isRequired,
  forumId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteThread })(ThreadItme);
