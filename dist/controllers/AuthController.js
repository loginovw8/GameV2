"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany();
            res.render('items/index', {
                'items': items,
            });
        });
    }
    //REGISTER
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name
                }
            });
            if (users[0] != undefined) {
                req.session.admin = false;
                req.session.auth = false;
                res.redirect('/registration');
            }
            else {
                yield prisma.users.create({
                    data: {
                        name: name,
                        email: email,
                        password: password,
                    }
                });
                req.session.name = name;
                if (req.session.name == "Admin") {
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                }
                req.session.auth = true;
                res.redirect('/auth');
            }
        });
    }
    registration(req, res) {
        res.render('registration', {
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    // LOGIN
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, email } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name,
                    email,
                    password
                }
            });
            if (users.length > 0) {
                req.session.name = name;
                if (req.session.name == "Admin") {
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                }
                req.session.auth = true;
                res.redirect('/');
            }
            else {
                req.session.admin = false;
                req.session.auth = false;
                res.redirect('/auth');
            }
            ;
        });
    }
    loGout(req, res) {
        req.session.auth = false;
        res.render('auth', {
            auth: req.session.auth,
            admin: req.session.admin
        });
        if (req.session.name == "Admin") {
            req.session.admin = true;
        }
        else {
            req.session.admin = false;
        }
    }
    auth(req, res) {
        res.render('auth', {
            auth: req.session.auth,
            admin: req.session.admin
        });
        if (req.session.name == "Admin") {
            req.session.admin = true;
        }
        else {
            req.session.admin = false;
        }
    }
}
exports.AuthController = AuthController;
