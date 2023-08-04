/*
  tiles: https://opengameart.org/content/extension-for-sci-fi-platformer-tiles-32x32
  hero: https://opengameart.org/content/animated-robot
  sounds generated in: https://sfxr.me/
*/


import kaboom from "kaboom"

const SPEED = 250
const JUMP = 800
const SHAKE = 4


const k = kaboom({ global: false })


const soundHit = k.loadSound("hurt", "/sounds/explosion.wav")

//k.camScale(1)
k.setBackground("#0c0229")

k.loadSprite("bean", "sprites/bean.png")


k.setGravity(2400)

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
            walk: { from: 0, to: 3 },
            run: { from: 5, to: 7 },
            jump: { from: 9, to: 11 },
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
    "hero"
])


k.loadSpriteAtlas("sprites/sci-fi-platformer-tiles-32x32-extension-p1.png",
                  {
                      "floor-middle": {
                          x: 0,
                          y: 0,
                          width: 32,
                          height: 32,
                          //sliceX: 32,
                      },
                      "floor-short": {
                          x: 32,
                          y: 0,
                          width: 32,
                          height: 32,
                          //sliceX: 1,
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
    "",
    "",
    "                             ^^^^^^^^^^             ",
    "                             ==========",
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
        // "$": () => [
        //     k.sprite("bean"), // "coin"
        //     k.area(),
        //     k.pos(0, -9),
        // ],
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
    "wildcardTile?": (symbol) => {
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


k.onUpdate(() => {
    if (k.isKeyDown("a")) {
        hero.move(-SPEED, 0)
        hero.flipX = true
    }
    if (k.isKeyDown("d")) {
        hero.move(SPEED, 0)
        hero.flipX = false
    }

    k.camPos([Math.trunc(hero.pos.x), 180])
})


//k.onClick(() => k.addKaboom(k.mousePos()))

function jump() {
    if (hero.isGrounded()) {
        hero.jump(JUMP)
    }
}

k.onKeyPress("space", () => {
    jump()
})
k.onKeyPress("w", () => {
    jump()
})


hero.onCollide("spike", () => {
    k.addKaboom(hero.pos),
    k.shake(SHAKE)
    k.play("hurt")
    k.wait(0.5, () => {
        hero.moveTo(START_POS)
    })
})
