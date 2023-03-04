import { useEffect, useState } from "react";
import {auth, db} from  "../firebase-config"
import { 
    collection, 
    addDoc, 
    where, 
    serverTimestamp, 
    onSnapshot, 
    query, 
    orderBy 
} from "firebase/firestore";
import "../styles/Chat.css";


export const Chat = ({ room }) => {

    // const { room } = props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, 
            where("room", "==", room),
            orderBy("createdAt")
        );

        const unsuscribe = onSnapshot(queryMessages, (snapshot) => { 
            let messages = [];
            snapshot.forEach((doc) =>{
                messages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(messages);
        });

        return() => unsuscribe();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(newMessage === "") return;
            
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        
        setNewMessage("");

    };

    return (
        <div className = "chat-app">
            <div className="header">
                <h1>Welcomt to: {room.toUpperCase()}</h1>
            </div>
            <div className="messages"> 
                {messages.map((message) => (
                <div className="message" key={message.id}>
                    <span className="user">{message.user}</span>
                    {message.text}
                </div>
                ))} 
            </div>
            <form onSubmit={handleSubmit} className="new-message-from">
                <input 
                    className="new-message-input" 
                    placeholder="Type your message here.. "                        onChange={(e) => setNewMessage(e.target.value)} 
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};