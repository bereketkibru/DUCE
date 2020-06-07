import React, { Component } from "react";
import PropTypes from "prop-types";
import ForumItem from "./ForumItem";

class ForumFeed extends Component {
  render() {
    const { forums } = this.props;
    return forums.map((forum) => <ForumItem key={forum._id} forum={forum} />);
  }
}
ForumFeed.propTypes = {
  forums: PropTypes.array.isRequired,
};
export default ForumFeed;
