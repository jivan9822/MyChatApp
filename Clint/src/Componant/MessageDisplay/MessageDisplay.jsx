import io from 'socket.io-client';
import classes from './message.module.css';
import { useEffect, useState } from 'react';

const socket = io.connect('https://mychatapp-9e7l.onrender.com');

const MessageDisplay = (props) => {
  const welComeMsg = props.user && `Welcome - ${props.user}`;
  const [msg, setMsg] = useState('');
  const [id, setId] = useState(null);
  const [roomNo, setRoomNo] = useState(null);
  const [showMsg, setShowMsg] = useState([]);
  const onSendMsgClick = (event) => {
    socket.emit('chat', { msg, user: props.user, id, roomNo });
    setMsg('');
  };
  const onJOinRoom = (event) => {
    socket.emit('Join', roomNo);
  };
  useEffect(() => {
    socket.on('receiveMsg', (msg) => {
      setShowMsg((old) => [...old, msg]);
    });
  }, [socket]);
  console.log(showMsg);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.messageDiv}>
        <h2>{welComeMsg}</h2>
        <p>YourId: {socket.id}</p>
        <ul>
          {showMsg.map((each, ind) => (
            <li key={ind}>{`${each.user}- ${each.msg}`}</li>
          ))}
        </ul>
      </div>
      <div className={classes.sendMsgDiv}>
        <div>
          <input
            type='text'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder='Type message here!'
          />
          <input
            type='text'
            placeholder='PrivateMsgId'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <div>
            <input
              type='text'
              placeholder='Room No'
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />
            <span> </span>
            <button onClick={onJOinRoom}>Join</button>
          </div>
        </div>
        <button className='btn' onClick={onSendMsgClick}>
          Send
        </button>
      </div>
    </div>
  );
};
export default MessageDisplay;
