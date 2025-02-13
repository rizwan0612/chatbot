"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const client_1 = __importDefault(require("react-dom/client"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
// Local imports
const app_1 = __importDefault(require("./app"));
const lang_1 = __importDefault(require("./lang"));
const web_vitals_1 = __importDefault(require("./util/web-vitals"));
require("./styles/main.scss");
// Global initialization
(0, lang_1.default)();
const htmlRoot = document.getElementById('root');
const reactRoot = client_1.default.createRoot(htmlRoot);
reactRoot.render(process.env.REACT_APP_SCRICT_MODE === 'true' ? (<react_1.StrictMode>
      <react_router_dom_1.BrowserRouter>
        <app_1.default />
      </react_router_dom_1.BrowserRouter>
    </react_1.StrictMode>) : (<react_router_dom_1.BrowserRouter>
      <app_1.default />
    </react_router_dom_1.BrowserRouter>));
if (process.env.REACT_APP_REPORT_WEB_VITALS === 'true') {
    // If you want to start measuring performance in your app, pass a function
    // to log results (for example: reportWebVitals(console.log))
    // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
    // eslint-disable-next-line no-console
    (0, web_vitals_1.default)(console.log);
}
