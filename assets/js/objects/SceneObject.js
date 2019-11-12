'use strict'

class SceneObject {

    constructor(x, y, z) {
        this.objGroup = new THREE.Object3D()
        this.objGroup.position.set(x, y, z)
        this.materialType = 1
        this.prevMaterialType = 0
    }

    addToScene(scene) {
        scene.add(this.objGroup)
    }
    
    removeToScene(scene) {
        scene.remove(this.objGroup)
    }

    update(deltatime) {
        
    }

    addParent(parent) {
        parent.add(this.objGroup)
    }

    toggleWireframe() {
        this.objGroup.traverse((c) => {
            if(c instanceof THREE.Mesh) c.material.wireframe = !c.material.wireframe
        })
    }

    toggleLightCalculations() {
        if (this.materialType != 0) {
            this.prevMaterialType = this.materialType
            this.materialType = 0
        } else {
            this.materialType = this.prevMaterialType
            this.prevMaterialType = 0
        }

        this.updateMaterial()
    }

    reset() {
        this.materialType = 1
        this.prevMaterialType = 0
        this.wireframe = false
        this.updateMaterial()
    }

    updateMaterial() {
        if(this.objGroup.material)
            this.objGroup.material.wireframe = this.wireframe
        this.objGroup.traverse((child) => {
            child.material = this.materials[this.materialType].body
            child.material.wireframe = this.wireframe
        })
    }
}