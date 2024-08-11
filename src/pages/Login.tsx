// src/components/Login.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase.config";
import { toast } from 'react-toastify';
import "../styles/login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in both fields');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      toast.success('Successfully logged in');
      navigate('/hospital');
    } catch (error) {
      const errorCode = (error as any).code;
      let errorMessage = 'An error occurred. Please try again later.';
      
      switch (errorCode) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        default:
          errorMessage = 'An unexpected error occurred.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <Container>
        <Row>
          {loading ? (
            <Col lg='12' className='text-center'>
              <h5 className='fw-bold'>Loading...</h5>
            </Col>
          ) : (
            <Col lg="6" className='m-auto text-center'>
              <h3 className="fw-bold mb-4">Login</h3>
              
              <Form className='auth__form' onSubmit={signIn}>
                <FormGroup className='form__group'>
                  <Label for="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder='Enter your Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  <Label for="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder='Enter your Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type='submit' className="auth__btn">
                  Login
                </Button>
                <p>Don't have an account? <Link to='/signup'>Create one here</Link></p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Login;