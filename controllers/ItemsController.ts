import { Request, Response } from 'express';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { title } from 'process';
import { idText } from 'typescript';

const prisma: PrismaClient = new PrismaClient();
// const session = require('express-session')

export class ItemsController {

    async index(req: Request, res: Response) {

        let itemsPerPage = 12;

        let page = Number(req.query.page);
        const count = await prisma.items.count({

        });
        let pages = Math.ceil((count / itemsPerPage));
        if (!page) page = 1;
        if (page > pages) page = Number(pages);
        const items: items[] = await prisma.items.findMany({
            take: itemsPerPage,
            skip: (page - 1) * itemsPerPage
        });

        const categories: categories[] = await prisma.categories.findMany();
        res.render('items/index', {
            'items': items,
            categories,
            number: Number(pages),
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    
    //Рендер главной страницы
    async Home(req: Request, res: Response) {
        const item = await prisma.items.findMany({});
        const length = item.length;
        const items: items[] = await prisma.items.findMany({
            take:4,
            skip:length-5,
        });

        const categories = await prisma.categories.findMany({})
        res.render('home', {
            'items':items,
            'categories':categories,
            auth: req.session.auth,
            admin: req.session.admin,
        });
    }

    //Рендер страницы объекта
    async show(req: Request, res: Response) {
        const item = await prisma.items.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });
        const system = await prisma.system_requirements.findMany({});

        res.render('items/show', {
            'item': item,
            'system':system,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Создание коммента
    // async createComment(req: Request, res: Response) {

    // }

    //Управление пользователями
    async user(req: Request, res: Response) {
        const users = await prisma.users.findMany({});

        res.render('users', {
            'users': users,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    async deletUser(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.users.delete({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/users')
    }

    //Рендер по категориям
    async categories(req: Request, res: Response) {
        const { id } = req.params;

        let itemsPerPage = 12;

        let page = Number(req.query.page);
        const count = await prisma.items.count({

        });
        let pages = Math.ceil((count / itemsPerPage));
        if (!page) page = 1;
        if (page > pages) page = Number(pages);

        const items = await prisma.items.findMany({
            where: {
                cat_id: Number(id),
            }
        });
        console.log(id)
        const categories: categories[] = await prisma.categories.findMany();

        res.render('items/index', {
            'items': items,
            'categories': categories,
            cat_id:id,
            number: Number(pages),
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Создание категории
    async storeCategory(req: Request, res: Response) {
        const { title } = req.body;
        const categories = await prisma.categories.findMany({
            where: {
                title: title
            }
        });
        if (categories[0] != undefined) {
            res.redirect('/categorie/store');
        } else if (categories[0] == '') {
            res.redirect('/categorie/store');
        } else {
            await prisma.categories.create({
                data: {
                    title: title
                }
            });
            res.redirect('/items');
        }

    }
    createCategory(req: Request, res: Response) {
        res.render('categorie/store', {
            auth: req.session.auth,
            admin: req.session.admin,
        });
    }

    //Поиск обьекта
    async search(req: Request, res: Response) {
        const { title } = req.body;
        const items = await prisma.items.findMany({
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
    }

    async searchWeb(req: Request, res: Response) {
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
    }
    //Создание обьекта
    async store(req: Request, res: Response) {
        const { title, image, cat_id, description, system_id } = req.body;
        const categories = await prisma.categories.findMany({});
        let all = "";
        let one = "";
        for (let i= 0; i < categories.length; i++ ){
            one = String(req.body.check.id)
            all = one + ',';
        }

        if (title == undefined || image == undefined || cat_id == undefined || description == undefined) {
            res.redirect('/items');
        } else {
            await prisma.items.create({
                data: {
                    title: title,
                    image: image,
                    category:
                                {
                                    connect: {
                                         id: Number(cat_id)
                                                        }
                                },
                    description:description,
                    system_id:system_id,
                }
            });
        }


        res.redirect('/');
    }

    async create(req: Request, res: Response) {
        const categories = await prisma.categories.findMany({});

        let all = "";
        let one = "";
        for (let i= 0; i < categories.length; i++ ){
            one = String(req.body.check)
            all = one + ',';
        }
        console.log(one)
        res.render('items/create', {
            category: all,
            categories: categories,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Удаление обьекта
    async delete(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.items.delete({
            where: {
                id: Number(id),
            }
        });
        res.redirect('/');
    }

    //Изменение обьекта
    async update(req: Request, res: Response) {
        const { id, title, image, cat_id } = req.body;

        if (cat_id == '') {
            res.redirect('/items/update');
        } else {
            await prisma.items.update({
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
            })
            res.redirect('/');
        }
    }

}

