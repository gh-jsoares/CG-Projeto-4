'use strict'

class Dice extends SceneObject {

    static get WIDTH() {
        return 3
    }

    constructor(x, y, z) {
        super(x, y, z)
        

        this.materials = [
            {
                body: []
            },
            {
                body: []
            }
        ]

        for (let i = 1; i <= 6; i++) {
            let texture = Utils.loadTexture(`assets/img/dice/${i}_texture.png`)
            let bump = Utils.loadTexture(`assets/img/dice/${i}_bump.png`)
            
            let material_0 = new THREE.MeshBasicMaterial({
                color: 0xFFFFFF,
                wireframe: false,
                map: texture
            })

            let material_1 = new THREE.MeshPhongMaterial({
                color: 0xFFFFFF,
                wireframe: false,
                map: texture,
                bumpMap: bump
            })

            this.materials[0].body.push(material_0)
            this.materials[1].body.push(material_1)
        }

        let geometry = new THREE.BoxGeometry(Dice.WIDTH, Dice.WIDTH, Dice.WIDTH)
        this.box = new THREE.Mesh(geometry, this.materials[this.materialType].body)
        this.box.rotation.x = Math.PI/5
        this.box.rotation.z = -Math.PI/5

        this.objGroup.add(this.box)
        this.reset()
    }

    reset() {
        super.reset()
        this.objGroup.rotation.y =0
    }

    update(deltatime) {
        this.objGroup.rotation.y += deltatime * 1
    }
}