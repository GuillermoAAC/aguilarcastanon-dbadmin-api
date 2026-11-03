import { Request, Response } from 'express';

export const getUser = (req: Request, res: Response) => {
    const user = {
        name:"John",
        lastname:"Doe",
        email:"johndoe@example.com",
        age:30,
        active:true,
        subjects:["Math", "Science", "History"],
        address:{
            street:"123 Main St",
            city: "Anytown",
        },

        arregloDeObjetos: [
            {
                name:"John",
                lastname:"Doe",
            },
            {
                name:"John",
                lastname:"Doe",
            },
        ]
    }
    res.json({
        "status":"success",
        "date":{
            "user": user
        }
    });
};

export const getUserById = (req: Request, res: Response) => {
    res.json({
        "status": "success",
        "data":{
            "id":req.params.id,
            "name":"John"
        }
    });
};