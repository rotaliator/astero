import kaboom from "kaboom"
import "kaboom/global"

const BACKGROUND_COLOR = [12, 2, 41]


const debug = (typeof DEBUG !== 'undefined' && DEBUG)
export const k = kaboom({
    width: 640,
    height: 480,
    background: BACKGROUND_COLOR,
    crisp: true,
    global: false,
    debug: debug
})
