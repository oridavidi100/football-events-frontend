"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login_1 = __importDefault(require("./login"));
const accessToken_1 = __importDefault(require("../midllewares/accessToken"));
const register_1 = __importDefault(require("./register"));
const events_1 = __importDefault(require("./events"));
const user_1 = __importDefault(require("./user"));
const { getAllMessages } = require('../controllers/messages');
// const { findByDate } = require('../controllers/createEvent');
const { getAllEvents } = require('../controllers/createEvent');
const router = express_1.default.Router();
router.get('/allMessages/:room', getAllMessages);
router.use('/register', register_1.default);
router.get('/getAllEvents', getAllEvents);
router.use('/getUser', user_1.default);
router.use(accessToken_1.default);
router.use('/login', login_1.default);
router.use('/Event', events_1.default);
exports.default = router;
