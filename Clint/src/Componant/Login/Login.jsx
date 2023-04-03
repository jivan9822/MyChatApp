import classes from './login.module.css';

import React, { useState } from 'react';

function Login(props) {
  const [username, setUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onGetName(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
