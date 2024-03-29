'use strict'

class GraphicApp {
    constructor() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: app})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        
        this.clock = new THREE.Clock()
        
        this.sceneManager = new SceneManager()
        this.cameraManager = new CameraManager(this.renderer)

        this.sceneManager.addLight(new DirectionalLight(10, 18, 0))
        this.sceneManager.addLight(new PointLight(7, 3, 0))
        
        this.sceneManager.addObject(new Board(0, 0, 0))
        this.sceneManager.addObject(new Dice(0, 3, 0))
        this.sceneManager.addObject(new Ball(14, 3.5, 0))

        this.controls = new THREE.OrbitControls(this.getCamera(), this.renderer.domElement)

        this.paused = false

        this.registerEvents()
        this.update()
    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 83) // s
                this.togglePause()
            if (e.keyCode == 82 && this.paused) // r
                this.reset()
        })
    }

    toggleControls() {
        document.getElementById('controls').style.display = this.paused ? 'none' : 'block'
    }
    
    reset() {
        this.sceneManager.reset()
        this.togglePause()
    }

    togglePause() {
        this.paused = !this.paused
        this.toggleControls()

        if(this.paused)
            this.cameraManager.switchView(1)
        else
            this.cameraManager.switchView(0)
    }

    update() {
        this.renderer.setClearColor(0xDFE6E9)
        let deltatime = this.clock.getDelta()

        if(!this.paused) {
            this.controls.update()
            this.sceneManager.update(deltatime)
        }

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