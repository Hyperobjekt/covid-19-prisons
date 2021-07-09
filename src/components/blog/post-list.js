import React from "react";
import Post from "./post";

/** Renders a list of posts */
const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((p) => (
        <Post post={p} key={p.url} />
      ))}
    </>
  );
};

export default PostList;
