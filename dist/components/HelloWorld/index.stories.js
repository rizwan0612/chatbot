"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Red = exports.Green = void 0;
const _1 = __importDefault(require("."));
// Story placement in the story list
exports.default = {
    title: 'Components/HelloWorld',
    component: _1.default,
};
const Template = (args) => <_1.default {...args}/>;
// Story #1
exports.Green = Template.bind({});
exports.Green.args = {};
// Story #2
exports.Red = Template.bind({});
exports.Red.args = {
    alert: { severity: 'error' },
};
