import React, { forwardRef } from 'react'
import dynamic from 'next/dynamic'
import { EventMap, ViewerOptions } from '@toast-ui/editor/dist/toastui-editor-viewer';

interface EventMapping {
    onLoad: EventMap['load'];
    onChange: EventMap['change'];
    onCaretChange: EventMap['caretChange'];
    onFocus: EventMap['focus'];
    onBlur: EventMap['blur'];
    onKeydown: EventMap['keydown'];
    onKeyup: EventMap['keyup'];
    onBeforePreviewRender: EventMap['beforePreviewRender'];
    onBeforeConvertWysiwygToMarkdown: EventMap['beforeConvertWysiwygToMarkdown'];
}

export type ViewerProps = Omit<ViewerOptions, 'el'> & Partial<EventMapping>

interface Props {
    options: ViewerProps
}

const Viewer = dynamic(() => import('./wrappedViewer'), { ssr: false })

const ViwerWithForwardRef = forwardRef<HTMLDivElement, Props>(({ ...options }: Props, ref) => (
    <Viewer {...options} forwardedRef={ref} />
))

ViwerWithForwardRef.displayName = 'viewer'

export default ViwerWithForwardRef