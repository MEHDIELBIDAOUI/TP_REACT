import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../../api/axios';

export default function LoginBS() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
    try {
      const { data: users } = await api.get(`/users?email=${email}`);
      if (users.length === 0 || users[0].password !== password) {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Email ou mot de passe incorrect' });
        return;
      }
      const { password: _, ...user } = users[0];
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Erreur serveur' });
    }
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height:'100vh', backgroundColor:'#f0f0f0' }} fluid>
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Card.Body className="p-4 d-flex flex-column gap-3">
          <Card.Title className="text-center fw-bold fs-3" style={{ color:'#1B8C3E' }}>TaskFlow</Card.Title>
          <Card.Text className="text-center text-muted">Connectez-vous pour continuer</Card.Text>
          
          {state.error && <Alert variant="danger">{state.error}</Alert>}
          
          <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} required />
            </Form.Group>
            
            <Button type="submit" className="w-100" style={{ backgroundColor:'#1B8C3E', borderColor:'#1B8C3E' }} disabled={state.loading}>
              {state.loading ? 'Connexion...' : 'Se connecter'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
