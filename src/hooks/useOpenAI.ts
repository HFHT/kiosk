// deprecated model: text-davinci-003

import { useState } from "react";
import { fetchJson } from "../helpers";
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
export function useOpenAI() {

    const [chatItemList, setChatItemList] = useState<string | null>();
    const [noResponse, setNoResponse] = useState(true);
    const getChatGPT = async (userData: any) => {
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
            setNoResponse(response.choices.length===0)
            setChatItemList(JSON.parse(response.choices[0].text))
            return
        }
        catch (error) { console.log(error); alert('ChatGPT could not analyze the donation.' + error); }
    }

    const resetGPT = (doIt: boolean) => {
        if (!doIt) return
        console.log('resetGPT')
        setChatItemList('')
    }

    return [chatItemList, getChatGPT, noResponse, resetGPT];
}