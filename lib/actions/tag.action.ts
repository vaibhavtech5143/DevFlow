"use server"

import User from "@/models/user.model";
import { connectToDatabase } from "../mongoose";
import { GetTopInteractedTagsParams } from "./shared.types";

export async function getTopInteractedTags(params:GetTopInteractedTagsParams){
    try {
        connectToDatabase();
        const { userId } = params;
        const user = await User.findById(userId);
        if(!user) throw new Error("User Not Found");
        // TODO: Find interaction for the user and group by tags ....
        // Interaction
        return [{_id:"1",name:"tag1"},{_id:"2",name:"tag2"},{_id:"3",name:"tag3"}];
    }
     catch (error) {
        console.log(error);
        throw error;
    }
}