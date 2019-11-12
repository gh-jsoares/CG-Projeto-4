'use strict'

class SceneLight {

    KEY() { // override on subclasses
        return null
    }

    constructor(x, y, z) {
        this.createLight(x, y, z)
        this.registerEvents()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == this.KEY())
                this.toggle()
        })
    }

    update(deltatime) {
    }

    addToScene(scene) {
        scene.add(this.light)
    }

    toggle() {
        this.light.visible = !this.light.visible
    }

    createLight(x, y, z) {

    }

    reset() {
        this.light.visible = true
    }
}