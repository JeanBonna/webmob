import React from 'react';

interface UserCardProps {
  id: number;
  username: string;
  email: string;
  bio: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, username, email, bio }) => {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <a href={`/perfil/${id}`} style={styles.username}>
          {username}
        </a>
      </div>
      <p style={styles.email}>Email: {email}</p>
      <p style={styles.bio}>Bio: {bio}</p>
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
  email: {
    fontSize: '14px',
    color: '#555',
  },
  bio: {
    fontSize: '14px',
    color: '#777',
  },
};

export default UserCard;
