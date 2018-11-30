
function EarthPlanet() {

    // containerEarth
    var Earth = new THREE.Group();
    Earth.position.z = 0;  //The X axis is red. The Y axis is green. The Z axis is blue.
    Earth.name = "Earth";


    var radEarth = 0.5;
    var earthMesh = THREEx.Planets.createEarth(radEarth)
    earthMesh.receiveShadow = true
    earthMesh.castShadow = true
    earthMesh.geometry.radius = radEarth;
    Earth.add(earthMesh)

    var radAtmosphere = 0.5;
    var geometry = new THREE.SphereGeometry(radAtmosphere, 32, 32)
    var material = THREEx.createAtmosphereMaterial()
    material.uniforms.glowColor.value.set(0x00b3ff)
    material.uniforms.coeficient.value = 0.8
    material.uniforms.power.value = 2.0
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(1.01);
    mesh.geometry.radius = radAtmosphere;
    Earth.add(mesh);

    var radAtmosphere = 0.5;
    var geometry = new THREE.SphereGeometry(radAtmosphere, 32, 32)
    var material = THREEx.createAtmosphereMaterial()
    material.side = THREE.BackSide
    material.uniforms.glowColor.value.set(0x00b3ff)
    material.uniforms.coeficient.value = 0.5
    material.uniforms.power.value = 4.0
    var mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(1.15);
    mesh.geometry.radius = radAtmosphere;
    Earth.add(mesh);
    // new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

    var radCloud = 0.51;
    var earthCloud = THREEx.Planets.createEarthCloud(radCloud)
    earthCloud.receiveShadow = true
    earthCloud.castShadow = true
    earthCloud.geometry.radius = radCloud;
    Earth.add(earthCloud)
    Earth.scale.multiplyScalar(5 / 5)


    //objectsPlanets.push( Earth );
    scene.add(Earth);

    this.update = function(time) {
        earthCloud.rotation.y += 0.008 ;

    }

}

