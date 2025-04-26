import mongoose,{Types} from "mongoose"

const contentSchema = new mongoose.Schema({
    link:{type:String,require:true},
    contentType:{type:String,require:true},
    title:{type:String,require:true},
    tags:[{type:String}],
    userId:{type:Types.ObjectId,ref:'User',require:true}
})

const userContent = mongoose.model("content",contentSchema)

export default userContent;