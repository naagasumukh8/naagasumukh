'use client'

import { Suspense, lazy, useRef, forwardRef, useImperativeHandle } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

export interface SplineSceneRef {
  emitEvent: (eventName: string, targetName?: string) => void
  getApp: () => unknown
}

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (spline: unknown) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
}

export const SplineScene = forwardRef<SplineSceneRef, SplineSceneProps>(
  function SplineScene({ scene, className, onLoad, onClick }, ref) {
    const appRef = useRef<unknown>(null)

    useImperativeHandle(ref, () => ({
      emitEvent(eventName: string, targetName?: string) {
        const app = appRef.current as any
        if (!app) return
        try {
          if (targetName && app.findObjectByName) {
            const obj = app.findObjectByName(targetName)
            if (obj) app.emitEvent(eventName, obj)
            else app.emitEvent(eventName)
          } else {
            app.emitEvent(eventName)
          }
        } catch {
          // ignore — scene may not expose this event
        }
      },
      getApp() {
        return appRef.current
      },
    }))

    return (
      <Suspense fallback={null}>
        <Spline scene={scene} className={className} onClick={onClick} onLoad={(spline) => {
          appRef.current = spline
          onLoad?.(spline)
        }} />
      </Suspense>
    )
  }
)
