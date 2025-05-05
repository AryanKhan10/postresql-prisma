import prisma from "../db/db.config.js";

const createComment = async(req, res)=>{
    try {
        // console.log(req.body)
        const { userId, postId, comment} = req.body;
        if(!userId || !postId || !comment) {
            return res.status(400).json({
                success:false,
                message:"all fields are required"
            })
        }

        const newComment = await prisma.comment.create({
            data:{
                userId:userId,
                postId:postId,
                comment:comment,
            }
        })
        res.status(200).json({
            success:true,
            message:"Comment created",
            newComment
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
const updateComment = async(req, res)=>{
    try {
        // console.log(req.params)
        const id = req.params.id
        // console.log(typeof(id))
        const { comment } = req.body;

        const findComment = await prisma.comment.findFirst({
            where:{
                id:id
            }
        })
        console.log("findComment ",findComment)
        if(!findComment){
            return res.status(404).json({
                success:false,
                message:"comment doesn't exist"
            })
        }

        const updatedComment = await prisma.comment.update({
            where:{
                id:id
            },
            data:{
                comment,
            }
        })
        res.status(200).json({
            success:true,
            message:"comment updated",
            updatedComment
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
const deleteComment = async(req, res)=>{
    try {
        console.log(req.params)
        const { id } = req.params;

        const deletedComment = await prisma.comment.delete({
            where:{
                id:id
            }
        })
        console.log("deletedComment ",deletedComment)
        if(!deletedComment){
            return res.status(404).json({
                success:false,
                message:"Comment doesn't exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"Comment deleted",
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
const getAllComments = async(req, res)=>{
    
    try {
        const allComments = await prisma.comment.findMany()

        res.status(200).json({
            success:true,
            message:"Comment fetched",
            allComments
        })
    }catch (error) {
        console.log("Error: ",error)
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}



export {createComment, updateComment, deleteComment, getAllComments}
