import {k} from "./init"


// define a button
export function addButton(txt, p, f,labels) {
    const textColor = k.rgb(180, 180, 180)
    const textColorHov = k.rgb(255, 255, 255)
    const bgColor = k.rgb(5, 5, 5)
    const bgColorHov = k.rgb(10, 10, 10)

    const bg = k.add([
	k.pos(p),
	k.rect(25*txt.length, 40),
        k.area(),
	k.anchor("center"),
	k.color(bgColor),
        ...labels
    ]);

    const text = k.add([
	k.text(txt),
	k.pos(p),
	k.anchor("center"),
	k.color(textColor),
        ...labels,
    ]);

    bg.onClick(f)
    bg.onHover(()=>{text.color = textColorHov; bg.color=bgColorHov})
    bg.onHoverEnd(()=>{text.color = textColor; bg.color=bgColor})

}
