import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  TextField,
  //Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Avatar,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { Send, AccountCircle, SmartToy } from '@mui/icons-material';
import styles from './index.module.scss'; // Import styles

interface Message {
  id: number;
  content: string;
  isUser: boolean;
}

const ChatInterface: React.FC = () => {
  const [prompt, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!prompt.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      content: prompt,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:3002/api/generate', { // Adjust if your backend is different
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
    });


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }


      const data = await response.json();

      const botMessage: Message = {
        id: Date.now(),
        content: data.response,
        isUser: false,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: Date.now(),
        content: 'Failed to get response. Please try again.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3}>
        <Box p={2} bgcolor="#1976d2" color="white">
          <Typography variant="h6">
            Supply Chain Assistant
          </Typography>
        </Box>

        <div className={styles.chatContainer}>
          <List className={styles.messageList}>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                className={message.isUser ? styles.userMessage : styles.botMessage}
              >
                <Avatar sx={{ mr: 2 }}>
                  {message.isUser ? <AccountCircle /> : <SmartToy />}
                </Avatar>
                <ListItemText
                  primary={message.content}
                  sx={{ wordBreak: 'break-word' }}
                />
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </div>

        <div className={styles.inputArea}>
          <TextField
            fullWidth
            variant="outlined"
            value={prompt}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about inventory, shipments, or supply chain issues..."
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={!prompt.trim()}
          >
            <Send />
          </IconButton>
        </div>
      </Paper>
    </Container>
  );
};

export default ChatInterface;
