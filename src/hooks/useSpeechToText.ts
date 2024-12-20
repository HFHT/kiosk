import { useState } from "react";

export function useSpeechToText(callback: (result: string) => {}) {
    const [isRecording, setIsRecording] = useState(false)
    //@ts-ignore
    let recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (recognition) {
        console.log('useSpeechToText speech recognition okay.')

        recognition = new recognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            //   startBtn.disabled = true;
            //   stopBtn.disabled = false;
            //   animatedSvg.classList.remove('hidden');
            console.log('Recording started');
            setIsRecording(true)
        }

        recognition.onresult = (event: any) => {
            let result = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    result += event.results[i][0].transcript + ' ';
                } else {
                    result += event.results[i][0].transcript;
                }
            }
            console.log('result', result)
            callback(result)
            // setSpeechText(result)
            if (['done', 'stop'].includes(result.toLowerCase().slice(0, 4))) {
                stopRecording();
            }
        }
        recognition.onerror = (event: any) => {
            console.log('error', event)
        }
        recognition.onend = () => {
            console.log('Speech recognition ended')
            setIsRecording(false)
        }
    } else {
        console.warn('useSpeechToText speech recognition not supported.')
    }
    const startRecording = () => {
        recognition.start()
    }
    const stopRecording = () => {
        console.log('stopRecording', recognition)
        if (recognition) {
            recognition.stop()
        } else {
            console.warn('stopRecording no recognition')
        }
    }

    return { startRecording, stopRecording, isRecording }
}
