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
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const session = require('express-session')
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let itemsPerPage = 12;
            let page = Number(req.query.page);
            const count = yield prisma.items.count({});
            let pages = Math.ceil((count / itemsPerPage));
            if (!page)
                page = 1;
            if (page > pages)
                page = Number(pages);
            const items = yield prisma.items.findMany({
                take: itemsPerPage,
                skip: (page - 1) * itemsPerPage
            });
            const categories = yield prisma.categories.findMany();
            res.render('items/index', {
                'items': items,
                categories,
                number: Number(pages),
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Рендер главной страницы
    Home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prisma.items.findMany({});
            const length = item.length;
            const items = yield prisma.items.findMany({
                take: 4,
                skip: length - 5,
            });
            const categories = yield prisma.categories.findMany({});
            res.render('home', {
                'items': items,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
            });
        });
    }
    //Рендер страницы объекта
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield prisma.items.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });
            const system = yield prisma.system_requirements.findMany({});
            res.render('items/show', {
                'item': item,
                'system': system,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Создание коммента
    // async createComment(req: Request, res: Response) {
    // }
    //Управление пользователями
    user(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({});
            res.render('users', {
                'users': users,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    deletUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma.users.delete({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/users');
        });
    }
    //Рендер по категориям
    categories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let itemsPerPage = 12;
            let page = Number(req.query.page);
            const count = yield prisma.items.count({});
            let pages = Math.ceil((count / itemsPerPage));
            if (!page)
                page = 1;
            if (page > pages)
                page = Number(pages);
            const items = yield prisma.items.findMany({
                where: {
                    cat_id: Number(id),
                }
            });
            console.log(id);
            const categories = yield prisma.categories.findMany();
            res.render('items/index', {
                'items': items,
                'categories': categories,
                cat_id: id,
                number: Number(pages),
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Создание категории
    storeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const categories = yield prisma.categories.findMany({
                where: {
                    title: title
                }
            });
            if (categories[0] != undefined) {
                res.redirect('/categorie/store');
            }
            else if (categories[0] == '') {
                res.redirect('/categorie/store');
            }
            else {
                yield prisma.categories.create({
                    data: {
                        title: title
                    }
                });
                res.redirect('/items');
            }
        });
    }
    createCategory(req, res) {
        res.render('categorie/store', {
            auth: req.session.auth,
            admin: req.session.admin,
        });
    }
    //Поиск обьекта
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    'title': {
                        contains: title
                    }
                }
            });
            res.render('searchWeb', {
                'items': items,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    searchWeb(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const items = prisma.items.findMany({
                where: {
                    title: {
                        contains: title
                    }
                }
            });
            res.render('search', {
                'items': items,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Создание обьекта
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, cat_id, description, system_id } = req.body;
            const categories = yield prisma.categories.findMany({});
            let all = "";
            let one = "";
            for (let i = 0; i < categories.length; i++) {
                one = String(req.body.check.id);
                all = one + ',';
            }
            if (title == undefined || image == undefined || cat_id == undefined || description == undefined) {
                res.redirect('/items');
            }
            else {
                yield prisma.items.create({
                    data: {
                        title: title,
                        image: image,
                        category: {
                            connect: {
                                id: Number(cat_id)
                            }
                        },
                        description: description,
                        system_id: system_id,
                    }
                });
            }
            res.redirect('/');
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            let all = "";
            let one = "";
            for (let i = 0; i < categories.length; i++) {
                one = String(req.body.check);
                all = one + ',';
            }
            console.log(one);
            res.render('items/create', {
                category: all,
                categories: categories,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Удаление обьекта
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.items.delete({
                where: {
                    id: Number(id),
                }
            });
            res.redirect('/');
        });
    }
    //Изменение обьекта
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, image, cat_id } = req.body;
            if (cat_id == '') {
                res.redirect('/items/update');
            }
            else {
                yield prisma.items.update({
                    where: {
                        id: Number(id)
                    },
                    data: {
                        title,
                        image,
                        category: {
                            connect: {
                                id: Number(cat_id)
                            }
                        }
                    }
                });
                res.redirect('/');
            }
        });
    }
}
exports.ItemsController = ItemsController;
