import { useEffect, useState } from 'react';
import MessageDisplay from './Componant/MessageDisplay/MessageDisplay';
import Login from './Componant/Login/Login';

const App = () => {
  const [userName, setUserName] = useState();
  const [login, SetLogin] = useState(true);

  const getUserName = (name) => {
    setUserName(name);
    SetLogin(false);
  };
  return (
    <div>
      {login ? (
        <Login onGetName={getUserName} />
      ) : (
        <MessageDisplay user={userName} />
      )}
    </div>
  );
};
export default App;
