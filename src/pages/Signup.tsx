import React, { useState } from 'react';
import Helmet from '../components/Helmet/helmet';
import { Container, Row, Col, Form, FormGroup, Input, Button, Label } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase.config';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Signup: React.FC = () => {
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });

      setLoading(false);
      toast.success('Account created successfully');
      navigate('/hospital');
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });

      toast.success('Signed up with Google successfully');
      navigate('/hospital');
    } catch (error) {
      toast.error('Failed to sign up with Google');
    }
  };

  const signUpWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
      });

      toast.success('Signed up with Facebook successfully');
      navigate('/hospital');
    } catch (error) {
      toast.error('Failed to sign up with Facebook');
    }
  };

  return (
    <Helmet title="Sign Up">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5 className="fw-bold">Loading...</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Sign Up</h3>

                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <Label className="log-text" for="text">Create a Username</Label>
                    <Input
                      type="text"
                      placeholder="Enter a Username"
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Label className="log-text" for="email">Enter your Email</Label>
                    <Input
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <FormGroup className="form__group">
                    <Label className="log-text" for="password">Create a password</Label>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>

                  <Button type="submit" className="auth__btn">
                    Create an Account
                  </Button>

                  <Button
                    className="google-btn"
                    onClick={signUpWithGoogle}
                  >
                    <i className="ri-google-line"></i> Sign Up with Google
                  </Button>

                  <Button
                    className="facebook-btn"
                    onClick={signUpWithFacebook}
                  >
                    <i className="ri-facebook-fill"></i> Sign Up with Facebook
                  </Button>

                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Signup;
