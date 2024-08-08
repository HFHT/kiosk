import { fetchJson } from "."

type OpenAiResponseType = {
    choices: OpenAiChoicesType[]
    usage: {
        prompt_token: number
        completion_tokens: number
        total_tokens: number
    }
    created: number
    id: string
    model: 'gpt-3.5-turbo-instruct'
    object: 'text-completion'
}
export type OpenAiChoicesType = {
    finish_response: 'stop'
    index: number
    logprobes: null
    text: string
}
export const getChatGPT = async (userData: string) => {
    console.log(userData)
    if (!userData) return;
    const headers = new Headers();

    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            model: import.meta.env.VITE_GPT_MODEL,
            prompt: userData,
            temperature: 0.2,
            max_tokens: 600
        })
    };
    try {
        const response: OpenAiResponseType = await fetchJson(`${import.meta.env.VITE_AZURE_FUNC_URL}/api/HFHTChatGPT`, options)
        console.log('ChatGPT-fetchJson', response)
        if (response.choices.length === 0) return []

        return JSON.parse(response.choices[0].text)
    }
    catch (error) {
        console.log(error);
        alert('ChatGPT could not analyze the donation.' + error);
        return []
    }
}