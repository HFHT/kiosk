import { useEffect, useState } from "react"
import { getPrintTemplate } from "../services"

export function useTemplate(templateId?: string | undefined) {
    const [printTemplate, setPrintTemplate] = useState<{ template: string, email: string, openAIprompt: any } | undefined>(undefined)
    const [isTemplateBusy, setIsBusy] = useState(false)
    useEffect(() => {
        if (printTemplate === undefined) getTemplate()
    }, [])

    const getTemplate = async () => {
        console.log(templateId)
        setIsBusy(true)
        let template = await getPrintTemplate(templateId)
        setPrintTemplate(template)
        setIsBusy(false)
    }
    return { getTemplate, printTemplate, isTemplateBusy }
}
