import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AnnForm from "./AnnForm";
import Spinner from "../common/Spinner";
import { getAnns } from "../../actions/annActions";
import AnnFeed from "./AnnFeed";

class Anns extends Component {
  componentDidMount() {
    this.props.getAnns();
  }
  render() {
    const { anns, loading } = this.props.ann;
    let annContent;
    if (anns === null || loading) {
      annContent = <Spinner />;
    } else {
      annContent = <AnnFeed anns={anns} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <AnnForm />
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
};

const mapStateToProps = (state) => ({
  ann: state.ann,
});
export default connect(mapStateToProps, { getAnns })(Anns);
