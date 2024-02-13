import kaboom from "https://unpkg.com/kaboom@3000.0.2/dist/kaboom.mjs"
kaboom({
    width: 450,
    height: 300,
    font: "Bitcattoleman",
    background: [0, 0, 0],
    canvas: document.querySelector("canvas#renderer"),
    scale: 1.67,
    loadingScreen: false,
    maxFPS: 120,
    pixelDensity: window.devicePixelRatio * 1.67,
    crisp: true
})
loadSprite("msgbox", "/assets/images/msgbox.png", { slice9: { left: 4, right: 4, top: 4, bottom: 4 } })
loadSound("dialogtalk", "/assets/sounds/dialogtalk.wav")
loadFont("Bitcattoleman", "https://minamotion.org/assets/fonts/font-bitcattoleman.ttf")
class Dialog {
    constructor(dialog = ["This is a dialog example", "This is an array just being processed\nYou can check the source code", "Have a good day!"], delay = 0.05) {
        scene("dialog", () => {
            this.text = ""
            this.dtext = []
            this.dialogfinished = false
            this.msgbox = add([
                sprite("msgbox", { width: width() - 12, height: height() / 5 }),
                pos(5, 200),
                fixed()
            ])
            this.msgbox.add([
                text("", { size: 14, width: width() - 24, height: height() / 5 - 12 }),
                pos(12),
                "textrender",
                color([75, 75, 75]),
                fixed()
            ])
            onUpdate("textrender", (e) => {
                e.text = this.text
            })
            this.processDialog(delay)
            this.dtext = dialog.shift().split("")
            onKeyPress("enter", () => {
                if (dialog.length > 0) {
                    this.text = ""
                    this.dtext = dialog.shift().split("")
                } else {
                    this.text = ""
                    this.dtext = []
                    this.dialogfinished = true
                    this.msgbox.destroy()
                }

            })
        })
        go("dialog")
    }
    processDialog(delay = 0.05) {
        if (!(this.dialogfinished)) {
            this.text = ""
            loop(delay, () => {
                if (this.dtext.length > 0) {
                    play("dialogtalk")
                    this.text += this.dtext.shift()
                }
            })
        }
    }
}
new Dialog(["This is a test","FASDFGKJASDKHLLASJHSDOJVF","Love it!"],0.01)
