import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ForumItem from "../forums/ForumItem";
import Spinner from "../common/Spinner";
import { getForum } from "../../actions/forumActions";
import { Link } from "react-router-dom";
import ThreadForm from "./ThreadForm";
import ThreadFeed from "./ThreadFeed";

class Forum extends Component {
  componentDidMount() {
    this.props.getForum(this.props.match.params.id);
  }
  render() {
    const { forum, loading } = this.props.forum;
    let forumContent;
    if (forum === null || loading || Object.keys(forum).length === 0) {
      forumContent = <Spinner />;
    } else {
      forumContent = (
        <div>
          <ForumItem forum={forum} showActions={false} showDescription={true} />
          <ThreadForm forumId={forum._id} />
          <div className="col-sm-auto offset-sm-1">
            <ThreadFeed forumId={forum._id} threads={forum.threads} />
          </div>
        </div>
      );
    }
    return (
      <div className="forum">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/forums" className="btn btn-light mb-3">
                Back To Forums
              </Link>
              {forumContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Forum.propTypes = {
  getForum: PropTypes.func.isRequired,
  forum: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  forum: state.forum,
});
export default connect(mapStateToProps, { getForum })(Forum);
