"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
// Local imports
const _1 = __importDefault(require("."));
// Story placement in the story list
exports.default = {
    title: 'Pages/Home',
    component: _1.default,
    parameters: {
        layout: 'fullscreen',
    },
};
// Default export
const Default = () => <_1.default />;
exports.Default = Default;
