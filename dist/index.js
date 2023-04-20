"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const ItemsController_1 = require("./controllers/ItemsController");
const AuthController_1 = require("./controllers/AuthController");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const itemsController = new ItemsController_1.ItemsController();
const authController = new AuthController_1.AuthController();
const prisma = new client_1.PrismaClient();
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
;
app.use((0, express_session_1.default)({ secret: "Secret", resave: false, saveUninitialized: true }));
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
// app.get("/", (req: Request, res: Response) => {
//   const items = prisma.items.findMany({});
//   const categories = prisma.categories.findMany({});
//   res.render('home',{
//     items:'items',
//     auth:req.session.auth,
//     admin:req.session.admin
//   });
// });
//items{
app.get("/", (req, res) => {
    itemsController.Home(req, res);
});
app.get("/items", (req, res) => {
    itemsController.index(req, res);
});
app.get("/items/:id/show", (req, res) => {
    itemsController.show(req, res);
});
app.get("/items/create", (req, res) => {
    itemsController.create(req, res);
});
app.post("/items/store", (req, res) => {
    itemsController.store(req, res);
});
app.post("/items/delete", (req, res) => {
    itemsController.delete(req, res);
});
app.get("/search", (req, res) => {
    itemsController.searchWeb(req, res);
});
app.post("/search", (req, res) => {
    itemsController.search(req, res);
});
app.post("/items/update", (req, res) => {
    itemsController.update(req, res);
});
//}
//users{
app.get("/users", (req, res) => {
    itemsController.user(req, res);
});
app.get("/users/:id/delete", (req, res) => {
    itemsController.deletUser(req, res);
});
//}
//categories{
app.post("/categorie/create", (req, res) => {
    itemsController.storeCategory(req, res);
});
app.get("/categorie/store", (req, res) => {
    itemsController.createCategory(req, res);
});
app.get("/categories/:id", (req, res) => {
    itemsController.categories(req, res);
});
//}
// register and login{
app.get("/auth", (req, res) => {
    authController.auth(req, res);
});
app.get("/registration", (req, res) => {
    authController.registration(req, res);
});
app.post("/registration", (req, res) => {
    authController.register(req, res);
});
app.post("/login", (req, res) => {
    authController.login(req, res);
});
app.get("/logout", (req, res) => {
    authController.loGout(req, res);
});
//}
