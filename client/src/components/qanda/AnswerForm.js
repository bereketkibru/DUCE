import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addAnswer } from "../../actions/qandaActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  modules = {
    toolbar: this.toolbarOptions,
  };
  onChange(value) {
    this.setState({ answer: value });
  }

  render() {
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Try to be precise on your answer.
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  modules={this.modules}
                  value={this.state.answer}
                  placeholder="say something"
                  onChange={this.onChange}
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
