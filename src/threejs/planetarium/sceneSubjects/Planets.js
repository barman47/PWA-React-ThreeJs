import THREE from './../../three';


export default (scene, objectsPlanets) => {

    let THREEx = THREEx || {}

    THREEx.baseURL = 'planetarium/libs/threex.planets/'


    // import toute les images des planets de la lib
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
            return null;
        });
        return images;
    }

    const images = importAll(require.context('../../../threejs/planetarium/libs/threex.planets/images', false, /\.(png|jpe?g|svg|gif)$/));


    THREEx.baseURL = './../libs/threex.planets/threex.planets/'

    THREEx.createSun = async function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load().load(images['sunmap.jpg']);
        let material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })

        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createMercury = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['mercurymap.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['mercurybump.jpg']),
            bumpScale: 0.005,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createVenus = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['venusmap.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['venusbump.jpg']),
            bumpScale: 0.005,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createEarth = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['earthmap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['earthbump1k.jpg']),
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load(images['earthspec1k.jpg']),
            specular: new THREE.Color('grey'),
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createEarthCloud = function (radius) {
        // create destination canvas
        let canvasResult = document.createElement('canvas')
        canvasResult.width = 1024
        canvasResult.height = 512
        let contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        let imageMap = new Image();
        imageMap.crossOrigin = "Anonymous";
        //imageMap.setAttribute('crossOrigin', '');
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            let canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            let contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            let imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                let canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                let contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                let dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                let dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
                for (let y = 0, offset = 0; y < imageMap.height; y++) {
                    for (let x = 0; x < imageMap.width; x++, offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0]
                        dataResult.data[offset + 1] = dataMap.data[offset + 1]
                        dataResult.data[offset + 2] = dataMap.data[offset + 2]
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0]
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult, 0, 0)
                material.map.needsUpdate = true;
            })
            imageTrans.src = THREEx.baseURL + 'images/earthcloudmaptrans.jpg';
        }, false);
        imageMap.src = THREEx.baseURL + 'images/earthcloudmap.jpg';

        let geometry = new THREE.SphereGeometry(radius, 32, 32) // 0.51
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createMoon = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load(images['moonmap1k.jpg']);
        let material = new THREE.MeshPhongMaterial({
            //map: THREE.TextureLoader().load(THREEx.baseURL + 'images/moonmap1k.jpg'),
            map: texture,
            bumpMap: texture,
            bumpScale: 0.002,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createMars = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['marsmap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['marsbump1k.jpg']),
            bumpScale: 0.05,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createJupiter = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load(images['jupitermap.jpg'])
        let material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.02,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createSaturn = function (radius) {

        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load(images['saturnmap.jpg'])
        let material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })
        let mesh = new THREE.Mesh(geometry, material)

        return mesh
    }


    THREEx.createSaturnRing = function (radius) {
        // create destination canvas
        let canvasResult = document.createElement('canvas')
        canvasResult.width = 915
        canvasResult.height = 64
        let contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        let imageMap = new Image();
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            let canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            let contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            let imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                let canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                let contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                let dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                let dataResult = contextMap.createImageData(canvasResult.width, canvasResult.height)
                for (let y = 0, offset = 0; y < imageMap.height; y++) {
                    for (let x = 0; x < imageMap.width; x++, offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0]
                        dataResult.data[offset + 1] = dataMap.data[offset + 1]
                        dataResult.data[offset + 2] = dataMap.data[offset + 2]
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 4
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult, 0, 0)
                material.map.needsUpdate = true;
            })
            imageTrans.src = images['saturnringpattern.gif'];
        }, false);
        imageMap.src = images['saturnringcolor.jpg'];

        let geometry = new THREEx._RingGeometry(radius, 0.75, 64); //0.55
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            // map		: THREE.TextureLoader().load(THREEx.baseURL+'images/ash_uvgrid01.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        let mesh = new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5, -4, 1))
        return mesh
    }


    THREEx.createUranus = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load(images['uranusmap.jpg'])
        let material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createUranusRing = function (radius) {
        // create destination canvas
        let canvasResult = document.createElement('canvas')
        canvasResult.width = 1024
        canvasResult.height = 72
        let contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        let imageMap = new Image();
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            let canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            let contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            let dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            let imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                let canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                let contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                let dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                let dataResult = contextMap.createImageData(canvasResult.width, canvasResult.height)
                for (let y = 0, offset = 0; y < imageMap.height; y++) {
                    for (let x = 0; x < imageMap.width; x++, offset += 4) {
                        dataResult.data[offset + 0] = dataMap.data[offset + 0]
                        dataResult.data[offset + 1] = dataMap.data[offset + 1]
                        dataResult.data[offset + 2] = dataMap.data[offset + 2]
                        dataResult.data[offset + 3] = 255 - dataTrans.data[offset + 0] / 2
                    }
                }
                // update texture with result
                contextResult.putImageData(dataResult, 0, 0)
                material.map.needsUpdate = true;
            })
            imageTrans.src = images['uranusringtrans.gif'];
        }, false);
        imageMap.src = images['uranusringcolour.jpg'];

        let geometry = new THREEx._RingGeometry(radius, 0.75, 64); //0.55
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            // map		: THREE.TextureLoader().load(THREEx.baseURL+'images/ash_uvgrid01.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        let mesh = new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5, -4, 1))
        return mesh
    }


    THREEx.createNeptune = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let texture = new THREE.TextureLoader().load(images['neptunemap.jpg'])
        let material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpScale: 0.05,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createPluto = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['plutomap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['plutobump1k.jpg']),
            bumpScale: 0.005,
        })
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createStarfield = function () {
        let texture = new THREE.TextureLoader().load(images['galaxy_starfield.png'])
        let material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        })
        let geometry = new THREE.SphereGeometry(50, 32, 32)
        let mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx._RingGeometry = function (innerRadius, outerRadius, thetaSegments) {

        THREE.Geometry.call(this)

        innerRadius = innerRadius || 0
        outerRadius = outerRadius || 50
        thetaSegments = thetaSegments || 8

        let normal = new THREE.Vector3(0, 0, 1)

        for (let i = 0; i < thetaSegments; i++) {
            let angleLo = (i / thetaSegments) * Math.PI * 2
            let angleHi = ((i + 1) / thetaSegments) * Math.PI * 2

            let vertex1 = new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
            let vertex2 = new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
            let vertex3 = new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
            let vertex4 = new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

            this.vertices.push(vertex1);
            this.vertices.push(vertex2);
            this.vertices.push(vertex3);
            this.vertices.push(vertex4);


            let vertexIdx = i * 4;

            // Create the first triangle
            let face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
            let uvs = []

            let uv = new THREE.Vector2(0, 0)
            uvs.push(uv)
            uv = new THREE.Vector2(1, 0)
            uvs.push(uv)
            uv = new THREE.Vector2(0, 1)
            uvs.push(uv)

            this.faces.push(face);
            this.faceVertexUvs[0].push(uvs);

            // Create the second triangle
            face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
            uvs = []

            uv = new THREE.Vector2(0, 1)
            uvs.push(uv)
            uv = new THREE.Vector2(1, 0)
            uvs.push(uv)
            uv = new THREE.Vector2(1, 1)
            uvs.push(uv)

            this.faces.push(face);
            this.faceVertexUvs[0].push(uvs);
        }

        this.computeFaceNormals();

        this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);

    };
    THREEx._RingGeometry.prototype = Object.create(THREE.Geometry.prototype);


    //MOON
    // containerMoon
    let Moon = new THREE.Group();
    Moon.position.z = 8
    Moon.position.x = 5
    Moon.position.y = 2
    Moon.name = "Moon";


    let radMoon = 0.5;
    let moonMesh = THREEx.createMoon(radMoon)

    moonMesh.receiveShadow = true
    moonMesh.castShadow = true
    moonMesh.geometry.radius = radMoon

    Moon.add(moonMesh)
    Moon.scale.multiplyScalar(2 / 14)
    objectsPlanets.push(Moon);

    //Neptune
    let Neptune = new THREE.Group();
    Neptune.position.z = -7
    Neptune.position.x = -4
    Neptune.position.y = 4
    Neptune.name = "Neptune";

    let radNeptune = 0.5;
    let neptuMesh = THREEx.createNeptune(radNeptune)
    neptuMesh.receiveShadow = true
    neptuMesh.castShadow = true
    neptuMesh.geometry.radius = radNeptune

    Neptune.add(neptuMesh)
    Neptune.scale.multiplyScalar(5 / 14)
    objectsPlanets.push(Neptune);


    //Jupiter
    let Jupiter = new THREE.Group();
    Jupiter.position.z = -8
    Jupiter.position.x = -15
    Jupiter.name = "Jupiter";

    let radJupiter = 0.5;
    let jupiMesh = THREEx.createJupiter(radJupiter)
    jupiMesh.receiveShadow = true
    jupiMesh.castShadow = true
    jupiMesh.geometry.radius = radJupiter

    Jupiter.add(jupiMesh)
    Jupiter.scale.multiplyScalar(14 / 14)
    objectsPlanets.push(Jupiter);


    //Mercury
    let Mercury = new THREE.Group();
    Mercury.position.z = 4
    Mercury.position.x = -3
    Mercury.position.y = -3
    Mercury.name = "Mercury";

    let radMercury = 0.5;
    let mercMesh = THREEx.createMercury(radMercury)
    mercMesh.receiveShadow = true
    mercMesh.castShadow = true

    mercMesh.geometry.radius = radMercury
    Mercury.add(mercMesh)
    Mercury.scale.multiplyScalar(2 / 14)
    objectsPlanets.push(Mercury);


    //Venus
    let Venus = new THREE.Group();
    Venus.position.z = -3
    Venus.position.x = -6
    Venus.position.y = 3
    Venus.name = "Venus";

    let radVenus = 0.5;
    let venusMesh = THREEx.createVenus(radVenus)
    venusMesh.receiveShadow = true
    venusMesh.castShadow = true

    venusMesh.geometry.radius = radVenus
    Venus.add(venusMesh)
    Venus.scale.multiplyScalar(3 / 14)
    objectsPlanets.push(Venus);

    //Mars
    let Mars = new THREE.Group();
    Mars.position.z = -2
    Mars.position.x = 8
    Mars.position.y = 5
    Mars.name = "Mars";

    let radMars = 0.5;
    let marsMesh = THREEx.createMars(radMars)
    marsMesh.receiveShadow = true
    marsMesh.castShadow = true

    marsMesh.geometry.radius = radMars
    Mars.add(marsMesh)
    Mars.scale.multiplyScalar(1.5 / 14)
    objectsPlanets.push(Mars);


    //Saturn
    // containerSaturn
    let Saturn = new THREE.Group();
    Saturn.position.x = 10
    Saturn.position.y = -1
    Saturn.name = "Saturn";

    let radSaturn = 0.5;
    let mesh = THREEx.createSaturn(radSaturn)
    mesh.receiveShadow = true
    mesh.castShadow = true
    mesh.geometry.radius = radSaturn;
    Saturn.add(mesh)

    let radRingSaturn = 0.55;
    let ringSaturn = THREEx.createSaturnRing(radRingSaturn)
    ringSaturn.receiveShadow = true
    ringSaturn.castShadow = true
    ringSaturn.geometry.radius = radRingSaturn;
    Saturn.add(ringSaturn)
    Saturn.scale.multiplyScalar(12 / 14)
    objectsPlanets.push(Saturn);


    //Uranus
    // containerUranus
    let Uranus = new THREE.Group();
    Uranus.position.z = 8
    Uranus.position.x = -2
    Uranus.name = "Uranus";


    let radUranus = 0.50;
    let meshUranus = THREEx.createUranus(radUranus)
    meshUranus.receiveShadow = true
    meshUranus.castShadow = true
    meshUranus.geometry.radius = radUranus;
    Uranus.add(meshUranus)

    let radRingUranus = 0.50;
    let ringUranus = THREEx.createUranusRing(radRingUranus)
    ringUranus.receiveShadow = true
    ringUranus.castShadow = true
    ringUranus.geometry.radius = radRingUranus;
    Uranus.add(ringUranus)
    Uranus.scale.multiplyScalar(5.1 / 14)
    objectsPlanets.push(Uranus);


    //sky

    let Sky = THREEx.createStarfield()
    Sky.receiveShadow = true
    Sky.castShadow = true

    scene.add(Sky);


    //Ajout de toutes les planets a la scene
    for (let i = 0; i < objectsPlanets.length; i++) {
        scene.add(objectsPlanets[i]);
    }


    function update(time) {
        for (let i = 0; i < objectsPlanets.length; i++) {
            objectsPlanets[i].rotation.y += 0.0005;
        }

    }

    return {
        update
    }

}
