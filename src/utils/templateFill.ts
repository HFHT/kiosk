
export function receiptFill(printDocument: string, itemList: { qty: number | string, prod: string }[], replace: any) {
    let printOutput: string[] = []
    let theItems = [...itemList]
    let pageEject = false
    for (let i = 0; i < Math.ceil(itemList.length / 12); i++) {
        let regex = new RegExp(`{break_page}`, 'g')
        printOutput = [...printOutput, printDocument.replace(regex, pageEject ? 'break_page' : '')]
        pageEject = true
        Object.entries(replace).forEach(([key, value]: any) => {
            let regex = new RegExp(`{${key}}`, 'g')
            printOutput[i] = printOutput[i].replace(regex, value)
        })
        for (let j = 0; j < 12; j++) {
            let regex = new RegExp(`{Q${(j + 1).toString().padStart(2, '0')}}`, 'g')
            printOutput[i] = printOutput[i].replace(regex, theItems[0] ? theItems[0].qty.toString() : '-')
            regex = new RegExp(`{D${(j + 1).toString().padStart(2, '0')}}`, 'g')
            printOutput[i] = printOutput[i].replace(regex, theItems[0] ? theItems[0].prod : ' ')
            theItems.shift()
        }
    }
    console.log('printOutpu', printOutput)
    return printOutput.join('')
}

export function emailFill(printDocument: string, itemList: { qty: number | string, prod: string }[], replace: any) {
    let printOutput: string = printDocument
    let printList: string = ''
    Object.entries(replace).forEach(([key, value]: any) => {
        let regex = new RegExp(`{${key}}`, 'g')
        printOutput = printOutput.replace(regex, value)
    })
    itemList.forEach((il, j) => {
        printList = printList + `<tr><td>${il.qty} - ${il.prod}</td></tr>`
    })
    let regex = new RegExp(`{ITEMLIST}`, 'g')
    printOutput = printOutput.replace(regex, printList)

    return printOutput
}