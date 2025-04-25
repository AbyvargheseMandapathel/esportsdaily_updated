import React, { useState, useEffect } from 'react';
import { FaUser, FaReply, FaThumbsUp } from 'react-icons/fa';

function CommentSection({ postId, commentCount: initialCommentCount }) {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "GamerPro99",
      avatar: "https://placehold.co/100x100/3b0764/e9d5ff?text=GP",
      content: "Team Liquid's coordination was absolutely insane in this tournament. The way they executed their strategies was a masterclass in teamwork.",
      date: "2 hours ago",
      likes: 24,
      postId: postId,
      replies: [
        {
          id: 101,
          author: "EsportsFan",
          avatar: "https://placehold.co/100x100/3b0764/e9d5ff?text=EF",
          content: "Agreed! Their support players deserve special recognition too. The vision control was on another level.",
          date: "1 hour ago",
          likes: 8
        }
      ]
    },
    {
      id: 2,
      author: "StrategyMaster",
      avatar: "https://placehold.co/100x100/3b0764/e9d5ff?text=SM",
      content: "The meta has shifted so much since the last tournament. It's interesting to see how teams are adapting their drafts.",
      date: "3 hours ago",
      likes: 15,
      postId: postId,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');
  const [totalComments, setTotalComments] = useState(0);

  // Calculate total comments including replies
  useEffect(() => {
    const calculateTotalComments = () => {
      const mainComments = comments.length;
      const replies = comments.reduce((total, comment) => total + (comment.replies?.length || 0), 0);
      return mainComments + replies;
    };

    const total = calculateTotalComments();
    setTotalComments(total);

    // In a real app, you might want to update the comment count on the server
    if (postId) {
      console.log(`Updated comment count for post ${postId}: ${total}`);
      // Example API call that would be used in a real application:
      // updateCommentCount(postId, total);
    }
  }, [comments, postId]);

  // Handle comment submission
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      author: "You",
      avatar: "https://placehold.co/100x100/3b0764/e9d5ff?text=You",
      content: newComment,
      date: "Just now",
      likes: 0,
      postId: postId, // Store the postId with the comment
      replies: []
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
  };

  // Handle reply submission
  const handleSubmitReply = (commentId) => {
    if (!replyContent.trim()) return;
    
    const reply = {
      id: Date.now(),
      author: "You",
      avatar: "https://placehold.co/100x100/3b0764/e9d5ff?text=You",
      content: replyContent,
      date: "Just now",
      likes: 0,
      commentId: commentId // Store the parent commentId with the reply
    };
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    setReplyContent('');
    setReplyingTo(null);
  };

  // Handle like functionality
  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.likes + 1
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  // Handle like for replies
  const handleLikeReply = (commentId, replyId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        const updatedReplies = comment.replies.map(reply => {
          if (reply.id === replyId) {
            return {
              ...reply,
              likes: reply.likes + 1
            };
          }
          return reply;
        });
        
        return {
          ...comment,
          replies: updatedReplies
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-6">
        Comments ({initialCommentCount !== undefined ? initialCommentCount : totalComments})
      </h3>
      
      {/* Comment form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-purple-700 flex items-center justify-center">
              <FaUser className="text-white" />
            </div>
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Join the discussion..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none"
              rows="3"
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Comments list */}
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="border-b border-gray-700 pb-6 last:border-0">
            <div className="flex items-start space-x-4">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full" />
              <div className="flex-grow">
                <div className="flex items-center mb-1">
                  <h4 className="font-medium text-white mr-2">{comment.author}</h4>
                  <span className="text-xs text-gray-400">{comment.date}</span>
                </div>
                <p className="text-gray-300 mb-3">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button 
                    className="flex items-center text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    <FaReply className="mr-1" />
                    Reply
                  </button>
                  <button 
                    className="flex items-center text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <FaThumbsUp className="mr-1" />
                    Like ({comment.likes})
                  </button>
                </div>
                
                {/* Reply form */}
                {replyingTo === comment.id && (
                  <div className="mt-4 ml-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center">
                        <FaUser className="text-white text-xs" />
                      </div>
                      <div className="flex-grow">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder={`Reply to ${comment.author}...`}
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 resize-none text-sm"
                          rows="2"
                        ></textarea>
                        <div className="mt-2 flex justify-end space-x-2">
                          <button
                            type="button"
                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
                            onClick={() => setReplyingTo(null)}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-all duration-200"
                            onClick={() => handleSubmitReply(comment.id)}
                            disabled={!replyContent.trim()}
                          >
                            Post Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 ml-6 space-y-4">
                    {comment.replies.map(reply => (
                      <div key={reply.id} className="flex items-start space-x-3">
                        <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full" />
                        <div>
                          <div className="flex items-center mb-1">
                            <h5 className="font-medium text-white text-sm mr-2">{reply.author}</h5>
                            <span className="text-xs text-gray-400">{reply.date}</span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{reply.content}</p>
                          <button 
                            className="flex items-center text-gray-400 hover:text-purple-400 text-xs transition-colors duration-200"
                            onClick={() => handleLikeReply(comment.id, reply.id)}
                          >
                            <FaThumbsUp className="mr-1" />
                            Like ({reply.likes})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;