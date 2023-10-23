// require('dotenv').config();
import React, { useState } from "react";

import "./Chatbot.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Card from "../../lib/Card/Card";
const API_KEY = import.meta.env.VITE_API_LINK ;
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    import.meta.env.VITE_CONTENT
};
import Admin from "../../assets/admin_avatar.png";
import User from "../../assets/user_avatar.png";

const Chatbot = () => {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const [messages, setMessages] = useState([
    {
      message: "Hello, I'm VED! Ask me anything!",
      sentTime: currentTime,
      sender: "VED",
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
      sentTime: currentTime,
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);


    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            sentTime: currentTime,
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div style={{ display: " flex", justifyContent: "center" }}>
      <div style={{ position: "relative", height: "90vh", width: "100%" }}>
        <MainContainer style={{ width: "100%" }}>
          <ChatContainer style={{ width: "70%" }}>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              <Card>
                <h5 className="card-heading">Getting Started</h5>
                <div className="card-inner-flex">
                  <img src={Admin} alt="" />
                  <div className="getting-started-content">
                    What is the mantra of healthy life. | What is the remedy for
                    fever. | How can I treat Headache.
                  </div>
                </div>
              </Card>
              {messages.map((message, i) => {
                console.log(message);
                return (
                  <div key={i} className="message-container">
                    {message.sender === "user" ? (
                      <div className="user">
                        <img src={User} alt="User Avatar" className="avatar" />
                        <div className="name-time">
                          <div className="sender">Gautam singla</div>
                          <div className="current-time">{message.sentTime}</div>
                        </div>
                      </div>
                    ) : (
                      <div className={`bot ${message.sender}`}>
                        <img src={Admin} alt="Bot Avatar" className="avatar" />
                        <div className="name-time">
                          <div className="sender">Bot</div>
                          <div className="current-time">{message.sentTime}</div>
                        </div>
                      </div>
                    )}
                    <Message model={message}></Message>
                  </div>
                );
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Chatbot;
