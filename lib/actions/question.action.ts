"use server"

import Question from "@/models/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/models/tag.model";
import { CreateQuestionParams, GetQuestionsParams } from "./shared.types";
import User from "@/models/user.model";
import { revalidatePath } from "next/cache";




// For getting Questions

export async function getQuestion( params:GetQuestionsParams){
    try {
        connectToDatabase();
        const questions = await Question.find({}).populate({path:'tags',model:Tag}).populate({path:'author',model:User}).sort({createdAt:-1});
        console.log("Question Action",questions);
        return questions;

        // above and below are the same code 

    //     const questions = await Question.find({})
    //     .populate('tags')  // Automatically uses the Tag model specified in the Question schema
    //     .populate('author');  // Automatically uses the User model specified in the Question schema

    // console.log("Question Action", questions);
        // return {question}
       
    } 
    catch (error) {
        console.log(error);
        throw error;
        
        
    }



}


// For posting question
export async function createQuestion(params: CreateQuestionParams) {
    try {
        connectToDatabase();

        const { title, content, tags, author, path } = params;
        const question = await Question.create({
            title,
            content,
            author,
        });

        const tagDocument = [];

        // Create or find existing tags
        for (const tag of tags) {
            const existingTag = await Tag.findOneAndUpdate(
                { name: { $regex: new RegExp(`^${tag}$`, "i") } },
                { $setOnInsert: { name: tag }, $push: { question: question._id } },
                { upsert: true, new: true } // Ensure upsert and return the modified document
            );

            console.log("Existing or new tag:", existingTag);

            tagDocument.push(existingTag._id);
        }

        console.log("Tag documents:", tagDocument);

        // Update question with tag references
        await Question.findByIdAndUpdate(question._id, {
            $push: { tags: { $each: tagDocument } }
        });

        console.log("Question updated with tags.");
        revalidatePath(path)
        // Add any additional actions here

    } catch (error) {
        console.error("Error creating question:", error);
    }
}