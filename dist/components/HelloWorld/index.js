"use strict";
/**
 * The HelloWorld component renders an alert with
 * the package name, version and environment.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
const Alert_1 = __importDefault(require("@mui/material/Alert"));
const AlertTitle_1 = __importDefault(require("@mui/material/AlertTitle"));
const Box_1 = __importDefault(require("@mui/material/Box"));
const react_i18next_1 = require("react-i18next");
// Local imports
const index_module_scss_1 = __importDefault(require("./index.module.scss"));
// Component definition
function HelloWorld({ alert, box }) {
    const { t } = (0, react_i18next_1.useTranslation)();
    const defaults = HelloWorld.defaultProps;
    const boxProps = Object.assign(Object.assign({}, defaults.box), box);
    const alertProps = Object.assign(Object.assign({}, defaults.alert), alert);
    const name = process.env.REACT_APP_PACKAGE_NAME;
    const version = process.env.REACT_APP_PACKAGE_VERSION;
    const env = process.env.REACT_APP_ENV;
    return (<Box_1.default {...boxProps}>
      <Alert_1.default {...alertProps}>
        <AlertTitle_1.default>{t('hello-world')}</AlertTitle_1.default>
        <div className={index_module_scss_1.default.info}>{name}</div>
        <div className={index_module_scss_1.default.info}>{version}</div>
        <div className={index_module_scss_1.default.info}>{env}</div>
      </Alert_1.default>
    </Box_1.default>);
}
// Default props
HelloWorld.defaultProps = {
    alert: {
        severity: 'success',
        sx: { width: 300 },
        variant: 'filled',
    },
    box: {},
};
// Default export
exports.default = HelloWorld;
