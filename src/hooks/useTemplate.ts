import { useEffect, useState } from "react"
import { getPrintTemplate } from "../services/getPrintTemplate"

export function useTemplate() {
    const [printTemplate, setPrintTemplate] = useState(undefined)
    const [isTemplateBusy, setIsBusy] = useState(false)
    useEffect(() => {
        if (printTemplate === undefined) getTemplate()
    }, [])

    const getTemplate = async () => {
        setIsBusy(true)
        let template = await getPrintTemplate()
        setPrintTemplate(template.template)
        setIsBusy(false)
    }
    return { getTemplate, printTemplate, isTemplateBusy }
}
