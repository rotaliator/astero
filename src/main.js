/*
  tiles: https://opengameart.org/content/extension-for-sci-fi-platformer-tiles-32x32
  hero: https://opengameart.org/content/animated-robot
  space ship: https://opengameart.org/content/parts2-art-space-ships
  sounds generated in: https://sfxr.me/
*/


import kaboom from "kaboom"
import "kaboom/global"

const SPEED = 280
const JUMP = 800
const SHAKE = 4
const GRAVITY = 2200
const CAM_POS = 300


let START_POS = [220,300]
const SHIP_POS = [2546,340]

//START_POS = [SHIP_POS[0] - 200, SHIP_POS[1]]

const BOXES = [
    [180,300],
    [550,420],
    [1520,180],
]

let k
if (typeof DEBUG !== 'undefined' && DEBUG) {
    console.log("debug")
    k = kaboom({global: false})
} else {
    k = kaboom({
        global: false,
        debug: false
    })
}

const soundHit = k.loadSound("hurt", "sounds/explosion.wav")
const soundHitGround = k.loadSound("hitGround", "sounds/hit.wav")

k.setGravity(GRAVITY)
k.camScale(1.8)
k.setBackground("#0c0229")


k.canvas.focus()


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
    k.body({maxVelocity: 600}), // {maxVelocity: 800}
    k.z(1),
    "hero",
    {
        dead: false
    }
])

k.loadSprite("ship1", "sprites/ship1.png")
const ship = k.add([
    k.pos(SHIP_POS),
    k.anchor("center"),
    k.area({scale: [0.2, 0.6]}),
    k.sprite("ship1"),
])



function flyToNextLevel(){
    k.tween(ship.pos.y, -100, 1, (p)=>{ship.pos.y = p})
}


ship.onCollide("hero", ()=> {
    flyToNextLevel()
})

k.loadSpriteAtlas("sprites/sci-fi-platformer-tiles-32x32-extension-p1.png", {
    "hpipe-start": {
        x: 0,
        y: 32,
        width: 32,
        height: 32,
    },
    "hpipe-middle": {
        x: 0,
        y: 0,
        width: 32,
        height: 32,
    },
    "hpipe-end": {
        x: 32,
        y: 32,
        width: 32,
        height: 32,
    },
    "hpipe-short": {
        x: 32,
        y: 0,
        width: 32,
        height: 32,
    },
    "vpipe-start": {
        x: 3 * 32,
        y: 0,
        width: 32,
        height: 32,
    },
    "vpipe-middle": {
        x: 2 * 32,
        y: 0,
        width: 32,
        height: 32,
    },
    "vpipe-end": {
        x: 3 * 32,
        y: 32,
        width: 32,
        height: 32,
    },
    "vpipe-short": {
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
    "decor1": {
        x: 3 * 32,
        y: 3 * 32,
        width: 32,
        height: 32,
    },
    "decor2": {
        x: 1 * 32,
        y: 2 * 32,
        width: 32,
        height: 32,
    },
    "decor3": {
        x: 2 * 32,
        y: 2 * 32,
        width: 32,
        height: 32,
    },
})

k.scene("main")
k.addLevel([
    "                                                     A       ",
    "                                                     |       ",
    "                                                     |                    i         i  ",
    "                                                     |                    i         i  ",
    "                                                     |                    i         i  ",
    "                                                     V                    i         i  ",
    "                                                                          i         i  ",
    "                                            <=======>                     i         i  ",
    "                           ^   ^    ^    ^                                i         i  ",
    "                         <===================>                            i         i  ",
    "                         i     v    v        i                       A    i         i  ",
    "                      A  i                   i     <===>             |    i         i     ",
    "  %  <==>             |  i                   i       i               |    i         i     ",
    "  $  i  i             |  i                   i       i               |    i         i     ",
    "     i  i  ^^   <>    |  i             ^     i       i               |    i         i     ",
    "<==============================>    <=================================================>",

], {
    // define the size of tile block
    tileWidth: 32,
    tileHeight: 32,
    // define what each symbol means, by a function returning a component list (what will be passed to add())
    tiles: {
        "<": () => [
            k.sprite("hpipe-start"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "=": () => [
            k.sprite("hpipe-middle"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        ">": () => [
            k.sprite("hpipe-end"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "-": () => [
            k.sprite("hpipe-short"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "A": () => [
            k.sprite("vpipe-start"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "|": () => [
            k.sprite("vpipe-middle"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "V": () => [
            k.sprite("vpipe-end"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        ":": () => [
            k.sprite("vpipe-short"),
            k.area(),
            k.body({ isStatic: true }),
        ],
        "^": () => [
            k.sprite("spike-up"),
            k.area({scale: [0.8, 0.9]}),
            "spike",
        ],
        "v": () => [
            k.sprite("spike-down"),
            k.area({scale: [0.8, 0.9]}),
            "spike",
        ],
        "i": () => [
            k.sprite("grid-vert"),
            k.area(),
            k.z(2),
            "bg",
        ],
        "$": () => [
            k.sprite("decor1"),
            k.area(),
            "bg",
        ],
        "%": () => [
            k.sprite("decor2"),
            k.area(),
            "bg",
        ],

    },
    /*
    wildcardTile: (symbol) => {
        [
            k.sprite("bg-tile1"),
            k.area(),
            "background"
        ]
        },
        */
})

const print = console.log


function centerCam(pos) {
    k.camPos(Math.trunc(pos.x), Math.trunc(pos.y))
    console.log(pos)
    console.log(k.camPos())
}

function centerCamHorizontal(pos) {
    k.camPos([Math.trunc(hero.pos.x), CAM_POS])
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

function initGame() {
    hero.moveTo(START_POS)
    hero.dead = false
    hero.jump(1)
    hero.play("jump")
    for (const box of BOXES) {
        k.add([
            k.pos(box),
            k.sprite("decor3"),
            k.area(),
            k.anchor("center"),
            k.body(),
            "box",
        ])
    }
}


function die(){
    if (!hero.dead) {
        hero.dead = true
        k.addKaboom(hero.pos),
        k.shake(SHAKE)
        k.play("hurt")
        k.wait(0.6, () => {
            k.destroyAll("box")
            initGame()
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
    k.play("hitGround", {volume: 0.5})
})


initGame()
