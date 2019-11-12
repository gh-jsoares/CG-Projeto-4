'use strict'
const ASPECT = Utils.getAspect()
const ORTHO_NEAR = 7
const ORTHO_FAR = 23
const PERSC_NEAR = 0.1
const PERSC_FAR = 150
const FRUSTUM_SIZE = 15
const FOV = 75

class CameraManager {
    constructor(renderer) {
        this.renderer = renderer

        this.cameras = [
            new THREE.PerspectiveCamera(FOV, ASPECT, PERSC_NEAR, PERSC_FAR),
            new THREE.OrthographicCamera(-FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE * ASPECT / 2, FRUSTUM_SIZE / 2, -FRUSTUM_SIZE / 2, ORTHO_NEAR, ORTHO_FAR)
        ]

        this.cameras[0].position.set(50, 30, 20)
        this.cameras[0].lookAt(0, 0, 0)
        this.cameras[1].position.y = 14
        this.cameras[1].lookAt(-23, 14, 0)

        this.switchView(0)
        this.registerEvents()

    }

    registerEvents() {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode >= 53 && e.keyCode <= 54) {
                let view = e.keyCode - 53
                this.switchView(view)
            }
        })

        window.addEventListener('resize', this.resize.bind(this))
    }

    getActiveCamera() {
        return this.cameras[this.activeCamera]
    }

    switchView(view) {
        this.activeCamera = view
        this.resize()
    }

    isOrthographicCamera() {
        return this.cameras[this.activeCamera] instanceof THREE.OrthographicCamera
    }

    resize() {
        if(this.isOrthographicCamera())
            this.handleOrthographicResize()
        else
            this.handlePerspectiveResize()
        
        this.cameras[this.activeCamera].updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    handlePerspectiveResize() {
        let aspect = Utils.getAspect()
        this.cameras[this.activeCamera].aspect = aspect
    }

    handleOrthographicResize() {
        let aspect = Utils.getAspect()
        if(aspect < 1) {
            aspect = Utils.getAspect(true)
            
            this.cameras[this.activeCamera].left = FRUSTUM_SIZE / -2
            this.cameras[this.activeCamera].right = FRUSTUM_SIZE / 2
            this.cameras[this.activeCamera].top = FRUSTUM_SIZE * aspect / 2
            this.cameras[this.activeCamera].bottom = -FRUSTUM_SIZE * aspect / 2
        } else {
            this.cameras[this.activeCamera].left = FRUSTUM_SIZE * aspect / -2
            this.cameras[this.activeCamera].right = FRUSTUM_SIZE * aspect / 2
            this.cameras[this.activeCamera].top = FRUSTUM_SIZE / 2
            this.cameras[this.activeCamera].bottom = -FRUSTUM_SIZE / 2
        }
    }
}