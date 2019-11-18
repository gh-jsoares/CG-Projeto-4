'use strict'

class PointLight extends SceneLight {
    
    KEY() {
        return 80
    }

    createLight(x, y, z) {
        this.light = new THREE.PointLight(0xFFFFFF, 1, 0)
        this.light.position.set(x, y, z)
    }
}