import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import MessageService from "../services/message.service";
import MessageCard from "./MessageCard";
import SendMessage from "./SendMessage";

const Chat = () => {
  
  const dispatch = useDispatch();
  
  const { user: currentUser } = useSelector((state) => state.auth);

  const [start, setStart] = useState(0);
  const [messages, setMessages] = useState([]);

  const limit = 10;


  useEffect(() => {
    console.log("current list: ",messages);
    if(messages.length<=0){
      MessageService.getMessages(start,limit).then(
        (response) => {
          const messages = response.data.messages;
          if(messages.length>0){
            setStart(messages[messages.length - 1].id);
            setMessages(messages);
          }

        },
        (error) => {
          const _messages =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
            setMessages([]);
        }
      );
    }
  }, [messages]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <SendMessage />
      {
          messages.map((message,i) => {
            console.log("display: ",message)
            return <MessageCard message={message} update={setMessages} messagesList={messages}/> 
          })
      }
    </div>
  );
};

export default Chat;
