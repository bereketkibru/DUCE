import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addAnn } from "../../actions/annActions";
import { Link, withRouter } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
class AnnForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      link: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newAnn = {
      text: this.state.text,
      link: this.state.link,
      name: user.name,
      avatar: user.avatar,
    };

    this.props.addAnn(newAnn, this.props.history);
    this.setState({ text: "", link: "" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleChange(value) {
    this.setState({ text: value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <Link to="/announcement" className="btn btn-light">
          Go Back
        </Link>
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            Create Announcement
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  modules={this.modules}
                  value={this.state.text}
                  placeholder="say something"
                  onChange={this.handleChange}
                />
                {errors.text && (
                  <div className="invalid-feedback">{errors.text}</div>
                )}
                <div className="mt-5">
                  <TextAreaFieldGroup
                    placeholder="Put here the link(optional)"
                    name="link"
                    value={this.state.link}
                    onChange={this.onChange}
                    error={errors.link}
                  />
                </div>
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

AnnForm.propTypes = {
  addAnn: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addAnn })(withRouter(AnnForm));
