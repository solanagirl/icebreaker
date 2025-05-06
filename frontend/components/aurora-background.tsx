"use client"

import { useEffect, useRef } from "react"

export function AuroraBackground() {
  const aurora1Ref = useRef<HTMLDivElement>(null)
  const aurora2Ref = useRef<HTMLDivElement>(null)

  // Add subtle mouse movement effect to aurora
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!aurora1Ref.current || !aurora2Ref.current) return

      const x = e.clientX / window.innerWidth
      const y = e.clientY / window.innerHeight

      // Subtle movement based on mouse position
      aurora1Ref.current.style.transform = `translate(${x * -20}px, ${y * -20}px)`
      aurora2Ref.current.style.transform = `translate(${x * 20}px, ${y * 20}px)`
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="aurora-bg">
      <div ref={aurora1Ref} className="aurora"></div>
      <div ref={aurora2Ref} className="aurora-2"></div>
    </div>
  )
}
