import { GoogleGenAI } from "@google/genai";
import { Outline } from "../types";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const parseJsonFromMarkdown = <T,>(text: string): T | null => {
    try {
        let jsonStr = text.trim();
        const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[1]) {
            jsonStr = match[1].trim();
        }
        return JSON.parse(jsonStr) as T;
    } catch (e) {
        console.error("Failed to parse JSON response:", e);
        console.error("Original text:", text);
        return null;
    }
};

export const generateOutline = async (prompt: string): Promise<Outline | null> => {
    const fullPrompt = `Based on the following idea, create a detailed story outline for an animated short film. The output must be a single JSON object with the following structure: {title: string, logline: string, acts: [{act: number, title: string, summary: string, scenes: [{scene: number, description: string}]}]}. Do not include any explanatory text outside of the JSON object. Idea: "${prompt}"`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: fullPrompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonFromMarkdown<Outline>(response.text);
};

export const generateImage = async (prompt: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
        });
        
        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image:", error);
        return null;
    }
};

export const generateStoryboardPanelInfo = async (sceneDescription: string) => {
    const prompt = `For the scene "${sceneDescription}", provide a concise shot type description. Respond in a single JSON object format: {"shotType": "e.g., Medium Shot, Wide Angle, etc."}.`;
     const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonFromMarkdown<{shotType: string}>(response.text);
};

export const generateMarketingCopy = async (projectTitle: string, projectLogline: string) => {
    const prompt = `Generate marketing materials for an animated project titled "${projectTitle}" with the logline: "${projectLogline}". Provide a response in a single JSON object with three keys: "taglines" (an array of 3 strings), "socialMediaPost" (a short, engaging post for social media), and "shortSynopsis" (a one-paragraph synopsis).`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonFromMarkdown<{taglines: string[], socialMediaPost: string, shortSynopsis: string}>(response.text);
};

export const generateVoiceScriptAndDescription = async (characterDescription: string, sceneContext: string) => {
    const prompt = `Generate voice development details for a character with the description: "${characterDescription}". They are in a scene with this context: "${sceneContext}". Provide a response as a single JSON object with two keys: "voiceDescription" (a description of the character's voice tone, pitch, and style) and "sampleLines" (an array of 3 sample lines of dialogue for this scene).`;
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-04-17",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
        },
    });
    return parseJsonFromMarkdown<{voiceDescription: string, sampleLines: string[]}>(response.text);
};