'use strict'

class Ball extends SceneObject {

    static get RADIUS() {
        return 3
    }

    static get MAXSPEED() {
        return 5
    }

    static get ACCEL() {
        return 1
    }

    constructor(x, y, z) {
        super(x, y, z)
        
        let texture = Utils.loadTexture('assets/img/ball/texture.jpg')

        this.materials = [
            {
                body: new THREE.MeshBasicMaterial({
                    color: 0xFF5252,
                    wireframe: false
                }),
            },
            {
                body: new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    wireframe: false,
                    map: texture,
                    shininess: 100
                })
            }
        ]

        let geometry = new THREE.SphereGeometry(Ball.RADIUS, 12, 12)
        this.ball = new THREE.Mesh(geometry, this.materials[this.materialType].body)
        this.ball.position.set(x, y, z)

        this.objGroup.add(this.ball)
        this.reset()

        this.registerEvents()
    }

    reset() {
        this.objGroup.position.set(0, 0, 0)
        this.ball.rotation.x = 0
        this.objGroup.rotation.y = 0
        this.speed = 0
        this.stop = false
    }

    update(deltatime) {
        if(this.stop)
            this.speed = Math.max(this.speed - deltatime * Ball.ACCEL, 0)
        else
            this.speed = Math.min(this.speed + deltatime * Ball.ACCEL, Ball.MAXSPEED)
        
        this.objGroup.rotation.y += this.speed * deltatime
        this.ball.rotation.x -= this.speed * deltatime * 2
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 66) { // b
                this.stop = !this.stop
            }
        })
    }
}