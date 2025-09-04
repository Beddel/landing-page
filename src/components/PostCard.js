import React from "react";

const PostCard = ({ post, index }) => {
  const fallbackImage =
    index % 2 === 0
      ? `${process.env.PUBLIC_URL}/fallback1.jpg`
      : `${process.env.PUBLIC_URL}/fallback2.jpg`;

  return (
    <div className="post-card">
      <img
        loading="lazy"
        src={post.medium_image?.url || fallbackImage}
        alt={post.title}
      />
      <div className="post-content">
            <small>
                {new Date(post.published_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                })}
            </small>
        <h3 className="post-title">{post.title}</h3>
      </div>
    </div>
  );
};

export default PostCard;
