'use strict'

class SceneManager {
    constructor() {
        this.activeScene = new THREE.Scene()
        this.activeScene.add(new THREE.AxesHelper(100))

        this.objects = []
        this.lights = []

        this.registerEvents()
    }
    
    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 87) // w
                this.objects.forEach((obj) => obj.toggleWireframe())

            if (e.keyCode == 76) // l
                this.objects.forEach((obj) => obj.toggleLightCalculations())
        })
    }
    

    addObject(object) {
        this.objects.push(object)
        object.addToScene(this.getActiveScene())
    }

    removeObject(object) {
        object.removeFromScene(this.getActiveScene())
        this.objects = this.objects.filter((obj) => obj != object)
    }

    addLight(light) {
        this.lights.push(light)
        light.addToScene(this.getActiveScene())
    }

    removeLight(light) {
        light.removeFromScene(this.getActiveScene())
        this.lights = this.lights.filter((l) => l != light)
    }

    update(deltatime) {
        this.objects.forEach((obj) => obj.update(deltatime))
    }

    getActiveScene() {
        return this.activeScene
    }
}