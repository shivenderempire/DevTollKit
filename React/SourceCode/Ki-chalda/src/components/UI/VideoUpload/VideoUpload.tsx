import React, { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player'
import {Button,Row,Col } from 'react-bootstrap';

interface VideoUploadConfig {
    elementConfig: Object,
    headerText?: string,
    videoURL:string
    onVideoChange: (videoPath: string) => void
}
const VideoUpload = React.memo((props: VideoUploadConfig) => {
   // const [headintValue, setheadintValue] = useState<string>("");
    const videoPath = useRef<any>();
    const [showDetails, setshowDetails] = useState<boolean>(false);
    const [showVideo, setshowVideo] = useState<boolean>(false);
   

    useEffect(() => {
        const timer = setTimeout(() => {
            if (props.videoURL === videoPath.current.value) {
                if (props.videoURL.length > 0) {
                    setshowDetails(true);
                  //  props.onVideoChange(headintValue);
                }
                else {
                    setshowDetails(false);
                    //props.onVideoChange("");
                }
            }

        }, 500);
        return () => {
            clearTimeout(timer);
        }
    }, [props.videoURL]);
    return (<React.Fragment>
       
        <Row>
            <Col sm>
                <input type="text" {...props.elementConfig} style={{ border: "0px", padding: "5px", width: "100%" }} ref={videoPath}
                value={props.videoURL}
                    onChange={(event: any) => {
                    setshowVideo(false);
                    //setheadintValue(event.target.value);
                    props.onVideoChange(event.target.value);

                }} />
            </Col>
        </Row>
        <Row className="mt-1">
            <Col sm className="text-right">
                {showDetails ? <Button variant="danger" onClick={() => {
                    setshowVideo(true);
                }}>Preview Video</Button> : null}
            </Col>
        </Row>
        <Row>
            <Col>
                {showVideo ? <ReactPlayer
                    url={props.videoURL} controls
           
                />

                    : null}
            </Col>
        </Row>
        
       

    </React.Fragment>);
});

export default VideoUpload;