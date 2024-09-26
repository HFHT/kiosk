export function usePrint() {

    function printer(windowName: string, printDocument: string | undefined, replace: any) {
        if (!printDocument) return
        Object.entries(replace).forEach(([key, value]: any) => {
            let regex = new RegExp(`{${key}}`, 'g')
            printDocument = printDocument!.replace(regex, value)
        })
        var mywindow = window.open('', windowName, 'popup' /*`height=${height}, width=${width}`*/)
        if (mywindow) {
            mywindow.document.write(printDocument)
            mywindow.print()
            mywindow.close();
        }
    }
    return printer
}
