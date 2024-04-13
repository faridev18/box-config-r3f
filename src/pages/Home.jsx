import React, { Suspense, useState } from 'react'
import { Canvas } from "@react-three/fiber";
import { BakeShadows, ContactShadows, Environment, OrbitControls, Plane, SpotLight } from '@react-three/drei';
import Book from '../components/Book';
import * as THREE from "three"



export default function Home() {

    const [frontImage, setFrontImage] = useState('');
    const [sideImage, setSideImage] = useState('');
    const [topImage, setTopImage] = useState('');

    const [frontPreview, setFrontPreview] = useState('');
    const [sidePreview, setSidePreview] = useState('');
    const [topPreview, setTopPreview] = useState('');

    const handleImageUpload = (setter, previewSetter) => (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setter(url);
            previewSetter(url);
        }
    }

    return (
        <div className='flex '>
            <div className=' max-w-[200px] space-y-4'>
                {[
                    { id: 'front-image', label: 'Front Image', preview: frontPreview, setPreview: setFrontPreview, setImage: setFrontImage },
                    { id: 'side-image', label: 'Side Image', preview: sidePreview, setPreview: setSidePreview, setImage: setSideImage },
                    { id: 'top-image', label: 'Top Image', preview: topPreview, setPreview: setTopPreview, setImage: setTopImage }
                ].map(({ id, label, preview, setImage, setPreview }) => (
                    <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                        <input type="file" id={id} accept="image/*" onChange={handleImageUpload(setImage, setPreview)} className="mt-1 block w-full border-gray-300 shadow-sm text-sm p-2 rounded-md" />
                        {preview && <div onChange={handleImageUpload(setImage, setPreview)} className="mt-2 p-2 border  border-gray-300 rounded-md">
                            <img src={preview} alt={`${label} Preview`}  className="max-h-40 w-auto object-cover" />
                        </div>}
                    </div>
                ))}
            </div>

            <div className='  h-screen flex-1 m-auto'>
                <Canvas
                    shadows
                    dpr={[1, 2]}
                    camera={{
                        fov: 50,
                        position: [0, 1.3, 5]
                    }}
                    onCreated={({ gl }) => {
                        gl.toneMapping = THREE.ACESFilmicToneMapping;
                        gl.outputEncoding = THREE.sRGBEncoding;
                      }}
                    className=''>
                    <OrbitControls />
                    {/* <ContactShadows opacity={1} scale={10} blur={1} far={10} resolution={256} color="#000000" /> */}
                    {/* <ambientLight intensity={1} /> */}

                    {/* <SpotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> */}
                    {/* <directionalLight castShadow position={[-1, 7, -3]} intensity={3} /> */}

                    <Suspense fallback={null}>
                        <Book frontTexture={frontImage} sideTexture={sideImage} topTexture={topImage} />
                    </Suspense>
                    {/* <Plane args={[100, 100]} receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
                        <meshStandardMaterial color="white"  />
                    </Plane> */}

                </Canvas>
            </div>
        </div>
    )
}
