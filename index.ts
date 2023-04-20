import express, { Express, Request, Response } from 'express';
import path from 'path';
import session from 'express-session';
import { ItemsController } from './controllers/ItemsController';
import { AuthController } from './controllers/AuthController';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { idText } from 'typescript';

const app: Express = express();
const itemsController = new ItemsController();
const authController = new AuthController();
const prisma: PrismaClient = new PrismaClient();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

declare module "express-session" {
    interface SessionData {
      auth: boolean,
      name: String,
      password: String,
      admin: boolean,
      search: boolean
    }
};

app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

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
  app.get("/", (req: Request, res: Response) => {
    itemsController.Home(req, res);
  });

  app.get("/items", (req: Request, res: Response) => {
    itemsController.index(req, res);
  });

  app.get("/items/:id/show", (req: Request, res: Response) => {
    itemsController.show(req, res);
  });

  app.get("/items/create", (req: Request, res: Response) => {
    itemsController.create(req, res);
  });

  app.post("/items/store", (req: Request, res: Response) => {
    itemsController.store(req, res);
  });

  app.post("/items/delete", (req: Request, res: Response) =>{
    itemsController.delete(req, res);
  });
  
  app.get("/search", (req: Request, res: Response) => {
    itemsController.searchWeb(req, res);
  });

  app.post("/search", (req: Request, res: Response) =>{
    itemsController.search(req, res);
  })

  app.post("/items/update", (req: Request, res: Response) =>{
    itemsController.update(req, res);
  });

  
//}

//users{
  app.get("/users", (req: Request, res: Response) =>{
    itemsController.user(req,res)
  })
  app.get("/users/:id/delete",(req: Request, res: Response) =>{
    itemsController.deletUser(req,res)
  })
//}

//categories{
  app.post("/categorie/create", (req:Request,res:Response) =>{
    itemsController.storeCategory(req,res);
  });

  app.get("/categorie/store", (req:Request,res:Response) =>{
    itemsController.createCategory(req,res);
  });
  
  app.get("/categories/:id", (req:Request,res:Response) =>{
    itemsController.categories(req,res);
  });
  
  
//}

// register and login{
  app.get("/auth", (req:Request,res:Response) =>{
    authController.auth(req,res);
  });
  
  app.get("/registration", (req:Request,res:Response) =>{
    authController.registration(req,res);
  });
  
  app.post("/registration", (req:Request,res:Response) =>{
    authController.register(req,res);
  });
  
  app.post("/login", (req:Request,res:Response) =>{
    authController.login(req,res);
  });

  app.get("/logout", (req: Request, res: Response) => {
    authController.loGout(req, res);
  });
//}
