
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {useEffect, useState} from "react";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Fog} from "three/src/scenes/Fog";
import {gui as dat} from "dat.gui";
function House({
                   children
               }) {
    const gui = new dat.GUI()

    // Canvas
    const canvas = document.querySelector('canvas.webgl')
    // Scene
    const scene = new THREE.Scene()

    const [model, setModel] = useState()

    /**
     * Textures
     */
    const textureLoader = new THREE.TextureLoader()
    const doorTexture = textureLoader.load('textures/door/color.jpg')
    const doorAplhaTexture = textureLoader.load('textures/door/alpha.jpg')
    const doorAmbient0cclusionTexture = textureLoader.load('textures/door/ambientOcclusion.jpg')
    const doorHeightTexture = textureLoader.load('textures/door/height.jpg')
    const doorNormalTexture = textureLoader.load('textures/door/normal.jpg')
    const doorMetalnessTexture = textureLoader.load('textures/door/metalness.jpg')
    const doorRoughnessTexture = textureLoader.load('textures/door/roughness.jpg')
    const roofTexture = textureLoader.load('textures/minecraft.png')
    const bushTexture = textureLoader.load('materials/matcaps/7.png')
    const graveTexture = textureLoader.load('materials/matcaps/3.png')
    roofTexture.magFilter = THREE.NearestFilter
    roofTexture.minFilter = THREE.NearestFilter
    const brickColorTexture = textureLoader.load('textures/bricks/color.jpg')
    const brickAmbientTexture = textureLoader.load('textures/bricks/ambientOcclusion.jpg')
    const brickNormalTexture = textureLoader.load('textures/bricks/normal.jpg')
    const brickRoughnessTexture = textureLoader.load('textures/bricks/roughness.jpg')

    const grassColorTexture = textureLoader.load('textures/grass/color.jpg')
    const grassAmbientTexture = textureLoader.load('textures/grass/ambientOcclusion.jpg')
    const grassNormalTexture = textureLoader.load('textures/grass/normal.jpg')
    const grassRoughnessTexture = textureLoader.load('textures/grass/roughness.jpg')

    grassColorTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassAmbientTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)

    grassColorTexture.wrapS = THREE.RepeatWrapping
    grassNormalTexture.wrapS = THREE.RepeatWrapping
    grassAmbientTexture.wrapS = THREE.RepeatWrapping
    grassRoughnessTexture.wrapS = THREE.RepeatWrapping
    grassColorTexture.wrapT = THREE.RepeatWrapping
    grassNormalTexture.wrapT = THREE.RepeatWrapping
    grassAmbientTexture.wrapT = THREE.RepeatWrapping
    grassRoughnessTexture.wrapT = THREE.RepeatWrapping
    /**
     * House
     */
    const house = new THREE.Group()
    scene.add(house)
    const loader = new GLTFLoader();
    loader.load( 'cat2/scene.gltf', function ( gltf ) {
        house.add( gltf.scene );
        setModel(gltf)
    }, undefined, function ( error ) {

        console.error( error );

    } );



        // Ambient light
    const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
    // gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
    scene.add(ambientLight)

    // Directional light
    const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
    moonLight.position.set(4, 50, - 2)
    // gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
    // gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
    // gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
    // gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 7
    moonLight.castShadow = true
    scene.add(moonLight)

    const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
    doorLight.position.set(0, 2.2, 2.7)
    doorLight.castShadow = true
    doorLight.shadow.mapSize.width = 256
    doorLight.shadow.mapSize.height = 256
    doorLight.shadow.camera.far = 7
    house.add(doorLight)
    /**
     * Sizes
     */
    const sizes = {
        width: 400,
        height: 400
    }

    window.addEventListener('resize', () =>
    {
        // Update sizes
        sizes.width = window.innerWidth
        sizes.height = window.innerHeight

        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()

        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    /**
     * Camera
     */
        // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.x = 4
    camera.position.y = 2
    camera.position.z = 5
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor('#262837')

    /**
     * Animate
     */
    const clock = new THREE.Clock()

    const tick = () =>
    {
        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }

    tick()
    return(
        <>
            {children}
        </>
    )
}

export default House
