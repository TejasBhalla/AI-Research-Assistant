import openai from '../config/openai.js';
import { getTopContext } from '../utils/gettopcontext.js';
export const askQuestion = async (req, res) => {
    try {
        const { question } = req.body
        const contextResult = await getTopContext(question)
        const docIdToSourceNum = {};
        let sourceCounter = 1;

        contextResult.results.forEach((r) => {
            const docId = r.docId || r.id;
            if (!(docId in docIdToSourceNum)) {
                docIdToSourceNum[docId] = sourceCounter++;
            }
        });
        const context = contextResult.results.map((r) => {
            const docId = r.docId || r.id;
            const sourceNum = docIdToSourceNum[docId];
            return `[Source ${sourceNum}]: ${r.document}`;
        }).join('\n\n');
        console.log(context)
        const response = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
                {
                    "role": "system",
                    "content": `You are a research assistant AI. Your role is to carefully answer user questions based solely on the provided academic/scientific context.

                               - If the question has multiple parts, answer each part thoroughly and clearly.
                               -If something is not found in the context, say so explicitly.
                               - Use formal, domain-specific language.
                               - Never guess or invent information.`


                },
                {
                    "role": "user",
                    "content": `Use the context below to answer the question. Cite the Source number(s) used.

                     Context:
                     ${context}

                    Question: ${question}

                    Only answer from the context. Cite as [Source 1], [Source 2], etc.`
                }
            ],
        })
        console.log(docIdToSourceNum)
        return res.status(200).json({ answer: response.choices[0].message.content , sources: docIdToSourceNum});
    } catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
}