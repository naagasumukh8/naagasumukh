'use client'

import { Suspense, lazy, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/**
 * Persistent Spline host.
 *
 * The robot's WebGL canvas is created exactly once per browser session and
 * lives inside a detached <div> that is *moved* into whichever hero host
 * currently needs it. Navigating away and back never unmounts the Spline
 * React tree, so there is no re-download, no re-init and no load flash —
 * the robot is simply already there, still responding to pointer + scroll.
 */

let _node: HTMLDivElement | null = null
let _app: any = null
let _loaded = false

const handlers: {
  onLoad?: (app: any) => void
  onClick?: () => void
} = {}

function getNode(): HTMLDivElement | null {
  if (typeof document === 'undefined') return null
  if (!_node) {
    _node = document.createElement('div')
    _node.setAttribute('data-spline-node', '')
    _node.style.cssText =
      'position:absolute;inset:0;width:100%;height:100%;display:none'
    document.body.appendChild(_node)
  }
  return _node
}

/** Move the persistent robot node into `host` (called by the hero on mount). */
export function adoptSplineNode(host: HTMLElement | null) {
  const n = getNode()
  if (!n || !host) return
  if (n.parentElement !== host) host.appendChild(n)
  n.style.display = ''
  try {
    _app?.setSize?.(host.clientWidth, host.clientHeight)
  } catch { /* noop */ }
}

/** Park the robot node back on <body> (hidden) when the hero unmounts. */
export function releaseSplineNode() {
  const n = _node
  if (!n) return
  n.style.display = 'none'
  if (n.parentElement !== document.body) document.body.appendChild(n)
}

export function setSplineHandlers(h: { onLoad?: (app: any) => void; onClick?: () => void }) {
  handlers.onLoad = h.onLoad
  handlers.onClick = h.onClick
  // If the scene finished loading before the hero mounted, replay onLoad so
  // the caller can still run its setup / fade-in immediately.
  if (_loaded && _app) h.onLoad?.(_app)
}

export function getSplineApp() {
  return _app
}

export function isSplineLoaded() {
  return _loaded
}

const Spline = lazy(() => import('@splinetool/react-spline'))

interface PersistentSplineProps {
  scene: string
}

/** Mount once, at the app root. Never unmounts. */
export function PersistentSpline({ scene }: PersistentSplineProps) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    setNode(getNode())
  }, [])

  if (!node) return null

  return createPortal(
    <Suspense fallback={null}>
      <Spline
        scene={scene}
        className="absolute inset-0 h-full w-full"
        onClick={() => handlers.onClick?.()}
        onLoad={(app: any) => {
          _app = app
          _loaded = true
          handlers.onLoad?.(app)
        }}
      />
    </Suspense>,
    node,
  )
}

/** Emit a scene event on the persistent robot (e.g. click / wave). */
export function emitSplineEvent(eventName: string, targetName?: string) {
  const app = _app
  if (!app) return
  try {
    if (targetName && app.findObjectByName) {
      const obj = app.findObjectByName(targetName)
      if (obj) app.emitEvent(eventName, obj)
      else app.emitEvent(eventName)
    } else {
      app.emitEvent(eventName)
    }
  } catch { /* scene may not expose this event */ }
}
