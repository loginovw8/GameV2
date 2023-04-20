import { Request, Response } from 'express';
import { items, users, PrismaClient } from '@prisma/client';
import { title } from 'process';
import session from 'express-session';

const prisma: PrismaClient = new PrismaClient();

export class AuthController {
    async index(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany();

        res.render('items/index', {
            'items': items,
        });
    }
//REGISTER
    async register(req: Request, res: Response) {
        const { name, password, email } = req.body;

        const users = await prisma.users.findMany({
            where: {
                name
            }
        });

        if (users[0] != undefined) {
            req.session.admin = false;
            req.session.auth = false;
            res.redirect('/registration')
            

        } else {
            await prisma.users.create({
                data: {
                    name: name,
                    email:email,
                    password: password,
                }
            });
            req.session.name = name;
            if(req.session.name == "Admin"){
                req.session.admin = true;
            }else{
                req.session.admin = false;
            } 

            req.session.auth = true;
            res.redirect('/auth');
        }

        
       

    }

    registration(req: Request, res: Response) {
        res.render('registration',{
            auth:req.session.auth,
            admin:req.session.admin
        });
    }
// LOGIN
    async login(req: Request, res: Response) {
        const { name, password,email } = req.body;
        const users = await prisma.users.findMany({
            where: {
                name,
                email,
                password

            }
            
        });
        if (users.length > 0) {
            req.session.name = name;
        if(req.session.name == "Admin"){
            req.session.admin = true;
        }else{
            req.session.admin = false;
        }
            req.session.auth = true;
            res.redirect('/');
        } else {
            req.session.admin = false;
            req.session.auth = false;
            res.redirect('/auth')
        };
        
        
        
    }

    loGout(req: Request, res: Response){
        req.session.auth = false;
        res.render('auth',
        {
            auth:req.session.auth,
            admin:req.session.admin
        });

        if(req.session.name == "Admin"){
            req.session.admin = true;
        }else{
            req.session.admin = false;
        }
    }
    
    auth(req: Request, res: Response) {
        res.render('auth',
        {
            auth:req.session.auth,
            admin:req.session.admin
        });
        if(req.session.name == "Admin"){
            req.session.admin = true;
        }else{
            req.session.admin = false;
        }
    }
}