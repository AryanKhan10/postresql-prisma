import prisma from "../db/db.config.js";

const createUser = async(req, res)=>{
    try {
        console.log(req.body)
        const { firstname,lastname,email,password} = req.body;
        if(!firstname || !password || !email) {
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        const findUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(findUser){
            return res.status(400).json({
                success:false,
                message:"User exist"
            })
        }

        const newUser = await prisma.user.create({
            data:{
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password

            }
        })
        res.status(200).json({
            success:true,
            message:"User created",
            newUser
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const updateUser = async(req, res)=>{
    try {
        console.log(req.params)
        const id = req.params.id
        console.log(typeof(id))
        const { firstname,lastname,email,password} = req.body;
        // if(!firstname || !password || !email) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"all fields are required"
        //     })
        // }

        const findUser = await prisma.user.findFirst({
            where:{
                id:Number(id)
            }
        })
        console.log("findUser ",findUser)
        if(!findUser){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        const newUser = await prisma.user.update({
            where:{
                id:Number(id)
            },
            data:{
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:password
            }
        })
        res.status(200).json({
            success:true,
            message:"User updated",
            newUser
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const deleteUser = async(req, res)=>{
    try {
        // console.log(req.body)
        const { id } = req.body;

        const findUser = await prisma.user.delete({
            where:{
                id:id
            }
        })
        console.log("findUser ",findUser)
        if(!findUser){
            return res.status(404).json({
                success:false,
                message:"User doesn't exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"User deleted",
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
const getAllUsers = async(req, res)=>{
    try {

        const allUsers = await prisma.user.findMany()

        res.status(200).json({
            success:true,
            message:"Users fetched",
            allUsers
        })
    } catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}



export {createUser, updateUser, deleteUser, getAllUsers}
