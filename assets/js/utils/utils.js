'use strict'

class Utils {

    static getAspect(inverted = false) {
        return inverted ? window.innerHeight / window.innerWidth : window.innerWidth / window.innerHeight
    }

    static loadTexture(url) {
        return new THREE.TextureLoader().load(url, (texture) => {
            console.log(`Loaded texture ${url} successfully`)
        }, undefined, (err) => {
            console.error(`Failed to load texture ${url}\n${err}`)
        })
    }
}