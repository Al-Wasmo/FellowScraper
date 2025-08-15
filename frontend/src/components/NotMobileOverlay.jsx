"use client"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function NotMobileOverlay() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768)
    checkSize()
    window.addEventListener("resize", checkSize)
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  if (!isMobile) return null

  return (
    <Dialog open={true} modal>
      <DialogOverlay
        style={{
          backgroundColor: "rgba(255, 0, 0, 0.0)", 
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      />
      <DialogContent
        className="sm:max-w-[425px]"
        style={{
          backgroundColor: "white",
        }}
      >
        <DialogHeader>
          <DialogTitle>Warning</DialogTitle>
          <DialogDescription>
            <Label>Tool is not intended to run on mobile for now</Label>
            <Label>Switch to desktop for the full experience</Label>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
