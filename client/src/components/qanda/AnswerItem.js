import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteAnswer } from "../../actions/qandaActions";
class AnswerItem extends Component {
  onDeleteClick(qandaId, answerId) {
    this.props.deleteAnswer(qandaId, answerId);
  }
  render() {
    const { qandaId, answer, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={answer.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{answer.name}</p>
          </div>
          <div className="col-md-10">
            <div dangerouslySetInnerHTML={{ __html: answer.answer }} />
            {answer.user === auth.user.id ||
            auth.user.role === "Admin" ||
            auth.user.role === "Moderator" ? (
              <button
                onClick={this.onDeleteClick.bind(this, qandaId, answer._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-trash " />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

AnswerItem.propTypes = {
  deleteAnswer: PropTypes.func.isRequired,
  answer: PropTypes.object.isRequired,
  qandaId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteAnswer })(AnswerItem);
