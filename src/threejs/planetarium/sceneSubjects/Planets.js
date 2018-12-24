import THREE from './../../three';


export default (scene, objectsPlanets) => {

    var THREEx = THREEx || {}


    THREEx.baseURL = 'planetarium/libs/threex.planets/'


    // import toute les images des planets de la lib
    function importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
        });
        return images;
    }

    const images = importAll(require.context('../../../threejs/planetarium/libs/threex.planets/images', false, /\.(png|jpe?g|svg|gif)$/));


    THREEx.baseURL = './../libs/threex.planets/threex.planets/'

    THREEx.createSun = async function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load().load(images['sunmap.jpg']);
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })

        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createMercury = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['mercurymap.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['mercurybump.jpg']),
            bumpScale: 0.005,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createVenus = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['venusmap.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['venusbump.jpg']),
            bumpScale: 0.005,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createEarth = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['earthmap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['earthbump1k.jpg']),
            bumpScale: 0.05,
            specularMap: new THREE.TextureLoader().load(images['earthspec1k.jpg']),
            specular: new THREE.Color('grey'),
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createEarthCloud = function (radius) {
        // create destination canvas
        var canvasResult = document.createElement('canvas')
        canvasResult.width = 1024
        canvasResult.height = 512
        var contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap = new Image();
        imageMap.crossOrigin = "Anonymous";
        //imageMap.setAttribute('crossOrigin', '');
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            var canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            var contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                var contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult = contextMap.createImageData(canvasMap.width, canvasMap.height)
                for (var y = 0, offset = 0; y < imageMap.height; y++) {
                    for (var x = 0; x < imageMap.width; x++, offset += 4) {
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

        var geometry = new THREE.SphereGeometry(radius, 32, 32) // 0.51
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createMoon = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load(images['moonmap1k.jpg']);
        var material = new THREE.MeshPhongMaterial({
            //map: THREE.TextureLoader().load(THREEx.baseURL + 'images/moonmap1k.jpg'),
            map: texture,
            bumpMap: texture,
            bumpScale: 0.002,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createMars = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['marsmap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['marsbump1k.jpg']),
            bumpScale: 0.05,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createJupiter = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load(images['jupitermap.jpg'])
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.02,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createSaturn = function (radius) {

        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load(images['saturnmap.jpg'])
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })
        var mesh = new THREE.Mesh(geometry, material)

        return mesh
    }


    THREEx.createSaturnRing = function (radius) {
        // create destination canvas
        var canvasResult = document.createElement('canvas')
        canvasResult.width = 915
        canvasResult.height = 64
        var contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap = new Image();
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            var canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            var contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                var contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult = contextMap.createImageData(canvasResult.width, canvasResult.height)
                for (var y = 0, offset = 0; y < imageMap.height; y++) {
                    for (var x = 0; x < imageMap.width; x++, offset += 4) {
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

        var geometry = new THREEx._RingGeometry(radius, 0.75, 64); //0.55
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            // map		: THREE.TextureLoader().load(THREEx.baseURL+'images/ash_uvgrid01.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        var mesh = new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5, -4, 1))
        return mesh
    }


    THREEx.createUranus = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load(images['uranusmap.jpg'])
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpMap: texture,
            bumpScale: 0.05,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createUranusRing = function (radius) {
        // create destination canvas
        var canvasResult = document.createElement('canvas')
        canvasResult.width = 1024
        canvasResult.height = 72
        var contextResult = canvasResult.getContext('2d')

        // load earthcloudmap
        var imageMap = new Image();
        imageMap.addEventListener("load", function () {

            // create dataMap ImageData for earthcloudmap
            var canvasMap = document.createElement('canvas')
            canvasMap.width = imageMap.width
            canvasMap.height = imageMap.height
            var contextMap = canvasMap.getContext('2d')
            contextMap.drawImage(imageMap, 0, 0)
            var dataMap = contextMap.getImageData(0, 0, canvasMap.width, canvasMap.height)

            // load earthcloudmaptrans
            var imageTrans = new Image();
            imageTrans.addEventListener("load", function () {
                // create dataTrans ImageData for earthcloudmaptrans
                var canvasTrans = document.createElement('canvas')
                canvasTrans.width = imageTrans.width
                canvasTrans.height = imageTrans.height
                var contextTrans = canvasTrans.getContext('2d')
                contextTrans.drawImage(imageTrans, 0, 0)
                var dataTrans = contextTrans.getImageData(0, 0, canvasTrans.width, canvasTrans.height)
                // merge dataMap + dataTrans into dataResult
                var dataResult = contextMap.createImageData(canvasResult.width, canvasResult.height)
                for (var y = 0, offset = 0; y < imageMap.height; y++) {
                    for (var x = 0; x < imageMap.width; x++, offset += 4) {
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

        var geometry = new THREEx._RingGeometry(radius, 0.75, 64); //0.55
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.Texture(canvasResult),
            // map		: THREE.TextureLoader().load(THREEx.baseURL+'images/ash_uvgrid01.jpg'),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
        })
        var mesh = new THREE.Mesh(geometry, material)
        mesh.lookAt(new THREE.Vector3(0.5, -4, 1))
        return mesh
    }


    THREEx.createNeptune = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var texture = new THREE.TextureLoader().load(images['neptunemap.jpg'])
        var material = new THREE.MeshPhongMaterial({
            map: texture,
            bumpScale: 0.05,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }


    THREEx.createPluto = function (radius) {
        var geometry = new THREE.SphereGeometry(radius, 32, 32)
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load(images['plutomap1k.jpg']),
            bumpMap: new THREE.TextureLoader().load(images['plutobump1k.jpg']),
            bumpScale: 0.005,
        })
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx.createStarfield = function () {
        var texture = new THREE.TextureLoader().load(images['galaxy_starfield.png'])
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.BackSide
        })
        var geometry = new THREE.SphereGeometry(50, 32, 32)
        var mesh = new THREE.Mesh(geometry, material)
        return mesh
    }

    THREEx._RingGeometry = function (innerRadius, outerRadius, thetaSegments) {

        THREE.Geometry.call(this)

        innerRadius = innerRadius || 0
        outerRadius = outerRadius || 50
        thetaSegments = thetaSegments || 8

        var normal = new THREE.Vector3(0, 0, 1)

        for (var i = 0; i < thetaSegments; i++) {
            var angleLo = (i / thetaSegments) * Math.PI * 2
            var angleHi = ((i + 1) / thetaSegments) * Math.PI * 2

            var vertex1 = new THREE.Vector3(innerRadius * Math.cos(angleLo), innerRadius * Math.sin(angleLo), 0);
            var vertex2 = new THREE.Vector3(outerRadius * Math.cos(angleLo), outerRadius * Math.sin(angleLo), 0);
            var vertex3 = new THREE.Vector3(innerRadius * Math.cos(angleHi), innerRadius * Math.sin(angleHi), 0);
            var vertex4 = new THREE.Vector3(outerRadius * Math.cos(angleHi), outerRadius * Math.sin(angleHi), 0);

            this.vertices.push(vertex1);
            this.vertices.push(vertex2);
            this.vertices.push(vertex3);
            this.vertices.push(vertex4);


            var vertexIdx = i * 4;

            // Create the first triangle
            var face = new THREE.Face3(vertexIdx + 0, vertexIdx + 1, vertexIdx + 2, normal);
            var uvs = []

            var uv = new THREE.Vector2(0, 0)
            uvs.push(uv)
            var uv = new THREE.Vector2(1, 0)
            uvs.push(uv)
            var uv = new THREE.Vector2(0, 1)
            uvs.push(uv)

            this.faces.push(face);
            this.faceVertexUvs[0].push(uvs);

            // Create the second triangle
            var face = new THREE.Face3(vertexIdx + 2, vertexIdx + 1, vertexIdx + 3, normal);
            var uvs = []

            var uv = new THREE.Vector2(0, 1)
            uvs.push(uv)
            var uv = new THREE.Vector2(1, 0)
            uvs.push(uv)
            var uv = new THREE.Vector2(1, 1)
            uvs.push(uv)

            this.faces.push(face);
            this.faceVertexUvs[0].push(uvs);
        }

        //this.computeCentroids();
        /*
            this.computeBoundingBox();

            var centroid = new THREE.Vector3();
            centroid.addVectors( this.boundingBox.min, this.boundingBox.max );
            centroid.multiplyScalar( - 0.5 );

            centroid.applyMatrix4( mesh.matrixWorld );*/

        //

        this.computeFaceNormals();

        this.boundingSphere = new THREE.Sphere(new THREE.Vector3(), outerRadius);

    };
    THREEx._RingGeometry.prototype = Object.create(THREE.Geometry.prototype);


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
    Moon.scale.multiplyScalar(2 / 14)
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
    Neptune.scale.multiplyScalar(5 / 14)
    objectsPlanets.push(Neptune);


    //Jupiter
    var Jupiter = new THREE.Group();
    Jupiter.position.z = -8
    Jupiter.position.x = -15
    Jupiter.name = "Jupiter";

    var radJupiter = 0.5;
    var jupiMesh = THREEx.createJupiter(radJupiter)
    jupiMesh.receiveShadow = true
    jupiMesh.castShadow = true
    jupiMesh.geometry.radius = radJupiter

    Jupiter.add(jupiMesh)
    Jupiter.scale.multiplyScalar(14 / 14)
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
    Mercury.scale.multiplyScalar(2 / 14)
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
    Venus.scale.multiplyScalar(3 / 14)
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
    Mars.scale.multiplyScalar(1.5 / 14)
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
    Saturn.scale.multiplyScalar(12 / 14)
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
    Uranus.scale.multiplyScalar(5.1 / 14)
    objectsPlanets.push(Uranus);


    //sky

    var Sky = THREEx.createStarfield()
    Sky.receiveShadow = true
    Sky.castShadow = true

    scene.add(Sky);





    //Ajout de toutes les planets a la scene
    for (var i = 0; i < objectsPlanets.length; i++) {
        scene.add(objectsPlanets[i]);
        console.log(" j'ajoute a la scene la planete : " + objectsPlanets[i].name)
    }


    function update(time) {
        for (var i = 0; i < objectsPlanets.length; i++) {
            objectsPlanets[i].rotation.y += 0.0005;
            //objectsPlanets[ i ].rotation.x += 0.0004;
            //earthMesh.rotation.y += 1/32 * delta;
        }

    }

    return {
        update
    }

}
