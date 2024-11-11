import React from "react";
import { useGLTF } from "@react-three/drei";
import k from "../../../assets/nexbot_robot_character_concept.glb";
function AvatarModel() {
  const { scene } = useGLTF({ k });
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: child.material.color,
      });
    }
  });
  console.log(scene); // Check if the model is being loaded
  return <primitive object={gltf.scene} scale={1} />;
}
export default AvatarModel;
