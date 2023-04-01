import io from 'socket.io-client';
import './App.css';
import { useEffect, useState } from 'react';

const socket = io.connect('http://localhost:3000');

const App = () => {
  const [msg, setMsg] = useState('');
  const [showMsg, setShowMsg] = useState([]);
  const onSendMsgClick = (event) => {
    socket.emit('chat', msg);
  };
  useEffect(() => {
    socket.on('receiveMsg', (msg) => {
      setShowMsg((old) => [msg, ...old]);
    });
  }, [socket]);
  return (
    <div>
      <input type='text' onChange={(e) => setMsg(e.target.value)} />
      <button onClick={onSendMsgClick}>Send Msg</button>
      <ul>
        {showMsg.map((each, ind) => (
          <li key={ind}>{each}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;
