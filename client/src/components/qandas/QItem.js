import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { deleteQanda, lockQuestion } from "../../actions/qandaActions";

class QItem extends Component {
  onDeleteClick(id) {
    this.props.deleteQanda(id);
  }
  onLockClick(id) {
    this.props.lockQuestion(id);
  }

  render() {
    const { qanda, auth, showActions } = this.props;
    let lockComponent = qanda.user === auth.user.id;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <Link to={`/profiles  `}>
              <img
                className="rounded-circle d-none d-md-block"
                src={qanda.avatar}
                alt=""
              />
            </Link>
            <br />
            <p className="text-center">{qanda.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{qanda.question}</p>
            {showActions ? (
              <span>
                <Link to={`/qandas/${qanda._id}`} className="btn btn-info mr-1">
                  Answers
                </Link>

                {lockComponent ? (
                  <span>
                    {qanda.lock ? (
                      <button
                        onClick={this.onLockClick.bind(this, qanda._id)}
                        type="button"
                        className="btn btn-primary mr-1"
                      >
                        Unlock
                      </button>
                    ) : (
                      <button
                        onClick={this.onLockClick.bind(this, qanda._id)}
                        type="button"
                        className="btn btn-warning mr-1"
                      >
                        Lock
                      </button>
                    )}
                  </span>
                ) : null}
                {qanda.user === auth.user.id ||
                auth.user.role === "Admin" ||
                auth.user.role === "Moderator" ? (
                  <div className="">
                    <button
                      onClick={this.onDeleteClick.bind(this, qanda._id)}
                      type="button"
                      className="btn btn-danger mr-1 pull-right"
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
QItem.propTypes = {
  qanda: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteQanda: PropTypes.func.isRequired,
  lockQuestion: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
QItem.defaultProps = {
  showActions: true,
};
export default connect(mapStateToProps, { deleteQanda, lockQuestion })(QItem);
