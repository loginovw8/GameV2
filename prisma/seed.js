const { PrismaClient } = require('@prisma/client');
const internal = require('stream');
const prisma = new PrismaClient();

async function categories() {
    const createMany = await prisma.categories.createMany({
        data: [
            { title: "Открытый мир" },
            { title: "Шутеры" },
            { title: "Гонки" },
            { title: "Хоррор" },
            { title: "Выживание" }
        ],
        skipDuplicates: true
    }
    );
}

async function system_requirements() {
    const createMany = await prisma.system_requirements.createMany({
        data: [
            {
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{ 
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            },{   
                CPU:"",
                RAM:"",
                video_card:"",
                disc_space:"smth"
            }
            
        ],
        skipDuplicates: true
    }
    );
}

async function Items() {
    const createMany = await prisma.items.createMany({
        data: [
            {// 1
                title: "The Witcher 3: Wild Hunt",
                image: "Witcher3.jpeg",
                cat_id: Number(1),
                description: "«Ведьмак 3: Дикая Охота» (ориг. The Witcher 3: Wild Hunt) — вторая игра одноимённой серии, а также заключительная часть трилогии, разработанная польской компанией CD Projekt RED по мотивам серии романов «Ведьмак» польского писателя Анджея Сапковского, продолжение игр Ведьмак и Ведьмак 2: Убийцы Королей. В центре сюжета новое вторжение Империи Нильфгаард, поиски Цири и конфликт с Дикой Охотой. Повествование не делится на главы, как в предыдущих играх, что стало осуществимым благодаря новому движку. Сюжет предусматривает 36 финальных состояний мира, к которым могут привести действия игрока. В игре появляются такие персонажи как Весемир, Ламберт, Эскель, Лютик, Золтан Хивай, Трисс Меригольд, Кейра Мец, Сигизмунд Дийкстра, Вернон Роше, Лето из Гулеты, Цирилла, Йеннифер, Эмгыр вар Эмрейс и многие другие. Возвращение некоторых персонажей зависит от принятых игроком решений во второй части игры, причем это можно сделать и не переносив сохранения.",
                system_id:Number(1),
            }, {
                title: "Death Stranding 2",
                image: "DeathS2.jpeg",
                cat_id: Number(1),
                description: "",
                system_id:Number(2),
            }, {
                title: "The Elder Scrolls 5",
                image: "Skyrim.jpeg",
                cat_id: Number(1),
                description: "",
                system_id:Number(3),
            }, {
                title: "Marvels Spider-Man",
                image: "SpiderMan.jpeg",
                cat_id: Number(1),
                description: "",
                system_id:Number(4),
            }, {
                title: "Fallout 4",
                image: "Fallout4.jpeg",
                cat_id: Number(1),
                description: "",
                system_id:Number(5),
            },// 2
            {
                title: "CS:GO",
                image: "cs-go.jpg",
                cat_id: Number(2),
                description: "",
                system_id:Number(6),
            }, {
                title: "Far Cry 5",
                image: "farCry5.jpg",
                cat_id: Number(2),
                description: "",
                system_id:Number(7),
            }, {
                title: "PUBG",
                image: "pubg.jpg",
                cat_id: Number(2),
                description: "",
                system_id:Number(8),
            }, {
                title: "COD Modern Warfare 3",
                image: "CallOfDuty.jpg",
                cat_id: Number(2),
                description: "",
                system_id:Number(9),
            }, {
                title: "Far Cry 6",
                image: "farCry6.jpg",
                cat_id: Number(2),
                description: "",
                system_id:Number(10),
            },// 3
            {
                title: "Forza Horizon 4",
                image: "ForzaH4.jpg",
                cat_id: Number(3),
                description: "",
                system_id:Number(11),
            }, {
                title: "Forza Horizon 5",
                image: "ForzaH5.jpg",
                cat_id: Number(3),
                description: "",
                system_id:Number(12),
            }, {
                title: "Need for Speed Unbound",
                image: "NFSunb.jpg",
                cat_id: Number(3),
                description: "",
                system_id:Number(13),
            }, {
                title: "Redout 2",
                image: "redout2.jpg",
                cat_id: Number(3),
                description: "",
                system_id:Number(14),
            }, {
                title: "BeamNG DRIVE",
                image: "BeamNGDRIVE.jpg",
                cat_id: Number(3),
                description: "",
                system_id:Number(15),
            },// 4

        ],
        skipDuplicates: true
    }
    );
}

system_requirements()
categories()
Items()

    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })