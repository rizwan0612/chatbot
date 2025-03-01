import { useState, useEffect, useRef } from 'react';
import { Avatar, Box, TextField, List, ListItem, ListItemText, Paper, IconButton, Typography } from '@mui/material';
import { Delete, Palette, History, Send, AccountCircle, SmartToy } from '@mui/icons-material';
import styles from './index.module.scss'; // Import styles

interface Message {
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface SavedSession {
  id: string;
  name: string;
  messages: Message[];
  createdAt: number;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<SavedSession[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [sessionId] = useState(() => {
    const savedSessionId = localStorage.getItem('currentSessionId') ||
      Math.random().toString(36).substr(2, 9);
    localStorage.setItem('currentSessionId', savedSessionId);
    return savedSessionId;
  });
  const [backgroundColor, setBackgroundColor] = useState(
    () => localStorage.getItem('chatBackgroundColor') || '#ffffff',
  );
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);
  // Load saved sessions and current session messages
  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) setSessions(JSON.parse(savedSessions));

    const savedMessages = localStorage.getItem(`chatSession_${sessionId}`);
    if (savedMessages) setMessages(JSON.parse(savedMessages));
  }, [sessionId]);

  // Save messages and sessions
  useEffect(() => {
    localStorage.setItem(`chatSession_${sessionId}`, JSON.stringify(messages));
    localStorage.setItem('chatSessions', JSON.stringify(sessions));
    localStorage.setItem('chatBackgroundColor', backgroundColor);
  }, [messages, sessions, backgroundColor, sessionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const newMessage: Message = {
        text: input,
        isUser: true,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, newMessage]);

      const response = await fetch('http://10.0.092:rizwan/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, message: input }),
      });

      const { text } = await response.json();
      setMessages(prev => [...prev, {
        text,
        isUser: false,
        timestamp: Date.now(),
      }]);

    } catch (error) {
      const errorMessage: Message = {
        timestamp: Date.now(),
        text: 'Failed to get response. Please try again.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  const handleClearHistory = () => {
    setMessages([]);
    const updatedSessions = sessions.filter(s => s.id !== sessionId);
    setSessions(updatedSessions);
  };

  const handleSaveSession = () => {
    const sessionName = prompt('Enter session name:') || `Chat ${sessions.length + 1}`;
    const newSession: SavedSession = {
      id: sessionId,
      name: sessionName,
      messages,
      createdAt: Date.now(),
    };
    setSessions(prev => [...prev.filter(s => s.id !== sessionId), newSession]);
  };

  const handleColorChange = (color: string) => {
    setBackgroundColor(color);
  };

  return (
    <Box sx={{
      maxWidth: '50%',
      maxHeight: '100%',
      margin: 'auto',
      p: 2,
      background: `linear-gradient(45deg, ${backgroundColor} 30%, white 90%)`,
      minHeight: '100vh',
    }}>
      <Paper elevation={3} sx={{ p: 2, backdropFilter: 'blur(5px)' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}>
          <Typography variant="h6">Supply Chain Assistant</Typography>
          <Box>
            <IconButton onClick={handleSaveSession} title="Save Session">
              <History />
            </IconButton>
            <IconButton
              onClick={() => document.getElementById('color-picker')?.click()}
              title="Change Background"
            >
              <Palette />
            </IconButton>
            <input
              id="color-picker"
              type="color"
              value={backgroundColor}
              onChange={(e) => handleColorChange(e.target.value)}
              style={{ display: 'none' }}
            />
            <IconButton
              onClick={handleClearHistory}
              title="Clear History"
              color="error"
            >
              <Delete />
            </IconButton>
          </Box>
        </Box>
        <div className={styles.chatContainer}>
          <List className={styles.messageList}>
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent: msg.isUser ? 'flex-end' : 'flex-start',
                  animation: 'fadeIn 0.3s ease-in',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {!msg.isUser && (
                    <IconButton
                      size="small"
                      onClick={() => {
                        const updated = [...messages];
                        updated.splice(i, 1);
                        setMessages(updated);
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  )}
                  <Paper sx={{
                    p: 1.5,
                    bgcolor: msg.isUser ? '#1976d2' : 'white',
                    color: msg.isUser ? 'white' : 'black',
                    borderRadius: msg.isUser ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                  }}>
                    <Avatar sx={{ mr: 2 }}>
                      {msg.isUser ? <AccountCircle /> : <SmartToy />}
                    </Avatar>
                    <ListItemText
                      primary={msg.text}
                      sx={{ wordBreak: 'break-word' }}
                    />
                    <Typography variant="caption" sx={{
                      display: 'block',
                      mt: 0.5,
                      color: msg.isUser ? 'white' : 'black',
                    }}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  </Paper>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message..."
            variant="outlined"
            InputProps={{
              endAdornment: (
                <IconButton
                  type="submit"
                  disabled={isLoading}
                >
                  <Send />
                </IconButton>
              ),
            }}
          />
        </form>

        {sessions.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Saved Sessions</Typography>
            <List sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
              {sessions.map((session) => (
                <Paper
                  key={session.id}
                  sx={{
                    p: 2,
                    minWidth: 150,
                    cursor: 'pointer',
                    backgroundColor: session.id === sessionId ? '#e3f2fd' : 'inherit',
                  }}
                  onClick={() => {
                    localStorage.setItem('currentSessionId', session.id);
                    window.location.reload();
                  }}
                >
                  <Typography variant="body2">{session.name}</Typography>
                  <Typography variant="caption">
                    {new Date(session.createdAt).toLocaleDateString()}
                  </Typography>
                </Paper>
              ))}
            </List>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
