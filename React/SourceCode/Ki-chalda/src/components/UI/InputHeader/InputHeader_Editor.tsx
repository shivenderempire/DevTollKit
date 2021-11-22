import React,{useRef,useState} from 'react';
import JoditEditor from "jodit-react";

interface inputHeaderProps{
    headingSize: string,
    elementConfig: Object,
    maxLength? :number

}
const InputHeader_Editor = React.memo((props: inputHeaderProps) => {
    const [content, setContent] = useState('');
    const editor = useRef(null)
    const config: any = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        useIframeResizer: false,
        uploader: { insertImageAsBase64URI: true },
        defaultActionOnPaste: "insert_clear_html",
        askBeforePasteHTML: false,
        buttons: "paragraph"
    }
    return (
        <JoditEditor            
            ref={editor}
            value={content}
            config={config}
   
           
            onBlur={(newContent:any) =>
             
                setContent(newContent.target.innerHTML)
            } // preferred to use only this option to update the content for performance reasons
            onChange={newContent => { }}
        />
    );
});
export default InputHeader_Editor;