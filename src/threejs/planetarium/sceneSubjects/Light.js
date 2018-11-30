import THREE from './../../three';

export default scene => {

    const lightAmbient = new THREE.AmbientLight(0x888888)
    scene.add(lightAmbient)

    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(5, 5, 5)
    light.castShadow = true
    light.shadow.camera.near = 0.01
    light.shadow.camera.far = 15
    light.shadow.camera.fov = 45

    light.shadow.camera.left = -1
    light.shadow.camera.right = 1
    light.shadow.camera.top = 1
    light.shadow.camera.bottom = -1

    light.shadow.bias = 0.001

    light.shadow.mapSize.width = 1024
    light.shadow.mapSize.heigh = 1024

    scene.add(light)


    function update(time) {
    }

    return {
        update
    }
}