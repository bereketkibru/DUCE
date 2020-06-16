import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QItem from "../qandas/QItem";
import Spinner from "../common/Spinner";
import { getQanda } from "../../actions/qandaActions";
import { Link } from "react-router-dom";
import AnswerForm from "./AnswerForm";
import AnswerFeed from "./AnswerFeed";

class Qanda extends Component {
  componentDidMount() {
    this.props.getQanda(this.props.match.params.id);
  }
  render() {
    const { qanda, loading } = this.props.qanda;
    let qandaContent;
    let qandaForm;
    if (qanda.lock) {
      qandaForm = (
        <div>
          <i className="fa fa-lock fa-5x" aria-hidden="true"></i>
        </div>
      );
    } else {
      qandaForm = <AnswerForm qandaId={qanda._id} />;
    }
    if (qanda === null || loading || Object.keys(qanda).length === 0) {
      qandaContent = <Spinner />;
    } else {
      qandaContent = (
        <div>
          <QItem qanda={qanda} showActions={false} />
          {qandaForm}
          <div className="col-sm-auto offset-sm-1">
            <AnswerFeed qandaId={qanda._id} answers={qanda.answers} />
          </div>
        </div>
      );
    }
    return (
      <div className="qanda">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/qandas" className="btn btn-light mb-3">
                Back To Questions
              </Link>
              {qandaContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Qanda.propTypes = {
  getQanda: PropTypes.func.isRequired,
  qanda: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  qanda: state.qanda,
});
export default connect(mapStateToProps, { getQanda })(Qanda);
