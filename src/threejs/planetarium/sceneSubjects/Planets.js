import THREE from './../../three';
import THREEx from './../libs/threex.planets/threex.planets.js';


export default (scene , objectsPlanets) => {

    //MOON
    // containerMoon
    var Moon = new THREE.Group();
    Moon.position.z = 8
    Moon.position.x = 5
    Moon.position.y = 2
    Moon.name = "Moon";



    var radMoon = 0.5;
    var moonMesh = THREEx.createMoon(radMoon)
    moonMesh.receiveShadow = true
    moonMesh.castShadow = true
    moonMesh.geometry.radius = radMoon

    Moon.add(moonMesh)
    Moon.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Moon);

    //Neptune
    var Neptune = new THREE.Group();
    Neptune.position.z = -7
    Neptune.position.x = -4
    Neptune.position.y = 4
    Neptune.name = "Neptune";

    var radNeptune = 0.5;
    var neptuMesh = THREEx.createNeptune(radNeptune)
    neptuMesh.receiveShadow = true
    neptuMesh.castShadow = true
    neptuMesh.geometry.radius = radNeptune

    Neptune.add(neptuMesh)
    Neptune.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Neptune);


    //Jupiter
    var Jupiter = new THREE.Group();
    Jupiter.position.z = -6
    Jupiter.position.x = -6
    Jupiter.name = "Jupiter";

    var radJupiter = 0.5;
    var jupiMesh = THREEx.createJupiter(radJupiter)
    jupiMesh.receiveShadow = true
    jupiMesh.castShadow = true
    jupiMesh.geometry.radius = radJupiter

    Jupiter.add(jupiMesh)
    Jupiter.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Jupiter);


    //Mercury
    var Mercury = new THREE.Group();
    Mercury.position.z = 4
    Mercury.position.x = -3
    Mercury.position.y = -3
    Mercury.name = "Mercury";

    var radMercury = 0.5;
    var mercMesh = THREEx.createMercury(radMercury)
    mercMesh.receiveShadow = true
    mercMesh.castShadow = true

    mercMesh.geometry.radius = radMercury
    Mercury.add(mercMesh)
    Mercury.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Mercury);


    //Venus
    var Venus = new THREE.Group();
    Venus.position.z = -3
    Venus.position.x = -6
    Venus.position.y = 3
    Venus.name = "Venus";

    var radVenus = 0.5;
    var venusMesh = THREEx.createVenus(radVenus)
    venusMesh.receiveShadow = true
    venusMesh.castShadow = true

    venusMesh.geometry.radius = radVenus
    Venus.add(venusMesh)
    Venus.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Venus);

    //Mars
    var Mars = new THREE.Group();
    Mars.position.z = -2
    Mars.position.x = 8
    Mars.position.y = 5
    Mars.name = "Mars";

    var radMars = 0.5;
    var marsMesh = THREEx.createMars(radMars)
    marsMesh.receiveShadow = true
    marsMesh.castShadow = true

    marsMesh.geometry.radius = radMars
    Mars.add(marsMesh)
    Mars.scale.multiplyScalar(2 / 5)
    objectsPlanets.push(Mars);


    //Saturn
    // containerSaturn
    var Saturn = new THREE.Group();
    Saturn.position.x = 10
    Saturn.position.y = -1
    Saturn.name = "Saturn";

    var radSaturn = 0.5;
    var mesh = THREEx.createSaturn(radSaturn)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.geometry.radius = radSaturn;
    Saturn.add(mesh)

    var radRingSaturn = 0.55;
    var ring = THREEx.createSaturnRing(radRingSaturn)
    ring.receiveShadow = true
    ring.castShadow = true
    ring.geometry.radius = radRingSaturn;
    Saturn.add(ring)


    objectsPlanets.push(Saturn);


    //Uranus
    // containerUranus
    var Uranus = new THREE.Group();
    Uranus.position.z = 8
    Uranus.position.x = -2
    Uranus.name = "Uranus";


    var radUranus = 0.50;
    var mesh = THREEx.createUranus(radUranus)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.geometry.radius = radUranus;
    Uranus.add(mesh)

    var radRingUranus = 0.50;
    var ring = THREEx.createUranusRing(radRingUranus)
    ring.receiveShadow = true
    ring.castShadow = true
    ring.geometry.radius = radRingUranus;
    Uranus.add(ring)

    objectsPlanets.push(Uranus);


    //Ajout de toutes les planets a la scene
    for (var i = 0; i < objectsPlanets.length; i++) {
        scene.add(objectsPlanets[i]);
        console.log(" j'ajoute a la scene la planete : " + objectsPlanets[i].name)
    }


    this.update = function (time) {

        for (var i = 0; i < objectsPlanets.length; i++) {
            objectsPlanets[i].rotation.y += 0.0005;
            //objectsPlanets[ i ].rotation.x += 0.0004;
            //earthMesh.rotation.y += 1/32 * delta;
        }

    }

}
