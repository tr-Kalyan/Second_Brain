import mongoose,{Types} from "mongoose"

const contentSchema = new mongoose.Schema({
    link:{type:String,require:true},
    contentType:{type:String},
    title:{type:String,require:true},
    tags:[{type:String}],
    userId:{type:Types.ObjectId,ref:'User',require:true}
})



function detectContentType(link:string):string{
    try{
        const url = new URL(link);
        const host = url.hostname.toLowerCase();

        if (host.includes("youtube.com") || host.includes("youtub.be")) return "YouTube"
        if (host.includes("medium.com")) return "Medium"
        if (host.includes("github.com")) return "Github"
        if (host.includes("linkedin.com")) return "Linkedin"
        if (host.includes("notion.so")) return "Notion";
        if (host.includes("x.com") || host.includes("twitter.com")) return "Twitter";

        return "Website";
    }                                                               
    catch(err){
        return "Unknown";
    }
}



// Pre-save hook to set contentType
contentSchema.pre("save", function (next) {
    const link = this.link;
    if ((!this.contentType || this.contentType === "") && typeof link === "string") {
        this.contentType = detectContentType(link);
    }
    next();
});

const userContent = mongoose.model("content",contentSchema)

export default userContent;