import { Button, Divider, Group, SimpleGrid, Stack, Text, Textarea } from "@mantine/core";
import { usePrint, useTemplate } from "../hooks";
import { useSpeechToText } from "../hooks/useSpeechToText";
import { useRef } from "react";

export function Receipt() {
    const { printTemplate, isTemplateBusy } = useTemplate('PrintTemplateV1')
    const speechRef = useRef(null)
    //@ts-ignore
    const { startRecording, stopRecording, isRecording } = useSpeechToText((e) => speechRef.current.value = e)
    const printer = usePrint()
    console.log('receipt')
    return (
        <>
            <Stack align='center' >
                <Button onClick={() => printer('receipt', printTemplate, {
                    DATE: '2024-12-20', TIME: '', NAME: 'Donor: Anonymous',
                    ADDRESS: '935 W Grant Road',
                    LIST: '', IMAGES: ''
                })
                } >Print new template</Button>
                <Divider mt='sm' mb='sm' />
                <div>
                    <Text size='xl'>Test of Speech to Text</Text>
                    <Group>
                        <Button disabled={isRecording} onClick={() => startRecording()}>Start Recording</Button>
                        <Button disabled={!isRecording} onClick={() => stopRecording()}>Stop Recording</Button>
                    </Group>
                    <Textarea label='Results' ref={speechRef} title='speech results' />
                </div>
            </Stack>
        </>
    )
}
