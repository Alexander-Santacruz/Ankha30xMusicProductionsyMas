import { useEffect, useRef, useState } from "react";

const THREE_CDN = "https://esm.sh/three@0.180.0";
const GLTF_LOADER_CDN = "https://esm.sh/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";
const ORBIT_CONTROLS_CDN = "https://esm.sh/three@0.180.0/examples/jsm/controls/OrbitControls.js";
const THREE_VRM_CDN = "https://esm.sh/@pixiv/three-vrm@3?deps=three@0.180.0";

export default function VrmViewerCard({ model, index, fullScreen = false, onOpen }) {
    const mountRef = useRef(null);
    const controlsRef = useRef(null);
    const cameraRef = useRef(null);
    const baseFrameRef = useRef(null);
    const modelBaseYRef = useRef(0);
    const [status, setStatus] = useState("Cargando visor...");
    useEffect(() => {
        let renderer;
        let scene;
        let camera;
        let controls;
        let frameId = 0;
        let currentVrm;
        let active = true;
        let mixerRoot;
        let studioGlow;

        async function setupViewer() {
            try {
                const THREE = await import(/* @vite-ignore */ THREE_CDN);
                const { GLTFLoader } = await import(/* @vite-ignore */ GLTF_LOADER_CDN);
                const { OrbitControls } = await import(/* @vite-ignore */ ORBIT_CONTROLS_CDN);
                const { VRMLoaderPlugin, VRMUtils } = await import(/* @vite-ignore */ THREE_VRM_CDN);

                if (!active || !mountRef.current) {
                    return;
                }

                scene = new THREE.Scene();
                scene.background = new THREE.Color("#08101d");
                scene.fog = new THREE.Fog("#08101d", 6, 12);

                camera = new THREE.PerspectiveCamera(24, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 100);
                camera.position.set(0, 1.35, 3.25);

                renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
                renderer.outputColorSpace = THREE.SRGBColorSpace;
                mountRef.current.innerHTML = "";
                mountRef.current.appendChild(renderer.domElement);

                controls = new OrbitControls(camera, renderer.domElement);
                controlsRef.current = controls;
                cameraRef.current = camera;
                controls.enablePan = false;
                controls.enableDamping = true;
                controls.enableZoom = true;
                controls.minDistance = 2.2;
                controls.maxDistance = 5.2;
                controls.minPolarAngle = Math.PI / 2.5;
                controls.maxPolarAngle = Math.PI / 1.8;
                controls.target.set(0, 0.95, 0);

                const hemiLight = new THREE.HemisphereLight("#dff7ff", "#07101d", 1.85);
                const keyLight = new THREE.DirectionalLight("#ffffff", 2.4);
                keyLight.position.set(1.8, 2.6, 2.6);
                const fillLight = new THREE.DirectionalLight("#7fdcff", 1.35);
                fillLight.position.set(-2.2, 1.35, 1.4);
                const rimLight = new THREE.DirectionalLight("#a78bff", 1.5);
                rimLight.position.set(-1.8, 1.8, -2.4);
                scene.add(hemiLight, keyLight, fillLight, rimLight);

                const backdrop = new THREE.Mesh(
                    new THREE.SphereGeometry(7, 48, 48),
                    new THREE.MeshBasicMaterial({
                        color: "#0b1628",
                        side: THREE.BackSide
                    })
                );
                scene.add(backdrop);

                studioGlow = new THREE.Mesh(
                    new THREE.CircleGeometry(1.8, 64),
                    new THREE.MeshBasicMaterial({
                        color: "#5bd7ff",
                        transparent: true,
                        opacity: 0.14,
                        depthWrite: false
                    })
                );
                studioGlow.position.set(0, 1.35, -1.35);
                scene.add(studioGlow);

                const floor = new THREE.Mesh(
                    new THREE.CircleGeometry(1.7, 64),
                    new THREE.MeshStandardMaterial({
                        color: "#0c1830",
                        emissive: "#0e1e3f",
                        metalness: 0.18,
                        roughness: 0.8
                    })
                );
                floor.rotation.x = -Math.PI / 2;
                floor.position.y = -1.08;
                scene.add(floor);

                const pedestal = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.68, 0.82, 0.2, 48),
                    new THREE.MeshStandardMaterial({
                        color: "#112241",
                        emissive: "#10203d",
                        metalness: 0.22,
                        roughness: 0.58
                    })
                );
                pedestal.position.y = -0.98;
                scene.add(pedestal);

                const loader = new GLTFLoader();
                loader.register((parser) => new VRMLoaderPlugin(parser));

                loader.load(
                    model.url,
                    (gltf) => {
                        if (!active) {
                            return;
                        }

                        currentVrm = gltf.userData.vrm;

                        if (!currentVrm) {
                            setStatus("No se pudo mostrar el modelo.");
                            return;
                        }

                        VRMUtils.removeUnnecessaryVertices(gltf.scene);
                        VRMUtils.removeUnnecessaryJoints(gltf.scene);
                        mixerRoot = currentVrm.scene;
                        scene.add(mixerRoot);
                        mixerRoot.rotation.y = Math.PI;

                        const bounds = new THREE.Box3().setFromObject(mixerRoot);
                        const size = bounds.getSize(new THREE.Vector3());
                        const center = bounds.getCenter(new THREE.Vector3());
                        const height = Math.max(size.y, 1.45);

                        mixerRoot.position.x -= center.x;
                        mixerRoot.position.y += -bounds.min.y - 1.02;
                        mixerRoot.position.z -= center.z;
                        modelBaseYRef.current = mixerRoot.position.y;

                        controls.target.set(0, height * 0.48, 0);
                        camera.position.set(0, height * 0.58, Math.max(2.85, height * 1.45));
                        controls.minDistance = Math.max(2.3, height * 1.18);
                        controls.maxDistance = Math.max(4.4, height * 1.92);
                        baseFrameRef.current = {
                            targetY: height * 0.48,
                            cameraY: height * 0.58,
                            cameraZ: Math.max(2.85, height * 1.45)
                        };
                        controls.update();

                        if (studioGlow) {
                            studioGlow.scale.setScalar(Math.max(1, height * 0.92));
                            studioGlow.position.y = height * 0.62;
                        }

                        setStatus("Vista protegida");
                    },
                    undefined,
                    () => {
                        if (active) {
                            setStatus("No se pudo cargar el modelo.");
                        }
                    }
                );

                const clock = new THREE.Clock();

                const handleResize = () => {
                    if (!mountRef.current || !renderer || !camera) {
                        return;
                    }

                    const { clientWidth, clientHeight } = mountRef.current;
                    camera.aspect = clientWidth / clientHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(clientWidth, clientHeight);
                };

                window.addEventListener("resize", handleResize);

                const renderLoop = () => {
                    if (!active || !renderer || !scene || !camera) {
                        return;
                    }

                    const delta = clock.getDelta();

                    if (currentVrm) {
                        currentVrm.update(delta);
                        currentVrm.scene.rotation.y = Math.PI + Math.sin(clock.elapsedTime * 0.65) * 0.08;
                        currentVrm.scene.position.y = modelBaseYRef.current + Math.sin(clock.elapsedTime * 1.2) * 0.025;
                    }

                    controls.update();
                    renderer.render(scene, camera);
                    frameId = window.requestAnimationFrame(renderLoop);
                };

                handleResize();
                renderLoop();

                return () => window.removeEventListener("resize", handleResize);
            } catch {
                if (active) {
                    setStatus("No se pudo iniciar el visor.");
                }
            }
        }

        let cleanupResize;

        setupViewer().then((cleanup) => {
            cleanupResize = cleanup;
        });

        return () => {
            active = false;
            if (cleanupResize) {
                cleanupResize();
            }
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }
            if (controls) {
                controls.dispose();
            }
            if (renderer) {
                renderer.dispose();
            }
            if (scene) {
                scene.traverse((child) => {
                    if (child.geometry) {
                        child.geometry.dispose?.();
                    }

                    const material = child.material;

                    if (Array.isArray(material)) {
                        material.forEach((item) => item.dispose?.());
                    } else {
                        material?.dispose?.();
                    }
                });
            }
        };
    }, [model.url]);

    useEffect(() => {
        const controls = controlsRef.current;
        const camera = cameraRef.current;
        const frame = baseFrameRef.current;

        if (!controls || !camera || !frame) {
            return;
        }

        controls.target.set(0, frame.targetY, 0);
        camera.position.set(0, frame.cameraY, fullScreen ? frame.cameraZ * 0.72 : frame.cameraZ);
        controls.minDistance = fullScreen ? Math.max(1.9, frame.cameraZ * 0.55) : Math.max(2.3, frame.cameraZ * 0.82);
        controls.maxDistance = fullScreen ? Math.max(4.2, frame.cameraZ * 1.65) : Math.max(4.4, frame.cameraZ * 1.92);
        controls.update();
    }, [fullScreen]);

    function handleOpenViewer() {
        if (onOpen) {
            onOpen(model.id);
        }
    }

    return (
        <article className={fullScreen ? "vrm-card is-expanded is-fullscreen" : "vrm-card"}>
            <button className="vrm-stage-button" type="button" onClick={handleOpenViewer}>
                <div className="vrm-stage" ref={mountRef} />
            </button>
            <div className="vrm-card-body">
                <span className="vrm-badge">VRM {index + 1}</span>
                <h3>{model.name}</h3>
                <p>{model.filename}</p>
                <span className="vrm-size">{model.size}</span>
                <div className="vrm-meta">
                    <span>{status}</span>
                    <span>{fullScreen ? "Vista completa activa" : "Toque el visor para abrir el modelo"}</span>
                </div>
            </div>
        </article>
    );
}
