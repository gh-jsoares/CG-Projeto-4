'use strict'

class Board extends SceneObject {

    static get HEIGHT() {
        return 1
    }

    static get LENGTH() {
        return 50
    }

    constructor(x, y, z) {
        super(x, y, z)
        
        let texture = Utils.loadTexture('assets/img/board/texture.png')
        let bump = Utils.loadTexture('assets/img/board/bump.png')

        this.materials = [
            {
                body: new THREE.MeshBasicMaterial({
                    color: 0xCD6133,
                    wireframe: false,
                    map: texture
                }),
            },
            {
                body: new THREE.MeshPhongMaterial({
                    color: 0xFFFFFF,
                    wireframe: false,
                    map: texture,
                    bumpMap: bump
                })
            }
        ]

        let geometry = new THREE.BoxGeometry(Board.LENGTH, Board.HEIGHT, Board.LENGTH)
        let mesh = new THREE.Mesh(geometry, this.materials[this.materialType].body)

        this.objGroup.add(mesh)
    }
}