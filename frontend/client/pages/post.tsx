import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './components/PostCard';
import { Container, Form, Button, Alert } from 'react-bootstrap';


interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
}

const PostsPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/webmob/posts');
      setPosts(response.data);
    } catch (err) {
      setError('Erro ao carregar os posts');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    try {
      const userId = localStorage.getItem("userId"); 
      if (!userId) {
        setError("Usuário não autenticado.");
        return;
      }
      console.log(userId);
      const response = await axios.post('http://localhost:3001/webmob/post', {
        content: newPostContent,
        userId: parseInt(userId),
      });
      
      if (response.status === 201) {
        setNewPostContent(''); 
      }
    } catch (err) {
      setError('Erro ao criar o post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <Container className="mt-5 p-5">Carregando...</Container>;
  }

  if (error) {
    return <Container className="mt-5 p-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-5 p-5">
      <h1>Feed</h1>
      
      <Form className="mb-4">
        <Form.Group controlId="newPostContent">
          <Form.Control 
            as="textarea"
            rows={3}
            className='myPlaceHolder' placeholder="Escreva algo..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            style={{backgroundColor:"white", borderRadius: '8px'}}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleCreatePost} className="mt-2">
          Postar
        </Button>
      </Form>

      <div>
        {posts.map((post) => (
          <PostCard 
            key={post.id}
            username={post.user.username}
            userId={post.user.id.toString()}
            content={post.content}
            initialLikes={0}
            postId={post.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default PostsPage;
