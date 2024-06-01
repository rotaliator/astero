import kaboom from "kaboom"
import "kaboom/global"

export const BACKGROUND_COLOR = [12, 2, 41]
export const SPEED = 280
export const MAX_VELOCITY = 600
export const JUMP = 800
export const SPIDER_JUMP = 900
export const SPIDER_JUMP_INTERVAL_MIN = 1500
export const SPIDER_JUMP_INTERVAL_MAX = 4500
export const SHAKE = 4
export const GRAVITY = 2200


const debug = (typeof DEBUG !== 'undefined' && DEBUG)
export const k = kaboom({
    width: 640,
    height: 480,
    background: BACKGROUND_COLOR,
    crisp: true,
    global: false,
    debug: debug
})
