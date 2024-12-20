import { Button } from "@mantine/core";
import { usePrint, useTemplate } from "../hooks";

export function Receipt() {
    const { printTemplate, isTemplateBusy } = useTemplate('PrintTemplateV1')

    const printer = usePrint()
    return (
        <>
            <Button onClick={() => printer('receipt', printTemplate, {
                DATE: '2024-12-20', TIME: '', NAME: 'Donor: Anonymous',
                ADDRESS: '935 W Grant Road',
                LIST: '', IMAGES: ''
            })
            } >Print new template</Button>
        </>
    )
}
