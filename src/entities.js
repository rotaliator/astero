import {k} from "./init"
import * as config from "./init"



// spider
k.loadSpriteAtlas("sprites/spider04.png",{
    "spider": {
        x: 0,
        y: 0,
        width: 640,
        height: 320,
        sliceX: 10,
        sliceY: 5,
        anims: {
            idle: 40,
            walk: { from: 34, to: 39, loop: true },
            attack: {from: 30, to: 33},
            //jump: { from: 9, to: 11, pingpong: true},
            climb: { from: 0, to: 9, loop: true },
            slide: { from: 20, to: 29, loop: true },
            dead: {from: 41, to: 43}
        },
    },
})

export function createBox(pos) {
    const box = k.add([
            k.pos(pos),
            k.sprite("decor3"),
            k.area(),
            k.anchor("center"),
            k.body(),
            "box", "destroy-after"
    ])
    return box
}


export function createSpider(pos, anim) {
    const spider = k.add([
        k.pos(pos),
        k.sprite("spider"),
        k.area({scale: [0.5, 0.57]}),
        k.anchor("center"),
        k.body({maxVelocity: config.MAX_VELOCITY}),
        k.z(1),
        "spider", "kills", "destroy-after",
        {
            dead: false,
        }
    ])
    spider.flipX=true
    spider.play("walk")
    spider.onCollide("box", ()=>{
        spider.dead = true
        spider.destroy()
    })
    const jumpInterval = Math.floor(Math.random() * (config.SPIDER_JUMP_INTERVAL_MAX-config.SPIDER_JUMP_INTERVAL_MIN)) + config.SPIDER_JUMP_INTERVAL_MIN
    setInterval(()=>{spider.jump(config.SPIDER_JUMP)}, jumpInterval)
    return spider
}
