import { useState } from 'react';
import api from '../api/axios';

function Register({ onRegister, onGoToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        name: name,
        email: email,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem('token', token);
      onRegister(token);

    } catch (err) {
      setError('Something went wrong, please try again!');
    }
  };

  return (
    <div className="container px-4" style={{ paddingTop: '2rem' }}>
      <div className="rr-card" style={{ maxWidth: '520px', margin: '0 auto' }}>

        <h1 className="title is-4 mb-2" style={{ fontWeight: 800 }}>
          Create Account
        </h1>

        <div className="mb-4">
          <label className="settings-label">Full Name</label>
          <input
            className="settings-input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="settings-label">Email</label>
          <input
            className="settings-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="settings-label">Password</label>
          <input
            className="settings-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
        )}

        <button className="button rr-btn-green is-fullwidth" onClick={handleRegister}>
          Register
        </button>

        <p className="has-text-centered mt-4" style={{ color: '#757575' }}>
          Already have an account?{' '}
          <span
            style={{ color: 'var(--primary-green)', cursor: 'pointer', fontWeight: 600 }}
            onClick={onGoToLogin}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;