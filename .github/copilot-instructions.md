<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# 3D Portfolio Project Instructions

This is a Next.js portfolio application featuring a 3D wireframe mountain mesh background built with React Three Fiber and Three.js.

## Project Structure:
- **Next.js 14** with App Router and TypeScript
- **React Three Fiber** for 3D rendering
- **Three.js** for 3D geometry and materials
- **Tailwind CSS** for styling and responsive design
- **Framer Motion** for additional animations

## Key Components:
- `BackgroundScene`: 3D wireframe mountain mesh with animations
- `Header`: Navigation with responsive menu
- `Hero`: Main content overlay with fade-in animations

## 3D Scene Features:
- Wireframe mountain geometry with multiple wave layers
- Rotating mesh with smooth animations
- Cyan and white gradient color scheme
- Camera auto-rotation with orbit controls
- Floating particle effects
- Multiple depth layers for 3D effect

## Styling Guidelines:
- Use Tailwind CSS for all styling
- Implement responsive design (mobile-first approach)
- Follow the cyan/white color scheme
- Maintain dark background theme
- Use gradient text effects for highlights

## Performance Considerations:
- Dynamic imports for 3D components to avoid SSR issues
- Optimized geometry with appropriate segment counts
- Smooth 60fps animations
- Lazy loading for heavy components

## Code Standards:
- Use TypeScript for type safety
- Implement proper error handling
- Follow React best practices
- Keep components modular and reusable
- Use 'use client' directive for client-side components
