'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

  // Component để tạo đường nối động giữa các nodes
  const DynamicConnectionLine = ({ startIndex, endIndex, material, nodesGroup }: { 
    startIndex: number, 
    endIndex: number, 
    material: THREE.ShaderMaterial,
    nodesGroup: React.RefObject<THREE.Group>
  }) => {
    const meshRef = useRef<THREE.Mesh>(null)
    const geometryRef = useRef<THREE.CylinderGeometry>(new THREE.CylinderGeometry(0.008, 0.008, 1, 6))
    
    useFrame(() => {
      if (meshRef.current && nodesGroup.current) {
        const startNode = nodesGroup.current.children[startIndex] as THREE.Mesh
        const endNode = nodesGroup.current.children[endIndex] as THREE.Mesh
        
        if (startNode && endNode) {
          const start = startNode.position
          const end = endNode.position
          
          // Update geometry scale
          const distance = start.distanceTo(end)
          meshRef.current.scale.y = distance
          
          // Update position
          const position = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
          meshRef.current.position.copy(position)
          
          // Update rotation
          const direction = new THREE.Vector3().subVectors(end, start).normalize()
          const up = new THREE.Vector3(0, 1, 0)
          const quaternion = new THREE.Quaternion().setFromUnitVectors(up, direction)
          meshRef.current.setRotationFromQuaternion(quaternion)
        }
      }
    })
    
    return <mesh ref={meshRef} geometry={geometryRef.current} material={material} />
  }

// Component tạo hiệu ứng Neural Network 3D
function NeuralNetwork() {
  const nodesRef = useRef<THREE.Group>(null)
  const connectionsRef = useRef<THREE.Group>(null)
  const pulsesRef = useRef<THREE.Group>(null)
  
  // Tạo dữ liệu cho các neurons và connections
  const { nodePositions, connections, nodeGeometry, layerInfo } = useMemo(() => {
    const positions: Array<[number, number, number]> = []
    const links: Array<[number, number]> = []
    const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16)
    
    // Tạo các layers của neural network
    const layers = [
      { count: 8, y: -8, spread: 12, isOuter: true },   // Input layer
      { count: 12, y: -4, spread: 15, isOuter: false }, // Hidden layer 1
      { count: 16, y: 0, spread: 18, isOuter: false },  // Hidden layer 2 (core)
      { count: 12, y: 4, spread: 15, isOuter: false },  // Hidden layer 3
      { count: 6, y: 8, spread: 10, isOuter: true }     // Output layer
    ]
    
    let nodeIndex = 0
    const layerStartIndices: number[] = []
    
    // Tạo các nodes cho mỗi layer
    layers.forEach((layer, layerIdx) => {
      layerStartIndices.push(nodeIndex)
      
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2
        const radius = layer.spread * (0.3 + Math.random() * 0.4)
        
        const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 3
        const y = layer.y + (Math.random() - 0.5) * 2
        const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 3
        
        positions.push([x, y, z])
        nodeIndex++
      }
    })
    
    // Tạo connections giữa các layers
    for (let layerIdx = 0; layerIdx < layers.length - 1; layerIdx++) {
      const currentLayerStart = layerStartIndices[layerIdx]
      const nextLayerStart = layerStartIndices[layerIdx + 1]
      const currentLayerCount = layers[layerIdx].count
      const nextLayerCount = layers[layerIdx + 1].count
      
      // Kết nối mỗi node với một số nodes ngẫu nhiên ở layer tiếp theo
      for (let i = 0; i < currentLayerCount; i++) {
        const connectionsPerNode = Math.floor(Math.random() * nextLayerCount * 0.8) + 2
        
        for (let j = 0; j < connectionsPerNode; j++) {
          const targetNode = nextLayerStart + Math.floor(Math.random() * nextLayerCount)
          links.push([currentLayerStart + i, targetNode])
        }
      }
    }
    
    // Thêm một số connections random cho complexity
    for (let i = 0; i < positions.length * 0.3; i++) {
      const node1 = Math.floor(Math.random() * positions.length)
      const node2 = Math.floor(Math.random() * positions.length)
      if (node1 !== node2) {
        links.push([node1, node2])
      }
    }
    
    return {
      nodePositions: positions,
      connections: links,
      nodeGeometry: sphereGeo,
      layerInfo: layers.map((layer, idx) => ({
        startIndex: layerStartIndices[idx],
        count: layer.count,
        isOuter: layer.isOuter,
        baseY: layer.y,
        baseSpread: layer.spread
      }))
    }
  }, [])

  // Material cho neurons với hiệu ứng glow
  const nodeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        colorActive: { value: new THREE.Color('#00aaff') },
        colorInactive: { value: new THREE.Color('#004466') },
        colorCore: { value: new THREE.Color('#0088cc') }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          vPosition = position;
          vNormal = normal;
          
          // Slight pulsing effect
          vec3 pos = position * (1.0 + sin(time * 2.0 + position.x + position.y + position.z) * 0.1);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 colorActive;
        uniform vec3 colorInactive;
        uniform vec3 colorCore;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Tạo hiệu ứng activation dựa trên thời gian và vị trí
          float activation = sin(time * 1.5 + vPosition.x * 0.1 + vPosition.y * 0.2 + vPosition.z * 0.15) * 0.5 + 0.5;
          activation = smoothstep(0.3, 0.7, activation);
          
          // Fresnel effect cho glow nhẹ hơn
          float fresnel = 1.0 - dot(normalize(vNormal), vec3(0.0, 0.0, 1.0));
          fresnel = pow(fresnel, 3.0);
          
          // Mix colors based on activation - giảm độ sáng
          vec3 baseColor = mix(colorInactive, colorActive, activation * 0.8);
          vec3 glowColor = mix(baseColor, colorCore, fresnel * activation * 0.5);
          
          // Giảm core brightness
          float coreBrightness = activation * (1.0 - fresnel) * 0.3;
          vec3 finalColor = mix(glowColor, colorCore, coreBrightness);
          
          gl_FragColor = vec4(finalColor, 0.7 + activation * 0.2);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
  }, [])

  // Material cho connections
  const connectionMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        connectionColor: { value: new THREE.Color('#0088ff') },
        pulseColor: { value: new THREE.Color('#00ffff') }
      },
      vertexShader: `
        uniform float time;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          vPosition = position;
          vUv = uv;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 connectionColor;
        uniform vec3 pulseColor;
        varying vec3 vPosition;
        varying vec2 vUv;
        
        void main() {
          // Tạo hiệu ứng pulse chạy dọc theo đường nối
          float pulse = sin(time * 4.0 + vUv.y * 10.0) * 0.5 + 0.5;
          pulse = smoothstep(0.3, 0.7, pulse);
          
          vec3 color = mix(connectionColor, pulseColor, pulse);
          float alpha = 0.4 + pulse * 0.4;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending
    })
  }, [])

  // Tạo geometry cho connections
  const connectionGeometries = useMemo(() => {
    const connections3D: Array<{
      start: THREE.Vector3
      end: THREE.Vector3
      geometry: THREE.CylinderGeometry
      position: THREE.Vector3
      lookAt: THREE.Vector3
    }> = []
    
    connections.forEach(([startIdx, endIdx]) => {
      const start = nodePositions[startIdx]
      const end = nodePositions[endIdx]
      
      if (!start || !end) return
      
      const startVec = new THREE.Vector3(start[0], start[1], start[2])
      const endVec = new THREE.Vector3(end[0], end[1], end[2])
      const distance = startVec.distanceTo(endVec)
      
      const geometry = new THREE.CylinderGeometry(0.015, 0.015, distance, 6)
      const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5)
      
      connections3D.push({
        start: startVec,
        end: endVec,
        geometry,
        position,
        lookAt: endVec
      })
    })
    
    return connections3D
  }, [connections, nodePositions])

  useFrame((state) => {
    if (nodesRef.current && nodeMaterial && connectionMaterial) {
      const time = state.clock.elapsedTime
      
      nodeMaterial.uniforms.time.value = time
      connectionMaterial.uniforms.time.value = time
      
      // Animate individual nodes với hiệu ứng mở rộng/thu hẹp cho outer layers
      nodesRef.current.children.forEach((node, index) => {
        if (node instanceof THREE.Mesh) {
          const [originalX, originalY, originalZ] = nodePositions[index]
          
          // Tìm layer info cho node này
          let currentLayer = null
          for (const layer of layerInfo) {
            if (index >= layer.startIndex && index < layer.startIndex + layer.count) {
              currentLayer = layer
              break
            }
          }
          
          if (currentLayer) {
            // Hiệu ứng thở/mở rộng cho outer layers
            let expansionFactor = 1.0
            if (currentLayer.isOuter) {
              // Outer layers có hiệu ứng mở rộng mạnh hơn
              const breathe = Math.sin(time * 0.4 + index * 0.3) * 0.4 + 1.0
              const pulse = Math.cos(time * 0.8 + originalX * 0.1 + originalZ * 0.1) * 0.3 + 1.0
              expansionFactor = breathe * pulse
              
              // Tăng cường hiệu ứng cho input/output layers
              if (currentLayer.startIndex === 0 || currentLayer.startIndex === layerInfo[layerInfo.length - 1].startIndex) {
                expansionFactor *= 1.2 + Math.sin(time * 0.3) * 0.3
              }
            } else {
              // Inner layers có hiệu ứng nhẹ hơn
              expansionFactor = 1.0 + Math.sin(time * 0.6 + index * 0.2) * 0.15
            }
            
            // Tính toán vị trí mới dựa trên expansion
            const centerDistance = Math.sqrt(originalX * originalX + originalZ * originalZ)
            const expandedX = originalX * expansionFactor
            const expandedZ = originalZ * expansionFactor
            
            // Subtle floating animation
            const floatY = Math.sin(time * 1.2 + index * 0.5) * 0.2
            const floatX = Math.cos(time * 0.8 + index * 0.3) * 0.1
            const floatZ = Math.sin(time * 1.5 + index * 0.7) * 0.15
            
            node.position.set(
              expandedX + floatX, 
              originalY + floatY, 
              expandedZ + floatZ
            )
            
            // Pulsing scale dựa trên activation và expansion
            const activation = Math.sin(time * 1.5 + originalX * 0.1 + originalY * 0.2 + originalZ * 0.15) * 0.5 + 0.5
            let scale = 1.0 + activation * 0.3
            
            // Outer nodes lớn hơn khi mở rộng
            if (currentLayer.isOuter) {
              scale *= (0.8 + expansionFactor * 0.3)
            }
            
            node.scale.setScalar(scale)
          }
        }
      })
      
      // Rotate entire network slowly với hiệu ứng breathing
      if (nodesRef.current) {
        const breathingRotation = Math.sin(time * 0.2) * 0.1
        nodesRef.current.rotation.y = time * 0.08 + breathingRotation
        nodesRef.current.rotation.x = Math.sin(time * 0.05) * 0.15 + breathingRotation * 0.5
      }
      
      if (connectionsRef.current) {
        const breathingRotation = Math.sin(time * 0.2) * 0.1
        connectionsRef.current.rotation.y = time * 0.08 + breathingRotation
        connectionsRef.current.rotation.x = Math.sin(time * 0.05) * 0.15 + breathingRotation * 0.5
      }
    }
  })

  return (
    <group>
      {/* Neurons */}
      <group ref={nodesRef}>
        {nodePositions.map((pos, index) => (
          <mesh 
            key={`node-${index}`}
            geometry={nodeGeometry}
            material={nodeMaterial}
            position={pos}
          />
        ))}
      </group>
      
      {/* Connections */}
      <group ref={connectionsRef}>
        {connections.map(([startIdx, endIdx], index) => (
          <DynamicConnectionLine
            key={`connection-${index}`}
            startIndex={startIdx}
            endIndex={endIdx}
            material={connectionMaterial}
            nodesGroup={nodesRef}
          />
        ))}
      </group>
    </group>
  )
}

// Camera controller với mouse interaction (manual implementation)
function InteractiveCamera() {
  const { camera, gl, size } = useThree()
  const isMouseDown = useRef(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))
  const cameraDistance = useRef(30)
  const cameraAngles = useRef({ theta: 0, phi: Math.PI / 3 })
  const autoRotate = useRef(true)
  
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      isMouseDown.current = true
      autoRotate.current = false
      mousePos.current = { x: event.clientX, y: event.clientY }
    }
    
    const handleMouseUp = () => {
      isMouseDown.current = false
      // Tự động quay trở lại sau 3 giây không tương tác
      setTimeout(() => {
        if (!isMouseDown.current) {
          autoRotate.current = true
        }
      }, 3000)
    }
    
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown.current) return
      
      const deltaX = event.clientX - mousePos.current.x
      const deltaY = event.clientY - mousePos.current.y
      
      cameraAngles.current.theta -= deltaX * 0.01
      cameraAngles.current.phi += deltaY * 0.01
      
      // Giới hạn góc phi để không bị lật
      cameraAngles.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraAngles.current.phi))
      
      mousePos.current = { x: event.clientX, y: event.clientY }
    }
    
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      autoRotate.current = false
      cameraDistance.current += event.deltaY * 0.01
      cameraDistance.current = Math.max(15, Math.min(80, cameraDistance.current))
      
      // Tự động quay trở lại sau 2 giây không zoom
      setTimeout(() => {
        if (!isMouseDown.current) {
          autoRotate.current = true
        }
      }, 2000)
    }
    
    gl.domElement.addEventListener('mousedown', handleMouseDown)
    gl.domElement.addEventListener('mouseup', handleMouseUp)
    gl.domElement.addEventListener('mousemove', handleMouseMove)
    gl.domElement.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      gl.domElement.removeEventListener('mousedown', handleMouseDown)
      gl.domElement.removeEventListener('mouseup', handleMouseUp)
      gl.domElement.removeEventListener('mousemove', handleMouseMove)
      gl.domElement.removeEventListener('wheel', handleWheel)
    }
  }, [gl])
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    
    // Auto rotation khi không tương tác
    if (autoRotate.current) {
      cameraAngles.current.theta += 0.005
    }
    
    // Breathing effect
    const breathe = Math.sin(time * 0.1) * 2
    const finalDistance = cameraDistance.current + breathe
    
    // Tính toán vị trí camera từ góc cầu
    const x = finalDistance * Math.sin(cameraAngles.current.phi) * Math.cos(cameraAngles.current.theta)
    const y = finalDistance * Math.cos(cameraAngles.current.phi)
    const z = finalDistance * Math.sin(cameraAngles.current.phi) * Math.sin(cameraAngles.current.theta)
    
    camera.position.set(x, y, z)
    camera.lookAt(cameraTarget.current)
  })
  
  return null
}

function BackgroundScene() {
  return (
    <Canvas 
      camera={{ position: [25, 10, 25], fov: 75 }}
      style={{ background: 'radial-gradient(circle, #0a0a0a 0%, #001122 50%, #000000 100%)' }}
    >
      {/* OrbitControls từ @react-three/drei */}
      <OrbitControls
        enableDamping={true}
        dampingFactor={0.05}
        minDistance={15}
        maxDistance={80}
        maxPolarAngle={Math.PI * 0.9}
        minPolarAngle={Math.PI * 0.1}
        enableZoom={true}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.3}
        rotateSpeed={0.5}
        zoomSpeed={0.6}
      />
      
      <NeuralNetwork />
      
      {/* Ánh sáng tổng thể nhẹ */}
      <ambientLight intensity={0.2} />
      
      {/* Ánh sáng chính - tạo hiệu ứng cyberpunk */}
      <directionalLight 
        position={[20, 20, 20]} 
        intensity={0.5} 
        color="#0066ff" 
      />
      
      {/* Ánh sáng cyan - neural activity */}
      <pointLight 
        position={[0, 15, 0]} 
        intensity={0.8} 
        color="#00ffff" 
        distance={50}
      />
      
      {/* Ánh sáng tím - deep learning */}
      <pointLight 
        position={[-15, -5, 15]} 
        intensity={0.6} 
        color="#8800ff" 
        distance={40}
      />
      
      {/* Ánh sáng xanh lá - active neurons */}
      <pointLight 
        position={[15, 5, -15]} 
        intensity={0.4} 
        color="#00ff88" 
        distance={35}
      />
      
      {/* Fog để tạo không gian sâu */}
      <fog attach="fog" args={['#000011', 20, 80]} />
    </Canvas>
  )
}

export default BackgroundScene;