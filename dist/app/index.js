"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const react_router_dom_1 = require("react-router-dom");
// Local imports
const Home_1 = __importDefault(require("../pages/Home"));
// Component definition
function App() {
    return (<react_router_dom_1.Routes>
      <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
      <react_router_dom_1.Route path="home" element={<Home_1.default />}/>
    </react_router_dom_1.Routes>);
}
// Default export
exports.default = App;
