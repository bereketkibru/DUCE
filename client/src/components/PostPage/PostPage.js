import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
const { Title } = Typography;

function PostPage(props) {
  const [post, setPost] = useState([]);
  const postId = props.match.params.postId;

  useEffect(() => {
    const variable = { postId: postId };

    axios.post("/api/blog/getPost", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data.post);
        setPost(response.data.post);
      } else {
        alert("Couldnt get post");
      }
    });
  }, []);

  if (post.writer) {
    return (
      <div className="postPage" style={{ width: "80%", margin: "3rem auto" }}>
        <Link to="/blog" className="btn btn-light mb-3">
          Back To Feed
        </Link>
        <Title level={2}>{post.writer.name}`s Post</Title>
        <br />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Title level={4}>{post.createdAt}</Title>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
        <CommentForm postId={post._id} />
        <div className="col-sm-auto offset-sm-1">
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default connect(null, {})(PostPage);
