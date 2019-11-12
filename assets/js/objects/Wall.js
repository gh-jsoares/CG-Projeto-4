'use strict'

class Wall extends SceneObject {

    static get WIDTH() {
        return 1
    }

    static get LENGTH() {
        return 50
    }

    static get HEIGHT() {
        return 28.125
    }

    constructor(x, y, z) {
        super(x, y, z)
        
        let texture = Utils.loadTexture('assets/img/pause/texture.png')

        let material = new THREE.MeshBasicMaterial({
                            color: 0xFFFFFF,
                            wireframe: false,
                            map: texture
                        })

        let geometry = new THREE.BoxGeometry(Wall.LENGTH, Wall.HEIGHT, Wall.WIDTH)
        let mesh = new THREE.Mesh(geometry, material)

        this.objGroup.add(mesh)
    }

    toggleWireframe() {

    }

    toggleLightCalculations() {

    }

    reset() {
        
    }
}