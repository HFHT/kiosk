import { Button, Divider, Group, Stack, Text, Textarea } from "@mantine/core";
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
                <Button onClick={() => printer('receipt', printTemplate, [
                    {qty:1, prod:'a'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'b'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'c'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'d'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'e'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'f'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'g'}, {qty:2, prod:'efg'},
                    {qty:1, prod:'h'}, {qty:2, prod:'efg'},
                ], {
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
