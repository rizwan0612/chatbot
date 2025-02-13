"use strict";
/**
 * react-i18next is a powerful internationalization framework for
 * React/ReactNative which is based on i18next.
 * Learn more: https://react.i18next.com
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const i18next_browser_languagedetector_1 = __importDefault(require("i18next-browser-languagedetector"));
const i18next_1 = __importDefault(require("i18next"));
const react_i18next_1 = require("react-i18next");
// Local imports
const resources_en_json_1 = __importDefault(require("./resources.en.json"));
const resources_es_json_1 = __importDefault(require("./resources.es.json"));
// Init the i18next module with the resource files
const initI18n = () => {
    i18next_1.default
        .use(i18next_browser_languagedetector_1.default)
        .use(react_i18next_1.initReactI18next)
        .init({
        resources: {
            en: {
                translations: Object.assign({}, resources_en_json_1.default),
            },
            es: {
                translations: Object.assign({}, resources_es_json_1.default),
            },
        },
        fallbackLng: 'en',
        debug: false,
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: false,
        interpolation: {
            escapeValue: false,
        },
    });
};
// Default export
exports.default = initI18n;
