import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';
import UserCard from './components/UserCard';

interface User {
  id: number;
  username: string;
  email: string;
  bio: string;
}

const ExplorePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`http://localhost:3001/webmob/users/${searchQuery}`);
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3001/webmob/users');
      setUsers(response.data);
    } catch (err) {
      setError('Erro ao buscar todos os usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <Container className="mt-5">
      <h1>Explorar Usuários</h1>

      <Form onSubmit={handleSearch} className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Digite o nome de usuário para buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">Buscar</Button>
        <Button variant="secondary" onClick={fetchAllUsers} className="mt-2 ml-2">Buscar Todos</Button>
      </Form>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      {users.map((user) => (
        <UserCard 
          key={user.id}
          id={user.id}
          username={user.username}
          email={user.email}
          bio={user.bio}
        />
      ))}
    </Container>
  );
};

export default ExplorePage;
