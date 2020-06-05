import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addAnswer } from "../../actions/qandaActions";

class AnswerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { qandaId } = this.props;

    const newAnswer = {
      answer: this.state.answer,
      name: user.name,
      avatar: user.avatar,
    };

    this.props.addAnswer(qandaId, newAnswer);
    this.setState({ answer: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Try to be precise on your answer.
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Answer"
                  name="answer"
                  value={this.state.answer}
                  onChange={this.onChange}
                  error={errors.answer}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AnswerForm.propTypes = {
  addAnswer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  qandaId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addAnswer })(AnswerForm);
