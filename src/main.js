/*
  tiles: https://opengameart.org/content/extension-for-sci-fi-platformer-tiles-32x32
  hero: https://opengameart.org/content/animated-robot
  sounds generated in: https://sfxr.me/
*/


import kaboom from "kaboom"
import "kaboom/global"

const SPEED = 280
const JUMP = 800
const SHAKE = 4
const GRAVITY = 2200

const k = kaboom({ global: false })
const soundHit = k.loadSound("hurt", "/sounds/explosion.wav")

k.setGravity(GRAVITY)
k.camScale(1.7)
k.setBackground("#0c0229")


k.canvas.focus()

const START_POS = [220,30]

k.loadSpriteAtlas("sprites/daxbotsheet_v1.png",{
    "hero": {
        x: 0,
        y: 0,
        width: 256,
        height: 256,
        sliceX: 4,
        sliceY: 4,
        anims: {
            idle: 0,
            walk: { from: 0, to: 3 },
            run: { from: 5, to: 7 },
            jump: { from: 9, to: 11, pingpong: true},
            climb: { from: 12, to: 15 },
        },
    },
})


const hero = k.add([
    k.pos(START_POS),
    k.sprite("hero"),
    k.area({scale: [0.5, 0.9]}),
    k.anchor("center"),
    k.body(),
    "hero",
    {
        dead: false
    }
])


k.loadSpriteAtlas("sprites/sci-fi-platformer-tiles-32x32-extension-p1.png", {
    "floor-middle": {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
    },
    "floor-short": {
        x: 32,
        y: 0,
        width: 32,
        height: 32,
    },
    "spike-up": {
        x: 9 * 32,
        y: 4 * 32,
        width: 32,
        height: 32,
    },
    "spike-down": {
        x: 8 * 32,
        y: 4 * 32,
        width: 32,
        height: 32,
    },
    "bg-tile1": {
        x: 3 * 32,
        y: 3 * 32,
        width: 32,
        height: 32,
    },
    "grid-vert": {
        x: 12 * 32,
        y: 4 * 32,
        width: 32,
        height: 32,
    },
    "grid-horiz": {
        x: 13 * 32,
        y: 4 * 32,
        width: 32,
        height: 32,
    },
})

k.scene("main")
k.addLevel([
    "                                                           ",
    "                                                           ",
    "                           ^   ^    ^    ^                     ",
    "                         =====================  ",
    "                         i$    v    v        i    ",
    "           $$         |  i$                  i     ",
    "  %  ====             |  i$                  i    ",
    "     i  i             |  i                   i     ",
    "     i  i  ^^  = >    |  i             ^     i    ",
    "================================    =============================================",

], {
    // define the size of tile block
    tileWidth: 32,
    tileHeight: 32,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    tiles: {
        "=": () => [
            k.sprite("floor-middle"), //"floor"
            k.area(),
            k.body({ isStatic: true }),
        ],
        "|": () => [
            k.sprite("floor-short"), //"floor"
            k.area(),
            k.body({ isStatic: true }),
        ],
        "^": () => [
            k.sprite("spike-up"),
            k.area({scale: [0.8, 0.9]}),
            //k.anchor("center"),
            "spike",
        ],
        "v": () => [
            k.sprite("spike-down"),
            k.area({scale: [0.8, 0.9]}),
            //k.anchor("center"),
            "spike",
        ],
        "i": () => [
            k.sprite("grid-vert"),
            k.area(),
            "bg",
        ],
        "&": () => [
            k.sprite("bg-tile1"),
            k.area(),
            k.z(-2),
            "bg",
        ],

    },
    wildcardTile: (symbol) => {
        [
            k.sprite("bg-tile1"),
            //k.area()
        ]
    },
})

function centerCam(pos) {
    k.camPos(Math.trunc(pos.x), Math.trunc(pos.y))
    console.log(pos)
    console.log(k.camPos())
}

function centerCamHorizontal(pos) {
    k.camPos([Math.trunc(hero.pos.x), 110])
}


k.onUpdate(() => {
    if (k.isKeyDown("a")) {
        hero.move(-SPEED, 0)
        hero.flipX = true
        if (hero.isGrounded() && hero.curAnim() !== "walk") {
            hero.play("walk")
        }
    }
    if (k.isKeyDown("d")) {
        hero.move(SPEED, 0)
        hero.flipX = false
        if (hero.isGrounded() && hero.curAnim() !== "walk") {
            hero.play("walk")
        }
    }
})

k.onKeyRelease("d", ()=>{
    hero.stop()
})
k.onKeyRelease("a", ()=>{
    hero.stop()
})


function jump() {
    if (hero.isGrounded()) {
        hero.jump(JUMP)
    }
    hero.play("jump")
}

function die(){
    if (!hero.dead) {
        hero.dead = true
        k.addKaboom(hero.pos),
        k.shake(SHAKE)
        k.play("hurt")
        k.wait(0.6, () => {
            hero.moveTo(START_POS)
            hero.dead = false
            hero.jump(1)
            hero.play("jump")
        })
    }
}

k.onKeyPress("space", () => {
    jump()
})
k.onKeyPress("w", () => {
    jump()
})

hero.onCollide("spike", () => {
    die()
})

hero.onUpdate(() => {
    // centerCam(hero.pos)
    centerCamHorizontal(hero.pos)
    if (!hero.dead && hero.pos.y > 500) {
        die()
    }
})

k.onKeyPress("f", (c) => {
    k.setFullscreen(!k.isFullscreen())
})

hero.onGround(() => {
    hero.play("idle")
})
