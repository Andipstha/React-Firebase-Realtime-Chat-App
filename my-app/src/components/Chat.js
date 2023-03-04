import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import { async } from "@firebase/util";
import {auth, db} from  "../firebase-config"
import "../styles/Chat.css";
export const Chat = (props) => {

    const {room} = props;
    
    const [newMessage, setNewMessage] = useState("");

    const messagesRef = collection(db, "messages");

    const handleSubmit = async (e) => {

        e.preventDefault();
        if(newMessage === "") return;
            
        await addDoc(messagesRef, {
            text: newMessage,
            createAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room,
        });
        
        setNewMessage("");

    };

    return (
        <div className = "chat-app">
            <form onSubmit={handleSubmit} className="new-message-from">
                <input 
                    className="new-message-input" 
                    placeholder="Type your message here.. "
                    onChange={(e) => setNewMessage(e.target.value)} 
                    value={newMessage}
                />
                <button type="submit" className="send-button">
                    Send
                </button>
            </form>
        </div>
    );
};