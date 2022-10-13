import '@toast-ui/editor'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor.css'
import React, { useEffect } from 'react'
import { ViewerProps } from './viewerWIthForwardRef'

interface Props {
  options: ViewerProps
  forwardedRef: React.ForwardedRef<HTMLDivElement>
}

function WrappedViewer({ options, forwardedRef }: Props) {
  useEffect(() => {
    const viewer = new Viewer({
      el: (forwardedRef as React.RefObject<HTMLDivElement>).current!,
      ...options,
    })
  }, [forwardedRef, options])

  return <div ref={forwardedRef}></div>
}

export default WrappedViewer
