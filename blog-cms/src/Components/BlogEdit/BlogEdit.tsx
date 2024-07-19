import React from 'react';
import BlogEditor from '../BlogEditor/BlogEditor';

const BlogEdit = ({ match }) => (
  <BlogEditor blogId={match.params.id} editBlog={true} />
);

export default BlogEdit;
