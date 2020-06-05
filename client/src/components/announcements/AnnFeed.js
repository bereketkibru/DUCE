import React, { Component } from "react";
import PropTypes from "prop-types";
import AnnItem from "./AnnItem";

class AnnFeed extends Component {
  render() {
    const { anns } = this.props;
    return anns.map((ann) => <AnnItem key={ann._id} ann={ann} />);
  }
}
AnnFeed.propTypes = {
  anns: PropTypes.array.isRequired,
};
export default AnnFeed;
