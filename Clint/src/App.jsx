import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
const socket = io.connect('http://localhost:3000');
function App() {
  const [msg, setMsg] = useState('Hello');
  const [displayMsg, setDisplayMsg] = useState([]);
  const onSendMsg = () => {
    socket.emit('chat', { msg });
  };
  useEffect(() => {
    socket.on('receiveMsg', (data) => {
      console.log(data);
      setDisplayMsg((old) => [data.msg, ...old]);
      // setDisplayMsg(data.msg);
    });
  }, [socket]);
  return (
    <div className='App'>
      <input placeholder='Message' onChange={(e) => setMsg(e.target.value)} />
      <button onClick={onSendMsg}>Send</button>
      <div>
        <ul>
          {displayMsg.map((each, ind) => {
            return <li key={ind}>{each}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
