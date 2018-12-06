import THREE from './../../three';
//import THREEx from "../libs/threex.planets/threex.planets";
import stars_bg from '../../../textures/stars_bg.png';

export default async scene => {

    const geometry = new THREE.SphereBufferGeometry(90, 60, 40);
// invert the geometry on the x-axis so that all of the faces point inward
    geometry.scale(-1, 1, 1);

    var material = new THREE.MeshBasicMaterial({
        //color: 0xFF0000
        //map: new THREE.TextureLoader().load( 'textures/maison_bg.jpg' )
        // map: new THREE.TextureLoader().load("data:image/png;base64,
        map: new THREE.TextureLoader().load(stars_bg)

    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


    function update(time) {
    }

    return {
        update
    }

}

