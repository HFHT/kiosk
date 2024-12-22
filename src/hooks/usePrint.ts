import { receiptFill } from "../utils"

export function usePrint() {

    function printer(windowName: string, printDocument: string | undefined, itemList: { qty: number | string, prod: string }[], replace: any) {
        if (!printDocument) return
        const printOutput = receiptFill(printDocument, itemList, replace)
        var mywindow = window.open('', windowName, 'popup' /*`height=${height}, width=${width}`*/)
        if (mywindow) {
            mywindow.document.write(printOutput)
            mywindow.print()
            mywindow.close();
        }
    }
    return printer
}
