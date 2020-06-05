import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import QForm from "./QForm";
import Spinner from "../common/Spinner";
import { getQandas } from "../../actions/qandaActions";
import QFeed from "./QFeed";

class Qandas extends Component {
  componentDidMount() {
    this.props.getQandas();
  }
  render() {
    const { qandas, loading } = this.props.qanda;
    let qandaContent;
    if (qandas === null || loading) {
      qandaContent = <Spinner />;
    } else {
      qandaContent = <QFeed qandas={qandas} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <QForm />
              {qandaContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Qandas.propTypes = {
  getQandas: PropTypes.func.isRequired,
  qanda: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  qanda: state.qanda,
});
export default connect(mapStateToProps, { getQandas })(Qandas);
