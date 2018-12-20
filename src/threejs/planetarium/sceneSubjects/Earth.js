import THREE from './../../three';


export default scene => {

    let THREEx = {}


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


    THREEx.createEarth = function (radius) {
        let geometry = new THREE.SphereGeometry(radius, 32, 32)
        let material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture(images['earthmap1k.jpg']),
            bumpMap: THREE.ImageUtils.loadTexture(images['earthbump1k.jpg']),
            bumpScale: 0.05,
            specularMap: THREE.ImageUtils.loadTexture(images['earthspec1k.jpg']),
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
            imageTrans.src = images['earthcloudmaptrans.jpg'];
        }, false);
        imageMap.src = images['earthcloudmap.jpg'];

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

    let THREExAtmo = {}


    /**
     * from http://stemkoski.blogspot.fr/2013/07/shaders-in-threejs-glow-and-halo.html
     * @return {[type]} [description]
     */
    THREExAtmo.createAtmosphereMaterial = function () {
        let vertexShader = [
            'varying vec3	vVertexWorldPosition;',
            'varying vec3	vVertexNormal;',

            'void main(){',
            '	vVertexNormal	= normalize(normalMatrix * normal);',

            '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;',

            '	// set gl_Position',
            '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
            '}',

        ].join('\n')
        let fragmentShader = [
            'uniform vec3	glowColor;',
            'uniform float	coeficient;',
            'uniform float	power;',

            'varying vec3	vVertexNormal;',
            'varying vec3	vVertexWorldPosition;',

            'void main(){',
            '	vec3 worldCameraToVertex= vVertexWorldPosition - cameraPosition;',
            '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;',
            '	viewCameraToVertex	= normalize(viewCameraToVertex);',
            '	float intensity		= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
            '	gl_FragColor		= vec4(glowColor, intensity);',
            '}',
        ].join('\n')

        // create custom material from the shader code above
        //   that is within specially labeled script tags
        let material = new THREE.ShaderMaterial({
            uniforms: {
                coeficient: {
                    type: "f",
                    value: 1.0
                },
                power: {
                    type: "f",
                    value: 2
                },
                glowColor: {
                    type: "c",
                    value: new THREE.Color('pink')
                },
            },
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            //blending	: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false,
        });
        return material
    }


    // containerEarth
    let Earth = new THREE.Group();
    Earth.position.z = 0;  //The X axis is red. The Y axis is green. The Z axis is blue.
    Earth.name = "Earth";


    let radEarth = 0.5;
    let earthMesh = THREEx.createEarth(radEarth)
    earthMesh.receiveShadow = true
    earthMesh.castShadow = true
    earthMesh.geometry.radius = radEarth;
    Earth.add(earthMesh)

    let radAtmosphere = 0.5;
    let geometry = new THREE.SphereGeometry(radAtmosphere, 32, 32)
    let material = THREExAtmo.createAtmosphereMaterial()
    material.uniforms.glowColor.value.set(0x00b3ff)
    material.uniforms.coeficient.value = 0.8
    material.uniforms.power.value = 2.0
    let mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(1.01);
    mesh.geometry.radius = radAtmosphere;
    Earth.add(mesh);

    radAtmosphere = 0.5;
    geometry = new THREE.SphereGeometry(radAtmosphere, 32, 32)
    material = THREExAtmo.createAtmosphereMaterial()
    material.side = THREE.BackSide
    material.uniforms.glowColor.value.set(0x00b3ff)
    material.uniforms.coeficient.value = 0.5
    material.uniforms.power.value = 4.0
    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.multiplyScalar(1.15);
    mesh.geometry.radius = radAtmosphere;
    Earth.add(mesh);
    // new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

    let radCloud = 0.51;
    let earthCloud = THREEx.createEarthCloud(radCloud)
    earthCloud.receiveShadow = true
    earthCloud.castShadow = true
    earthCloud.geometry.radius = radCloud;
    Earth.add(earthCloud)
    Earth.scale.multiplyScalar(5 / 5)


    //objectsPlanets.push( Earth );
    scene.add(Earth);


    function update(time) {
        earthCloud.rotation.y += 0.008;

    }

    return {
        update
    }



}