import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';
import PostCard from '../components/PostCard';
import { useEffect, useState } from 'react';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string;
}

interface Post {
  id: number;
  user: UserProfile;
  content: string;
  likes: number;
}

interface ProfilePageProps {
  user: UserProfile | null;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setCurrentUserId(storedUserId);
  }, []);

  useEffect(() => {
    if (user?.id) {
      fetchPosts();
      checkFollowingStatus();
    }
  }, [user?.id, currentUserId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/webmob/posts/${user?.id}`);
      setPosts(response.data);
    } catch (err) {
      setError('Erro ao carregar os posts');
    } finally {
      setLoading(false);
    }
  };

  const checkFollowingStatus = async () => {
    if (!currentUserId || !user) return;

    try {
      const response = await axios.get(`http://localhost:3001/webmob/follow/${currentUserId}/${user.id}`);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error("Erro ao verificar status de seguimento:", error);
    }
  };

  const handleFollow = async () => {
    if (!currentUserId || !user) return;

    try {
      const response = await axios.post(`http://localhost:3001/webmob/follow`, {
        followerId: currentUserId,
        followedId: user.id,
      });

      if (response.status === 201) {
        setIsFollowing(true);
      } else if (response.status === 204) {
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Erro ao atualizar status de seguimento:", error);
    }
  };

  if (!user) {
    return <p>Usuário não encontrado.</p>;
  }

  if (loading) {
    return <p>Carregando posts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5 p-5" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Perfil de {user.username}</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio}</p>

      {user.id.toString() !== currentUserId && isFollowing !== null && (
        <Button variant="primary" onClick={handleFollow} className="mb-4">
          {isFollowing ? "Deixar de seguir" : "Seguir"}
        </Button>
      )}

      <h1>Todos os Posts de {user.username}</h1>
      <div>
        {posts.map((post) => (
          <PostCard 
            key={post.id}
            username={post.user.username}
            userId={post.user.id.toString()}
            content={post.content}
            initialLikes={post.likes}
            postId={post.id}
          />
        ))}
      </div>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await axios.get(`http://localhost:3001/webmob/user/${id}`);
    const user = response.data;

    return {
      props: {
        user,
      },
    };
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return {
      props: {
        user: null,
      },
    };
  }
};

export default ProfilePage;
