import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ForumForm from "./ForumForm";
import Spinner from "../common/Spinner";
import { getForums } from "../../actions/forumActions";
import ForumFeed from "./ForumFeed";

class Forums extends Component {
  componentDidMount() {
    this.props.getForums();
  }
  render() {
    const { forums, loading } = this.props.forum;
    let forumContent;
    if (forums === null || loading) {
      forumContent = <Spinner />;
    } else {
      forumContent = <ForumFeed forums={forums} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <ForumForm />
              {forumContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Forums.propTypes = {
  getForums: PropTypes.func.isRequired,
  forum: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  forum: state.forum,
});
export default connect(mapStateToProps, { getForums })(Forums);
