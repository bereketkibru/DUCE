import React, { Component } from "react";
import PropTypes from "prop-types";
import AnswerItem from "./AnswerItem";

class AnswerFeed extends Component {
  render() {
    const { answers, qandaId } = this.props;

    return answers.map((answer) => (
      <AnswerItem key={answer._id} answer={answer} qandaId={qandaId} />
    ));
  }
}

AnswerFeed.propTypes = {
  answers: PropTypes.array.isRequired,
  qandaId: PropTypes.string.isRequired,
};
export default AnswerFeed;
