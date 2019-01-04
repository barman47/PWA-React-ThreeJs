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

    //Nord
    var loader = new THREE.FontLoader();

    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var geometry = new THREE.TextGeometry('EST', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: false,
            bevelThickness: 178,
            bevelSize: 2,
            bevelSegments: 2
        });

        let material = new THREE.MeshPhongMaterial({color: 0xfff, wireframe: false});
        let text = new THREE.Mesh(geometry, material);
        text.position.x = 48
        text.position.y = 0.2
        text.position.z = -1.5 // pour que le mot soit centré
        text.rotation.y = -(Math.PI / 2)
        scene.add(text);
    });


    //Ouest
    var loader = new THREE.FontLoader();

    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var geometry = new THREE.TextGeometry('NORD', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: false,
            bevelThickness: 178,
            bevelSize: 2,
            bevelSegments: 2
        });

        let material = new THREE.MeshPhongMaterial({color: 0xfff, wireframe: false});
        let text = new THREE.Mesh(geometry, material);
        text.position.z = -48
        text.position.y = 0.2
        text.position.x = -2 // pour que le mot soit centré
        // text.rotation.y = Math.PI
        scene.add(text);
    });


    //Est
    var loader = new THREE.FontLoader();

    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var geometry = new THREE.TextGeometry('SUD', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: false,
            bevelThickness: 178,
            bevelSize: 2,
            bevelSegments: 2
        });

        let material = new THREE.MeshPhongMaterial({color: 0xfff, wireframe: false});
        let text = new THREE.Mesh(geometry, material);
        text.position.z = 48
        text.position.y = 0.2
        text.position.x = 1 // pour que le mot soit centré
        text.rotation.y = Math.PI
        scene.add(text);
    });


    //SUD
    var loader = new THREE.FontLoader();

    loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {

        var geometry = new THREE.TextGeometry('OUEST', {
            font: font,
            size: 0.8,
            height: 0.2,
            curveSegments: 10,
            bevelEnabled: false,
            bevelThickness: 178,
            bevelSize: 2,
            bevelSegments: 2
        });

        let material = new THREE.MeshPhongMaterial({color: 0xfff, wireframe: false});
        let text = new THREE.Mesh(geometry, material);
        text.position.x = -48
        text.position.y = 0.2
        text.position.z = 1.5 // pour que le mot soit centré
        text.rotation.y = Math.PI / 2
        scene.add(text);
    });


    function update(time) {


    }

    return {
        update
    }


}
