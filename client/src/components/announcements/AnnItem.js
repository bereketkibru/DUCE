import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAnn } from "../../actions/annActions";
import Moment from "react-moment";
import isEmpty from "../../validation/is-empty";

class AnnItem extends Component {
  onDeleteClick(id) {
    this.props.deleteAnn(id);
  }

  render() {
    const { ann, auth, showActions } = this.props;

    var str = String(ann.link);
    var linkContent = "";

    if (isEmpty(ann.link)) {
      linkContent = null;
    } else {
      str = str.length > 10 ? str.substring(0, 25) + "..." : str;
      linkContent = (
        <a className="text-white p-2" href={ann.link} target="_blank">
          <button className=" btn btn-info">{str}</button>
        </a>
      );
    }
    return (
      <div className="card border-info mt-5">
        <div className="card-header">
          <h4 className="card-title float-left text-info">{ann.title}</h4>
          <div
            className="spinner-grow text-info float-right"
            role="status"
          ></div>
        </div>
        <div className="card-body">
          <h4 className="card-text text-justify font-italic lead">
            {ann.text}
          </h4>
          <div className="float-right">{linkContent}</div>
        </div>
        <div className="card-footer text-muted">
          <h3 className="font-italic">{ann.name}</h3>
          <div className="float-right">
            <Moment format="YYYY/MM/DD">{ann.date}</Moment>
            {showActions ? (
              <span>
                {ann.user === auth.user.id || auth.user.role === "Admin" ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, ann._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
AnnItem.propTypes = {
  ann: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAnn: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
AnnItem.defaultProps = {
  showActions: true,
};
export default connect(mapStateToProps, { deleteAnn })(AnnItem);
