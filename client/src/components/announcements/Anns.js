import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { getAnns } from "../../actions/annActions";
import AnnFeed from "./AnnFeed";
import { Link } from "react-router-dom";

class Anns extends Component {
  componentDidMount() {
    this.props.getAnns();
  }
  render() {
    const { anns, loading } = this.props.ann;
    const { user } = this.props.auth;
    let annContent;
    if (anns === null || loading) {
      annContent = <Spinner />;
    } else {
      annContent = <AnnFeed anns={anns} />;
    }
    let formContent;
    if (user.role === "Moderator" || user.role === "Admin") {
      formContent = (
        <Link to="/add-ann" className="btn btn-light">
          <i className="fa fa-bullhorn fa-2x text-primary mr-3"></i>
          Add Announcement
        </Link>
      );
    } else {
      formContent = null;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {formContent}
              {annContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Anns.propTypes = {
  getAnns: PropTypes.func.isRequired,
  ann: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  ann: state.ann,
  auth: state.auth,
});
export default connect(mapStateToProps, { getAnns })(Anns);
