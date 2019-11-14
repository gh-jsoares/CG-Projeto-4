'use strict'

class PauseWall {

    static get WIDTH() {
        return 1
    }

    static get LENGTH() {
        return 50
    }

    static get HEIGHT() {
        return 28.125
    }

    constructor(scene, x, y, z) {
        this.objGroup = new THREE.Object3D()
        this.objGroup.position.set(x, y, z)
        
        let texture = Utils.loadTexture('assets/img/pause/texture.png')

        let material = new THREE.MeshBasicMaterial({
                            color: 0xFFFFFF,
                            wireframe: false,
                            map: texture
                        })

        let geometry = new THREE.BoxGeometry(PauseWall.LENGTH, PauseWall.HEIGHT, PauseWall.WIDTH)
        let mesh = new THREE.Mesh(geometry, material)

        this.objGroup.add(mesh)
        scene.add(this.objGroup)
    }
}