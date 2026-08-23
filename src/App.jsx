import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hello')
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Backend se connect nahi ho paya');
      });
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + Node.js App</h1>
      <p>Backend se message: <strong>{message}</strong></p>
    </div>
  );
}

export default App;