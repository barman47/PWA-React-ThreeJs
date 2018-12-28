import THREE from './../../three';


export default scene => {


    var geometry = new THREE.CircleGeometry(48, 50);
    var material = new THREE.LineBasicMaterial({color: 0xfff});
    var circle = new THREE.LineLoop(geometry, material);
    geometry.vertices.shift();

    circle.rotation.x = Math.PI / 2;
    circle.position.z = 0
    circle.position.x = 0
    scene.add(circle);


    //The X axis is red. The Y axis is green. The Z axis is blue.
    scene.add(new THREE.AxesHelper(8000));

    function update(time) {


    }

    return {
        update
    }


}
