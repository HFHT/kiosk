import { Button, Textarea } from "@mantine/core"
import { useState } from "react"
import { useOpenAI } from "../../hooks"
const CONST_GPT_PROMPT = 'Parse this information into a list of items and quantities: {items}. Your response should be in the following JSON format: [  {    "prod": "Item 1", "qty": "Quantity 1"  }]'

export function Donations() {
    const [donationInput, setDonationInput] = useState('')
    const [itemList, getGPT, noResponse, resetGPT]: any = useOpenAI()
    const analyze = () => {
        getGPT(CONST_GPT_PROMPT.replace(/{items}/g, donationInput))
    }

    return (
        <>
            {/* <div><textarea value={donationInput} placeholder='1 table, 4 chairs...' className='canceltext' spellCheck rows={5} cols={40} onChange={(e) => { setDonationInput(e.target.value) }} title='Enter a list of items and quantities that you are donating.' /></div> */}
            {/* <Button onClick={(e: any) => handleClear(e)}>Reset</Button> */}
            {/* {!doOpenAI && <div><Button disabled={donationInput.length === 0} onClick={() => setDoOpenAI(true)}>Done</Button></div>} */}
            <Textarea
                value={donationInput}
                onChange={(e) => { setDonationInput(e.target.value) }}
                size="lg"
                label="Donation"
                withAsterisk
                autosize
                minRows={5}
                description="Enter a list of items and quantities that you are donating."
                placeholder="1 table, 4 chairs..."
            />
            <Button disabled={donationInput.length === 0} onClick={() => analyze()}>Analyze</Button>
        </>
    )
}
