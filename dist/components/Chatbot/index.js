"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const index_module_scss_1 = __importDefault(require("./index.module.scss")); // Import styles
const ChatInterface = () => {
    const [input, setInput] = (0, react_1.useState)('');
    const [messages, setMessages] = (0, react_1.useState)([]);
    const messagesEndRef = (0, react_1.useRef)(null);
    const scrollToBottom = () => {
        var _a;
        (_a = messagesEndRef.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' });
    };
    (0, react_1.useEffect)(scrollToBottom, [messages]);
    const handleSend = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!input.trim())
            return;
        // Add user message
        const userMessage = {
            id: Date.now(),
            content: input,
            isUser: true,
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        try {
            const response = yield fetch('http://localhost:3002/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });
            const data = yield response.json();
            const botMessage = {
                id: Date.now(),
                content: data.reply,
                isUser: false,
            };
            setMessages(prev => [...prev, botMessage]);
        }
        catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                id: Date.now(),
                content: 'Failed to get response. Please try again.',
                isUser: false,
            };
            setMessages(prev => [...prev, errorMessage]);
        }
    });
    return (<material_1.Container maxWidth="md">
      <material_1.Paper elevation={3}>
        <material_1.Box p={2} bgcolor="#1976d2" color="white">
          <material_1.Typography variant="h6">
            Supply Chain Assistant
          </material_1.Typography>
        </material_1.Box>

        <div className={index_module_scss_1.default.chatContainer}>
          <material_1.List className={index_module_scss_1.default.messageList}>
            {messages.map((message) => (<material_1.ListItem key={message.id} className={message.isUser ? index_module_scss_1.default.userMessage : index_module_scss_1.default.botMessage}>
                <material_1.Avatar sx={{ mr: 2 }}>
                  {message.isUser ? <icons_material_1.AccountCircle /> : <icons_material_1.SmartToy />}
                </material_1.Avatar>
                <material_1.ListItemText primary={message.content} sx={{ wordBreak: 'break-word' }}/>
              </material_1.ListItem>))}
            <div ref={messagesEndRef}/>
          </material_1.List>
        </div>

        <div className={index_module_scss_1.default.inputArea}>
          <material_1.TextField fullWidth variant="outlined" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask about inventory, shipments, or supply chain issues..."/>
          <material_1.IconButton color="primary" onClick={handleSend} disabled={!input.trim()}>
            <icons_material_1.Send />
          </material_1.IconButton>
        </div>
      </material_1.Paper>
    </material_1.Container>);
};
exports.default = ChatInterface;
