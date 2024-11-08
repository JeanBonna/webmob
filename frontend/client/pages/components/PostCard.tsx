import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PostCardProps {
  username: string;
  userId: string;
  content: string;
  initialLikes: number;
  postId: number; 
}

const PostCard: React.FC<PostCardProps> = ({ username, userId, content, postId }) => {
  const [likes, setLikes] = useState(0);
  //const [liked, setLiked] = useState(false);


  const fetchLikes = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/webmob/countlikes/${postId}`); 
      if (response.status === 200) {
        setLikes(response.data.likesCount); 
      }
    } catch (error) {
      console.error("Erro ao buscar a contagem de likes:", error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [postId]);



  const handleLike = async () => {
    try {
      const userId = localStorage.getItem("userId"); 
      if (!userId) throw new Error("Usuário não autenticado.");
      console.log(postId);
      console.log(userId)

      const response = await axios.post('http://localhost:3001/webmob/like', { postId, userId });
      if (response.status === 201) {
        setLikes(likes + 1);
        //setLiked(true);
      } else if (response.status === 204) {
        setLikes(likes - 1);
        //setLiked(false);
      }
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <a href={`/perfil/${userId}`} style={styles.username}>
          {username}
        </a>
      </div>
      <p style={styles.content}>{content}</p>
      <div style={styles.footer}>
        <button onClick={handleLike} style={styles.likeButton}>
          {"👍 Curtir"}
        </button>
        <span style={styles.likesCount}>{likes}</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    maxWidth: '400px',
    margin: '16px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '8px',
  },
  username: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0070f3',
    textDecoration: 'underline',
  },
  content: {
    fontSize: '14px',
    margin: '8px 0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  likeButton: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  likesCount: {
    fontSize: '14px',
  },
};

export default PostCard;
