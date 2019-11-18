'use strict'

class DirectionalLight extends SceneLight {

    KEY() {
        return 68
    }

    createLight(x, y, z, tx, ty, tz) {
        this.light = new THREE.DirectionalLight(0xFFFFFF, 1)

        this.light.position.set(x, y, z).normalize()
        this.light.target.position.set(-24, 0, 0).normalize()
    }

    addToScene(scene) {
        super.addToScene(scene)
        scene.add(this.light.target)
    }
}