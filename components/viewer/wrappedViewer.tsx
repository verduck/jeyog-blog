import React, { useEffect } from 'react'
import '@toast-ui/editor'
import Viewer, { EventMap, ViewerOptions } from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@toast-ui/editor/dist/toastui-editor.css'
import { ViewerProps } from './viewerWIthForwardRef'

interface Props {
    options: ViewerProps
    forwardedRef: React.ForwardedRef<HTMLDivElement>
}

function WrappedViewer({ options, forwardedRef }: Props) {
    useEffect(() => {
        const viewer = new Viewer({
            el: (forwardedRef as React.RefObject<HTMLDivElement>).current!,
            ...options
        })
    }, [forwardedRef, options])

    return (
        <div ref={forwardedRef}></div>
    )
}

export default WrappedViewer