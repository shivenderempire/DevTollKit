import React from "react";
import JoditEditor from "jodit-react";
import { Row, Col } from "react-bootstrap";
interface InputcontentProps {
  setContentData: (newsContent: any) => void;
  content: string;
  placeHolder: string;
  headerText?: string;
}
const InputContent = React.memo((props: InputcontentProps) => {
  //  const editor = useRef(null)
  const config: any = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    useIframeResizer: false,
    uploader: { insertImageAsBase64URI: true },
    defaultActionOnPaste: "insert_clear_html",
    askBeforePasteHTML: false,
    placeholder: `${props.placeHolder}`,
    buttons:
      "bold,italic,underline,strikethrough,eraser,superscript,subscript,ul,ol,indent,outdent,left,font,fontsize,paragraph,classSpan,video",
  };
  return (
    <Row>
      <Col>
        <JoditEditor
          // ref={editor}
          value={props.content}
          config={config}
          onBlur={props.setContentData} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => {}}
        />
      </Col>
    </Row>
  );
});

export default InputContent;
