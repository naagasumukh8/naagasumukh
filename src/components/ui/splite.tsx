'use client'

import { Suspense, lazy, useRef, forwardRef, useImperativeHandle } from 'react'

// Module-level singleton — the Spline WebGL runtime is loaded exactly once
// per browser session. Re-mounting the component (e.g. navigating away and
// back, hot-reloading) reuses the cached app instance instead of re-fetching
// and re-initializing the entire scene.
const _appCache = new Map<string, unknown>()

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
    const appRef = useRef<unknown>(_appCache.get(scene) ?? null)
    // Guard so onLoad side-effects (pixel-ratio cap, size) only run once.
    const loadedRef = useRef(appRef.current !== null)

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
        <Spline
          scene={scene}
          className={className}
          onClick={onClick}
          onLoad={(spline) => {
            appRef.current = spline
            _appCache.set(scene, spline) // cache for subsequent mounts
            if (!loadedRef.current) {
              loadedRef.current = true
              onLoad?.(spline)   // fire caller's setup only on first load
            }
          }}
        />
      </Suspense>
    )
  }
)
