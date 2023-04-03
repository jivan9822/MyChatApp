import io from 'socket.io-client';
import classes from './message.module.css';
import { useEffect, useState } from 'react';

// const socket = io.connect('http://localhost:3000');
const socket = io.connect('https://mychatapp-9e7l.onrender.com');

const MessageDisplay = (props) => {
  const welComeMsg = props.user && `Welcome - ${props.user}`;
  const [msg, setMsg] = useState('');
  const [container, setContainer] = useState(null);
  const [id, setId] = useState();
  const [roomNo, setRoomNo] = useState();
  const [showMsg, setShowMsg] = useState([]);
  const onSendMsgClick = (event) => {
    socket.emit('chat', { msg, user: props.user, id, roomNo });
    setMsg('');
  };
  const onSendMsgEnter = (event) => {
    if (event.key === 'Enter') {
      socket.emit('chat', { msg, user: props.user, id, roomNo });
      setMsg('');
    }
  };
  const onJOinRoom = (event) => {
    socket.emit('Join', roomNo);
  };
  useEffect(() => {
    socket.on('receiveMsg', (msg) => {
      setShowMsg((old) => [...old, msg]);
      container.scrollTop = container.scrollHeight;
    });
  }, [socket]);
  console.log(showMsg);
  return (
    <div className={classes.mainDiv}>
      <div className={classes.messageDiv} ref={(node) => setContainer(node)}>
        <h2>{welComeMsg}</h2>
        <p>YourId: {socket.id}</p>
        <ul>
          {showMsg.map((each, ind) => (
            <li key={ind}>{`${each.user}- ${each.msg}`}</li>
          ))}
        </ul>
      </div>
      <div className={classes.sendMsgDiv}>
        <div className={classes.mainMsgSend}>
          <input
            type='text'
            style={{ width: '96%', height: '50px', fontSize: '24px' }}
            className={classes.msgInput}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onKeyDown={onSendMsgEnter}
            placeholder='Type message here!'
          />
          <button className={classes.btn} onClick={onSendMsgClick}>
            Send
          </button>
        </div>
        <div className={classes.joinDiv}>
          <input
            type='text'
            style={{ width: '150px' }}
            placeholder='PrivateMsgId'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <div>
            <input
              type='text'
              style={{ width: '150px' }}
              placeholder='Room No'
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
            />
            <button onClick={onJOinRoom}>Join</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MessageDisplay;
