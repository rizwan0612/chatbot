"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chatbot_1 = __importDefault(require("../../components/Chatbot"));
// Component definition
function HomePage() {
    return (<Chatbot_1.default />);
}
// Default export
exports.default = HomePage;
