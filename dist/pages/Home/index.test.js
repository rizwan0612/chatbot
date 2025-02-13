"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const react_1 = require("@testing-library/react");
// Local imports
const _1 = __importDefault(require("."));
test('Render HomePage', () => {
    (0, react_1.render)(<_1.default />);
    const element = react_1.screen.getByText(/Hello World!/i);
    expect(element).toBeInTheDocument();
});
