import React, { useState, useEffect } from 'react'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

const MyEditor = ({ setFormContentValue, html, setHtml }) => {

    const [editor, setEditor] = useState(null) // 存储 editor 实例

    // 模拟 ajax 请求，异步设置 html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello&nbsp;<strong>world</strong>.</p>\n<p><br></p>')
    //     }, 1500)
    // }, [])

    const toolbarConfig = {}
    const editorConfig = {
        placeholder: '请输入内容...',
    }

    // 及时销毁 editor
    useEffect(() => {
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])



    useEffect(() => {
        if (editor == null) return
        setFormContentValue(editor.getHtml())
    }, [html]);

    function printHtml() {
        if (editor == null) return
        return editor.getHtml()
    }

    return (
        <>


            <div style={{ border: '1px solid #ccc', zIndex: 100, marginTop: '5px' }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="default"
                    style={{ height: '500px' }}
                />
            </div>
        </>
    )
}

export default MyEditor
