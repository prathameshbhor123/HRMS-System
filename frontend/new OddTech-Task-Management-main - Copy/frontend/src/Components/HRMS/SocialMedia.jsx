
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SocialMedia = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [activeNoteFilter, setActiveNoteFilter] = useState('all');
  const [posts, setPosts] = useState([]);
  const [notes, setNotes] = useState([]);
  const [issues, setIssues] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newIssue, setNewIssue] = useState('');
  const [newComment, setNewComment] = useState('');
  const [commentingOnPost, setCommentingOnPost] = useState(null);
  const [userRole, setUserRole] = useState('admin');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {



    fetchNotes(); // Fetch notes on component mount
    fetchIssues(); // Fetch issues on component mount
    fetchPosts(); // Fetch posts on component mount
    fetchComments(); // Fetch comments on component mount
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPost = async () => {
    if (newPost.trim() === '' && !selectedImage) return;

    const formData = new FormData();
    formData.append('content', newPost);
    formData.append('author', userRole === 'admin' ? 'Admin' : 'Employee');
    formData.append('image', selectedImage); // optional image

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/post/createpost', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // FormData sends text + file together
      });

      if (!response.ok) throw new Error('Post upload failed');

      const data = await response.json();

      const post = {
        id: data.id || data.postId, // Ensure id is set correctly
        content: data.content,
        author: data.userName,
        likes: data.likes,
        timestamp: 'Just now',
        imageUrl: data.imageUrl,
        comments: []
      };
      setPosts(prevPosts => [post, ...(prevPosts || [])]);
      setNewPost('');
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/post/allpostbydesc', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();

      const mappedPosts = Array.isArray(data)
        ? data.map(post => ({
          id: post.id || post.postId, // Ensure id is set correctly
          content: post.content,
          author: post.userName,
          likes: post.likes || 0,
          timestamp: post.createdAt || 'Just now',
          imageUrl: post.imageUrl,
          comments: post.comments || []
        }))
        : [];

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // fallback
    }
  };



  const likePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`http://localhost:8080/api/post/like/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || "Failed to like post");
      }

      const updatedPost = await response.json();

      setPosts(prev =>
        prev.map(p =>
          p.id === updatedPost.postId
            ? {
              ...p,
              likes: updatedPost.likes,
            }
            : p
        )
      );

    } catch (err) {
      alert(err.message || "Already liked this post");
      console.error("Like error:", err);
    }
  };









  const handleAddNote = async (e) => {
    e.preventDefault();

    if (newNote.trim() === '') return;

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // Or get it from props/context/state

    if (!token || !user?.id) {
      alert("User not authenticated.");
      return;
    }

    const payload = {
      content: newNote,
      // similar to your leave payload
    };

    try {

      const response = await fetch("http://localhost:8080/api/note/createnote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();

        setNotes(prev => [
          {
            id: data.noteId,
            content: data.content,
            author: data.userName,
            timestamp: 'Just now'
          },
          ...prev
        ]);



        setNewNote('');
        alert("Note added successfully!");
      } else {
        alert("Failed to create note: " + response.status);
      }
    } catch (error) {
      console.error("Error creating note:", error);
      alert("Failed to create note. Check console.");
    }
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://localhost:8080/api/note/allnotes", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        const mappedNotes = data.map((note) => ({
          id: note.noteId || note.id,
          content: note.content,
          author: note.userName || 'Unknown',
          timestamp: 'Just now' // or format from note.createdAt
        }));

        setNotes(mappedNotes);
      } else {
        console.error("Failed to fetch notes:", response.status);
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };





  const handleAddIssue = async () => {
    if (newIssue.trim() === '') return;

    const token = localStorage.getItem('token');
    const issueDTO = {
      content: newIssue,
    };

    try {
      const response = await fetch('http://localhost:8080/api/issue/createissue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(issueDTO)
      });

      if (!response.ok) {
        throw new Error('Failed to create issue');
      }

      const data = await response.json();

      setIssues(prev => [
        {
          id: data.id,
          content: data.content,
          author: data.userName,
          status: data.status || 'open',
          timestamp: 'Just now'
        },
        ...prev
      ]);

      setNewIssue('');
    } catch (error) {
      console.error('Error creating issue:', error.message);
    }
  };


  const fetchIssues = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch("http://localhost:8080/api/issue/allissues", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();

        const mappedIssues = data.map((issue) => ({
          id: issue.id,
          content: issue.content,
          author: issue.userName || 'Unknown', // Adjust based on your DTO
          status: issue.status || 'open',
          timestamp: 'Just now' // Or use a formatter if `createdAt` is present
        }));

        setIssues(mappedIssues);
      } else {
        console.error("Failed to fetch issues:", response.status);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };


  const handleAddComment = async (postId) => {
    if (newComment.trim() === '') return;

    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:8080/api/postcomment/createcomment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          postId: postId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const savedComment = await response.json();

      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: savedComment.commentId,
                author: savedComment.userName,
                content: savedComment.content,
                timestamp: 'Just now'
              }
            ]
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setNewComment('');
      setCommentingOnPost(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };



  const fetchComments = async (postId) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`http://localhost:8080/api/postcomment/fetchcomments/${postId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // same as your POST request
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const comments = await response.json();


      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: comments.map(comment => ({
              id: comment.commentId,
              author: comment.userName,
              content: comment.content,
              timestamp: new Date(comment.createdAt).toLocaleString(),
            }))
          };
        }
        return post;
      });

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };



  const filteredNotes = notes.filter(note => {
    if (activeNoteFilter === 'all') return true;
    if (activeNoteFilter === 'admin') return note.author === 'Admin';
    if (activeNoteFilter === 'employee') return note.author !== 'Admin';
    return true;
  });





  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}


      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-6">
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'feed' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => setActiveTab('feed')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Feed
          </button>
          <button
            className={`px-4 py-2 font-medium flex items-center ${activeTab === 'notes' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
            onClick={() => setActiveTab('notes')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notes
          </button>
          {userRole === 'admin' && (
            <button
              className={`px-4 py-2 font-medium flex items-center ${activeTab === 'issues' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'}`}
              onClick={() => setActiveTab('issues')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Report Issue
            </button>
          )}
        </div>

        {/* Feed Tab */}
        <AnimatePresence>
          {activeTab === 'feed' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Left Column - Add Post (Admin only) */}
              {userRole === 'admin' && (
                <div className="md:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Create Post
                    </h2>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      placeholder="What's new?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    ></textarea>

                    {/* Image Upload */}
                    <div className="mb-4">
                      {imagePreview && (
                        <div className="relative mb-3">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => {
                              setSelectedImage(null);
                              setImagePreview(null);
                              if (fileInputRef.current) {
                                fileInputRef.current.value = '';
                              }
                            }}
                            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                      <label className="flex items-center justify-center w-full px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{imagePreview ? 'Change Image' : 'Add Image'}</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    <button
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition w-full flex items-center justify-center"
                      onClick={handleAddPost}
                      disabled={newPost.trim() === '' && !selectedImage}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      Post
                    </button>
                  </motion.div>
                </div>
              )}

              {/* Right Column - Posts */}
              <div className={`${userRole === 'admin' ? 'md:col-span-2' : 'md:col-span-3'}`}>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Recent Posts
                </h2>
                {posts?.length === 0 ? (
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500">No posts yet. Be the first to share something!</p>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {Array.isArray(posts) && posts.map((post) => (
                      <motion.div
                        key={post.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.005 }}
                      >
                        {/* Post Header */}
                        <div className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="bg-blue-100 text-blue-800 rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                                {post.author?.charAt(0)}
                              </div>
                              <div className="ml-3">
                                <h3 className="font-semibold">{post.author}</h3>
                                <span className="text-gray-500 text-sm">{post.timestamp}</span>
                              </div>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                              </svg>
                            </button>
                          </div>
                          <p className="mb-3 text-gray-800">{post.content}</p>
                        </div>

                        {/* Post Image */}
                        {post.imageUrl && (
                          <div className="border-t border-b border-gray-200">
                            <img
                              src={`http://localhost:8080${post.imageUrl}`}
                              alt="Post"
                              className="w-full h-64 md:h-96 object-cover"
                            />
                          </div>
                        )}


                        {/* Post Actions */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <button
                              className="flex items-center text-gray-500 hover:text-blue-600 transition"
                              onClick={() => likePost(post._id || post.id || post.postId)}

                            >
                              <motion.span
                                className="mr-1"
                                whileTap={{ scale: 1.5 }}
                              >
                                {post.likes > 0 ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                  </svg>
                                ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                  </svg>
                                )}
                              </motion.span>
                              <span>{post.likes}</span>
                            </button>

                            <button
                              className="flex items-center text-gray-500 hover:text-blue-600 transition"

                              onClick={() => setCommentingOnPost(commentingOnPost === post.id ? null : post.id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                              </svg>
                              <span>{post.comments?.length || 0}</span>
                            </button>

                            {/* Share button */}
                            <button className="flex items-center text-gray-500 hover:text-blue-600 transition">
                              {/* Share icon */}
                            </button>
                          </div>
                        </div>

                        {/* Comments Section - Only shown when commentingOnPost matches this post's id */}
                        {commentingOnPost === post.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 bg-gray-50"
                          >
                            {/* Existing Comments */}
                            {post.comments?.length > 0 && (
                              <div className="mb-4 space-y-3">
                                {post.comments.map(comment => (
                                  <div key={comment.id} className="flex">
                                    <div className="bg-gray-200 text-gray-700 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-2">
                                      {comment.author?.charAt(0)}
                                    </div>
                                    <div className="flex-1 bg-white p-3 rounded-lg shadow-sm">
                                      <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-sm">{comment.author}</span>
                                        <span className="text-gray-500 text-xs">{comment.timestamp}</span>
                                      </div>
                                      <p className="text-gray-700 text-sm">{comment.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Add Comment Input */}
                            <div className="flex items-start">
                              <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-2">
                                {userRole === 'admin' ? 'A' : 'E'}
                              </div>
                              <div className="flex-1 flex">
                                <input
                                  type="text"
                                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                  placeholder="Write a comment..."
                                  value={newComment}
                                  onChange={(e) => setNewComment(e.target.value)}
                                  onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                      handleAddComment(post.id);
                                    }
                                  }}
                                />
                                <button
                                  className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition text-sm disabled:bg-blue-400"
                                  onClick={() => handleAddComment(post.id)}
                                  disabled={!newComment.trim()}
                                >
                                  Post
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Tab */}
        <AnimatePresence>
          {activeTab === 'notes' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Left Column - Add Note */}
              <div className="md:col-span-1">
                <motion.div
                  className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
                  whileHover={{ scale: 1.01 }}
                >
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Note as {userRole === 'admin' ? 'Admin' : 'Employee'}
                  </h2>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="4"
                    placeholder={`Write a note as ${userRole === 'admin' ? 'admin' : 'employee'}...`}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  ></textarea>
                  <button
                    className={`${userRole === 'admin'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                      : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700'
                      } text-white px-4 py-2 rounded-lg transition w-full flex items-center justify-center`}
                    onClick={handleAddNote}
                    disabled={newNote.trim() === ''}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    Post as {userRole === 'admin' ? 'Admin' : 'Employee'}
                  </button>
                </motion.div>
              </div>

              {/* Right Column - Notes */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Recent Notes
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${activeNoteFilter === 'all'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                      onClick={() => setActiveNoteFilter('all')}
                    >
                      All
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${activeNoteFilter === 'admin'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                      onClick={() => setActiveNoteFilter('admin')}
                    >
                      Admin
                    </button>
                    <button
                      className={`px-3 py-1 rounded-full text-sm ${activeNoteFilter === 'employee'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                      onClick={() => setActiveNoteFilter('employee')}
                    >
                      Employee
                    </button>
                  </div>
                </div>
                {filteredNotes.length === 0 ? (
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-500">
                      {activeNoteFilter === 'all'
                        ? 'No notes yet. Add your first note!'
                        : `No ${activeNoteFilter} notes found.`}
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotes.map((note) => (
                      <motion.div
                        key={note.id}
                        className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${note.author === 'Admin'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-green-500 bg-green-50'
                          }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <div className={`rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3 ${note.author === 'Admin'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                              }`}>
                              {note.author.charAt(0)}
                            </div>

                            <div>
                              <h3 className="font-semibold">{note.author}</h3>
                              <span className={`text-xs ${note.author === 'Admin'
                                ? 'text-blue-600'
                                : 'text-green-600'
                                }`}>
                                {note.author === 'Admin' ? 'Administrator' : 'Employee'}
                              </span>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">{note.timestamp}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                        {note.author === 'Admin' && (
                          <div className="mt-2 flex items-center text-blue-600 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Official Announcement
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Issues Tab (Employee only) */}
        {userRole === 'admin' && (
          <AnimatePresence>
            {activeTab === 'issues' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Left Column - Report Issue */}
                <div className="md:col-span-1">
                  <motion.div
                    className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-200"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h2 className="text-lg font-semibold mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Report Work Issue
                    </h2>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 mb-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="4"
                      placeholder="Describe the issue..."
                      value={newIssue}
                      onChange={(e) => setNewIssue(e.target.value)}
                    ></textarea>
                    <button
                      className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-pink-700 transition w-full flex items-center justify-center"
                      onClick={handleAddIssue}
                      disabled={newIssue.trim() === ''}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Submit Issue
                    </button>
                  </motion.div>
                </div>

                {/* Right Column - Issues */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Your Reported Issues
                  </h2>
                  {issues.length === 0 ? (
                    <motion.div
                      className="bg-white rounded-xl shadow-md p-6 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500">No issues reported yet. Let us know if you need help!</p>
                    </motion.div>
                  ) : (
                    <div className="space-y-4">
                      {issues.map((issue) => (
                        <motion.div
                          key={issue.id}
                          className="bg-white rounded-xl shadow-md p-6"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center">
                              <div className="bg-red-100 text-red-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                                {issue.author.charAt(0)}
                              </div>
                              <h3 className="font-semibold">{issue.author}</h3>
                            </div>
                            <span className="text-gray-500 text-sm">{issue.timestamp}</span>
                          </div>
                          <p className="mb-3 text-gray-700">{issue.content}</p>
                          <div className="flex justify-between items-center">
                            <span className={`text-sm px-3 py-1 rounded-full ${issue.status === 'open' ? 'bg-red-100 text-red-800' :
                              issue.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                              {issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                              View Details
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
};

export default SocialMedia;

