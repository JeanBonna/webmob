import React, { useState } from 'react';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button, Form, Container } from 'react-bootstrap';

function TabBootStrap() {
  const [userId, setUserId] = useState<string>('');
  const [postId, setPostId] = useState<string>('');
  const [deleteUserMessage, setDeleteUserMessage] = useState<string | null>(null);
  const [deletePostMessage, setDeletePostMessage] = useState<string | null>(null);

  // Função para deletar um usuário pelo ID
  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/webmob/user/${userId}`);
      if (response.status === 204) {
        setDeleteUserMessage('Usuário deletado com sucesso.');
      } else {
        setDeleteUserMessage('Erro ao deletar o usuário.');
      }
    } catch (error) {
      setDeleteUserMessage('Erro ao deletar o usuário.');
      console.error(error);
    }
  };

  // Função para deletar um post pelo ID
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/webmob/post/${postId}`);
      if (response.status === 204) {
        setDeletePostMessage('Post deletado com sucesso.');
      } else {
        setDeletePostMessage('Erro ao deletar o post.');
      }
    } catch (error) {
      setDeletePostMessage('Erro ao deletar o post.');
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
      <Tabs defaultActiveKey="deleteUser" id="tab-bootstrap-example" className="mb-3">
        <Tab eventKey="deleteUser" title="Deletar Usuário">
          <Form>
            <Form.Group controlId="deleteUserId" className="mb-3">
              <Form.Label>Digite o ID do usuário para deletar:</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID do usuário"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleDeleteUser}>
              Deletar Usuário
            </Button>
            {deleteUserMessage && <p className="mt-3">{deleteUserMessage}</p>}
          </Form>
        </Tab>
        <Tab eventKey="deletePost" title="Deletar Post">
          <Form>
            <Form.Group controlId="deletePostId" className="mb-3">
              <Form.Label>Digite o ID do post para deletar:</Form.Label>
              <Form.Control
                type="text"
                placeholder="ID do post"
                value={postId}
                onChange={(e) => setPostId(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleDeletePost}>
              Deletar Post
            </Button>
            {deletePostMessage && <p className="mt-3">{deletePostMessage}</p>}
          </Form>
        </Tab>
        <Tab eventKey="info" title="Informações">
          <p>Esta aba contém informações adicionais sobre o sistema.</p>
        </Tab>
        <Tab eventKey="settings" title="Configurações">
          <p>Aqui você pode ajustar as configurações da aplicação.</p>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default TabBootStrap;
