import { useLoader } from "@react-three/fiber";
import * as THREE from "three"

export default function Book({ frontTexture, sideTexture, topTexture }) {

    const [front, side, top] = useLoader(TextureLoader, [frontTexture, sideTexture, topTexture].filter(Boolean));;

    const materials = [
    new THREE.MeshStandardMaterial({ map: side }),
    new THREE.MeshStandardMaterial({ map: side }),
    new THREE.MeshStandardMaterial({ map: top }),
    new THREE.MeshStandardMaterial({ map: top  }),
    new THREE.MeshStandardMaterial({ map: front  }),
    new THREE.MeshStandardMaterial({ map: front  }),]

   
    return (
        <>
            <mesh castShadow position={[0, 0, 0]} material={[...materials]} >
                <boxGeometry args={[0.8, 1, 0.1]} />
            </mesh>

           
        </>
    )
}

