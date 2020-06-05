import React, { Component } from "react";
import PropTypes from "prop-types";
import QItem from "./QItem";

class QFeed extends Component {
  render() {
    const { qandas } = this.props;
    return qandas.map((qanda) => <QItem key={qanda._id} qanda={qanda} />);
  }
}
QFeed.propTypes = {
  qandas: PropTypes.array.isRequired,
};
export default QFeed;
