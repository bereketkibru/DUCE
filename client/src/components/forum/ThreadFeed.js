import React, { Component } from "react";
import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";

class ThreadFeed extends Component {
  render() {
    const { threads, forumId } = this.props;

    return threads.map((thread) => (
      <ThreadItem key={thread._id} thread={thread} forumId={forumId} />
    ));
  }
}

ThreadFeed.propTypes = {
  threads: PropTypes.array.isRequired,
  forumId: PropTypes.string.isRequired,
};
export default ThreadFeed;
