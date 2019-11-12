'use strict'

class GraphicApp {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)
        
        this.clock = new THREE.Clock()
        
        this.sceneManager = new SceneManager()
        this.cameraManager = new CameraManager(this.renderer)

        this.sceneManager.addLight(new DirectionalLight(10, 18, 0))
        this.sceneManager.addLight(new PointLight(0, 7, 0))
        
        this.sceneManager.addObject(new Board(0, 0, 0))
        this.sceneManager.addObject(new Dice(0, 3, 0))
        this.sceneManager.addObject(new Ball(14, 3.5, 0))

        this.controls = new THREE.OrbitControls(this.getCamera(), this.renderer.domElement)

        this.update()
    }

    update() {
        this.renderer.setClearColor(0xDFE6E9)
        let deltatime = this.clock.getDelta()

        this.controls.update()
        this.sceneManager.update(deltatime)

        this.render()
        requestAnimationFrame(this.update.bind(this))
    }

    render() {
        this.renderer.render(this.getScene(), this.getCamera())
    }

    getScene() {
        return this.sceneManager.getActiveScene()
    }

    getCamera() {
        return this.cameraManager.getActiveCamera()
    }
}