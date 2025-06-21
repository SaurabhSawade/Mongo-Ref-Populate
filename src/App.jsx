import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [userForm, setUserForm] = useState({ name: '', email: '' });
  const [postForm, setPostForm] = useState({ title: '', content: '', user: '' });
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('https://mongo-ref-populate-backend.onrender.com/posts')
      .then(res => setPosts(res.data));

    axios.get('https://mongo-ref-populate-backend.onrender.com/users')
      .then(res => setUsers(res.data));
  }, []);

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://mongo-ref-populate-backend.onrender.com/users', userForm);
    setUsers([...users, res.data]);
    setUserForm({ name: '', email: '' });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://mongo-ref-populate-backend.onrender.com/posts', postForm);
    setPosts([...posts, res.data]);
    setPostForm({ title: '', content: '', user: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">My Post App</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Add User */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add User</h2>
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Name"
                value={userForm.name}
                onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                required
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email"
                value={userForm.email}
                onChange={e => setUserForm({ ...userForm, email: e.target.value })}
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add User
              </button>
            </form>
          </div>

          {/* Add Post */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Post</h2>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Title"
                value={postForm.title}
                onChange={e => setPostForm({ ...postForm, title: e.target.value })}
                required
              />
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Content"
                value={postForm.content}
                onChange={e => setPostForm({ ...postForm, content: e.target.value })}
                required
              />
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={postForm.user}
                onChange={e => setPostForm({ ...postForm, user: e.target.value })}
                required
              >
                <option value="">Select User</option>
                {users.map(user => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add Post
              </button>
            </form>
          </div>
        </div>

        {/* All Posts */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Posts</h2>
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post._id} className="bg-gray-50 p-4 rounded-lg shadow flex flex-col">
              <span className="text-lg font-bold text-blue-700">{post.title}</span>
              <span className="text-sm text-gray-500 mb-2">
                by {post.user?.name || 'Unknown'}
              </span>
              <span className="text-gray-700">{post.content}</span>
            </li>
          ))}
        </ul>
         {/* All Users */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">All Users</h2>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user._id} className="bg-blue-50 p-3 rounded-lg shadow flex flex-col">
              <span className="font-medium text-blue-800">{user.name}</span>
              <span className="text-sm text-gray-600">{user.email}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function App() {
//   const [userForm, setUserForm] = useState({ name: '', email: '' });
//   const [postForm, setPostForm] = useState({ title: '', content: '', user: '' });
//   const [users, setUsers] = useState([]);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:4000/posts')
//       .then(res => setPosts(res.data));

//     axios.get('http://localhost:4000/users')
//       .then(res => setUsers(res.data));
//   }, []);

//   const handleUserSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('http://localhost:4000/users', userForm);
//     setUsers([...users, res.data]);
//     setUserForm({ name: '', email: '' });
//   };

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post('http://localhost:4000/posts', postForm);
//     setPosts([...posts, res.data]);
//     setPostForm({ title: '', content: '', user: '' });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Add User</h2>
//       <form onSubmit={handleUserSubmit}>
//         <input placeholder="Name" value={userForm.name} onChange={e => setUserForm({ ...userForm, name: e.target.value })} />
//         <input placeholder="Email" value={userForm.email} onChange={e => setUserForm({ ...userForm, email: e.target.value })} />
//         <button type="submit">Add User</button>
//       </form>

//       <h2>Add Post</h2>
//       <form onSubmit={handlePostSubmit}>
//         <input placeholder="Title" value={postForm.title} onChange={e => setPostForm({ ...postForm, title: e.target.value })} />
//         <input placeholder="Content" value={postForm.content} onChange={e => setPostForm({ ...postForm, content: e.target.value })} />
//         <select value={postForm.user} onChange={e => setPostForm({ ...postForm, user: e.target.value })}>
//           <option value="">Select User</option>
//           {users.map(user => (
//             <option key={user._id} value={user._id}>{user.name}</option>
//           ))}
//         </select>
//         <button type="submit">Add Post</button>
//       </form>

//       <h2>All Posts</h2>
//       <ul>
//         {posts.map(post => (
//           <li key={post._id}>
//             <strong>{post.title}</strong> by {post.user?.name || 'Unknown'} <br />
//             {post.content}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;