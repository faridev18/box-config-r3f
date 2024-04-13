import { useRef, useState, useEffect } from 'react';
import { useLoader, useThree, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshBasicMaterial, BoxGeometry } from 'three';
import * as THREE from "three"

export default function Book({ frontTexture, sideTexture, topTexture }) {
    const meshRef = useRef();
    const { scene } = useThree();
    const [boxSize, setBoxSize] = useState({ width: 1, height: 1.5, depth: 0.1 });

    const textures = useLoader(TextureLoader, [frontTexture, sideTexture, topTexture].filter(Boolean));

    useEffect(() => {
        if (textures.length === 3) {
            const [front, side, top] = textures;

            // Supposons que la texture de côté représente la hauteur du livre et sa profondeur,
            // et que la texture de devant représente la largeur et la hauteur.
            const height = side.image.height;
            const depth = side.image.width;
            const width = front.image.width;

            // Mise à l'échelle pour s'assurer que le livre reste gérable à l'écran.
            // Cette partie dépend de comment vous souhaitez afficher le livre.
            const scaleFactor = 3;
            setBoxSize({
                width: (width / height) * scaleFactor,
                height: scaleFactor,
                depth: (depth / height) * scaleFactor
            });
        }
    }, [textures]);

    useEffect(() => {
        if (textures.length === 3 && meshRef.current) {
            const [front, side, top] = textures;
            const materials = [
                new MeshBasicMaterial({ map: side }),
                new MeshBasicMaterial({ map: side }),
                new MeshBasicMaterial({ map: top }),
                new MeshBasicMaterial({ map: top }),
                new MeshBasicMaterial({ map: front }),
                new MeshBasicMaterial({ map: front }),
            ];

            const boxGeometry = new BoxGeometry(boxSize.width, boxSize.height, boxSize.depth);
            meshRef.current.geometry = boxGeometry;
            meshRef.current.material = materials;
            meshRef.current.scale.set(1, 1, 1); 
        }
    }, [boxSize]);

    useFrame(() => {
        if (meshRef.current) {
            //animations 
        }
    });

    if (!meshRef.current && textures.length === 3) {
        const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1.5, 0.1));
        cube.name = "bookCube";
        meshRef.current = cube;
        scene.add(cube);
    }

    return null;
}
