"use server"

import Question from "@/models/question.model";
import { connectToDatabase } from "../mongoose"
import Tag from "@/models/tag.model";



export async function createQuestion(params: any) {
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

        // Add any additional actions here

    } catch (error) {
        console.error("Error creating question:", error);
    }
}