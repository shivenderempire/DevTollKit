import React, { useState, useEffect,useRef } from 'react';
import classes from './InputHeader.module.css';
import { Row, Col } from 'react-bootstrap';


interface inputHeaderProps {
    headingSize: string,
    elementConfig: Object,
    maxLength?: number,
    headerText?: string,
    headintValue: string,
    OnHeadingChange: (value: string, headingSize: string) => void,
    OnHeadingSizeChange: (headingSize: string) => void

}
const InputHeader = React.memo((props: inputHeaderProps) => {
    const [inputFontSize, setinputFontSize] = useState<String>("");
    const inputRef = useRef<any>();
    const [showHeading, setShowHeading] = useState<boolean>(false);
    const [background, setBackground] = useState({
        h1: classes.SelectedBackGround, h2: classes.ClearBackground,
        h3: classes.ClearBackground, h4: classes.ClearBackground, h5: classes.ClearBackground, h6: classes.ClearBackground
    });
    const clearClass = () => {
        setBackground({
            h1: classes.ClearBackground, h2: classes.ClearBackground,
            h3: classes.ClearBackground, h4: classes.ClearBackground, h5: classes.ClearBackground, h6: classes.ClearBackground
        });
    }
    const setFontSize = (tagname: string) => {
        switch (tagname.toLowerCase()) {
            case "h1":
                setinputFontSize("32px")
                break;
            case "h2":
                setinputFontSize("24px")
                break;
            case "h3":
                setinputFontSize("18.72px")
                break;
            case "h4":
                setinputFontSize("16px")
                break;
            case "h5":
                setinputFontSize("13.28px")
                break;
            case "h6":
                setinputFontSize("12px")
                break;
            default:
                break;
        }
    }
    useEffect(() => {
        setFontSize(props.headingSize);

        clearClass();
        setBackground((prevstate) => ({ ...prevstate, [props.headingSize]: classes.SelectedBackGround }));
    }, [props.headingSize]);


    useEffect(() => {
        const timer = setTimeout(() => {
            if (props.headintValue === inputRef.current.value) {
                if (props.headintValue.length > 0) {
                    setShowHeading(true);
                }
                else {
                    setShowHeading(false);
                }
            }

        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [props.headintValue]);
    const OnHeadingChangeHandler = (tagName: string) => {
        setShowHeading(true);
        // setFontSize(tagName);
        props.OnHeadingSizeChange(tagName);
        // clearClass();
        // setBackground((prevstate) => ({ ...prevstate, [tagName]: classes.SelectedBackGround }));
    }
  
    
    
    const style = { border: "1px solid gray", display: "inline-block", padding: "10px", cursor: 'pointer' };
    return (
        // <div style={{ border: "1px solid", padding: "10px", margin: "10px" }}>
        <React.Fragment>
            {/* <Row>
                <Col>
                    <div style={{ float: "left", width: "80%" }}><h4> {props.headerText ? props.headerText : "Heading"}</h4></div>
                    <div style={{ float: "right" }}>
                       
                        <div className="dropdown no-arrow show">

                            <div style={{ border: "1px solid gray", display: "inline-block", padding: "5px", cursor: 'pointer' }}
                                className={classes.ClearBackground + " dropdown-toggle"} id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                <img src={More} style={{ height: "15px" }} />
                            </div>
                           

                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <a className="dropdown-item" href="#">Move Down</a>
                                <a className="dropdown-item" href="#">Move Up</a>
                                <a className="dropdown-item" href="#">Delete Component</a>
                            </div>
                        </div>
                    </div>
                
                </Col>
            </Row>
            <hr /> */}
            {showHeading ? <Row>
                <Col sm={12}>
               
                    <div style={style} className={background.h1} onClick={() => { OnHeadingChangeHandler("h1"); }}>H1</div>
                    <div style={style} className={background.h2} onClick={() => { OnHeadingChangeHandler("h2"); }}>H2</div>
                    <div style={style} className={background.h3} onClick={() => { OnHeadingChangeHandler("h3"); }}>H3</div>
                    <div style={style} className={background.h4} onClick={() => { OnHeadingChangeHandler("h4"); }}>H4</div>
                    <div style={style} className={background.h5} onClick={() => { OnHeadingChangeHandler("h5"); }}>H5</div>
                    <div style={style} className={background.h6} onClick={() => { OnHeadingChangeHandler("h6"); }}>H6</div>
                </Col>
            </Row> : null}
           
            <input type="text"  {...props.elementConfig}
                ref={inputRef}
                value={props.headintValue}
                className={classes.Input} maxLength={props.maxLength ? props.maxLength : 200} style={{ fontSize: `${inputFontSize}`, border: "0px" }}
                onChange={(event: any) => {
                    props.OnHeadingChange(event.target.value, props.headingSize);
                    // setheadintValue(event.target.value);
                }}
               
            />
        </React.Fragment>
    );
});


export default InputHeader;