import React, { useState } from "react";
import { Chat } from "./components/Chat";
import { Auth } from "./components/Auth";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase-config";
import './App.css';

const cookies = new Cookies();

function ChatApp() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(null);
  const [room, setRoom] = useState("");

  // const [room, setRoom] = useState(null);
  // const roomInputRef = useRef(null);

  // const signUserOut = async () => {
  //   await signOut(auth);
  //   cookies.remove("auth-token");
  //   setIsAuth(false);
  //   setRoom(null);
  // };

  if(!isAuth){
    return (
      <AppWrapper
      isAuth={isAuth}
      setIsAuth={setIsAuth}
      setIsInChat={setIsInChat}
    >
      <Auth setIsAuth={setIsAuth} />
    </AppWrapper>
    );
  }

  return( 
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="room">
          <label> Type room name: </label>
          <input className="search-room" onChange={(e) => setRoom(e.target.value)} />
          <button className="button"
            onClick={() => {
              setIsInChat(true);
            }}
          >
            Enter Chat  ❯
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default ChatApp;
