import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"

const ParticleBackground = () => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setReady(true)
    })
  }, [])

  if (!ready) return null

  return (
    <Particles
      options={{
        fullScreen: { enable: false },
        fpsLimit: 60,
        background: { color: "transparent" },

        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            resize: true,
          },
          modes: {
            repulse: { distance: 60 },
          },
        },

        particles: {
          color: {
            value: ["#6366f1", "#8b5cf6", "#06b6d4"],
          },
          links: {
            enable: true,
            color: "#a5b4fc",
            distance: 150,
            opacity: 0.7,
          },
          move: {
            enable: true,
            speed: 1,
          },
          number: {
            value: 180,
            density: { enable: true },
          },
          opacity: { value: 0.25 },
          size: { value: { min: 1, max: 3 } },
        },
      }}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  )
}

export default ParticleBackground
