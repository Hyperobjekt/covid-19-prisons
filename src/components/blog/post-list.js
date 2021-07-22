import React from "react";
import PostTeaser from "./post-teaser";

/** Renders a list of posts */
const PostList = ({ posts, ...props }) => {
  return (
    <>
      {posts.map((p) => (
        <PostTeaser {...p} key={p.url} {...props} />
      ))}
    </>
  );
};

export default PostList;
