import { GoogleGenerativeAI } from "@google/generative-ai"

const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = generativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateImageDescription(imageBuffer) {

    const prompt = "gere uma descrição, de no maximo uma frase, em pt-br para a seguinte imagem, responda apenas com o texto da imagem";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png"
            }
        };

        const responseBag = await model.generateContent([prompt, image]);

        return responseBag.response.text().trim() || "description unavailable.";

    } catch (exception) {
        console.error("Error on get description:", error.message, error);

        throw Error("Error on get description from Gemini.");
    }
}

export async function generateItens(imageBuffer) {

    const prompt = "leia a notinha da foto e gere uma lista apenas com os itens comprados, quantidade e valor, inclua o valor total no fim";

    try {
        const image = {
            inlineData: {
                data: imageBuffer.toString("base64"),
                mimeType: "image/png"
            }
        };

        const responseBag = await model.generateContent([prompt, image]);

        return responseBag.response.text().trim() || "description unavailable.";

    } catch (exception) {
        console.error("Error on get description:", error.message, error);

        throw Error("Error on get description from Gemini.");
    }
}