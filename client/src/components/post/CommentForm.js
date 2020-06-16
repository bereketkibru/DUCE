import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/postActions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
  }

  onChange(value) {
    this.setState({ text: value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Make a Comment</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <ReactQuill
                  theme="snow"
                  modules={this.modules}
                  value={this.state.text}
                  placeholder="say something"
                  onChange={this.onChange}
                />
                {errors.text && (
                  <div className="invalid-feedback">{errors.text}</div>
                )}
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { addComment })(CommentForm);
