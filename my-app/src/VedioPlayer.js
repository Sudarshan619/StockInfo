import React from "react";
import { useEffect ,useRef} from "react";

const VideoPlayer = () => {
    const cloudinaryRef = useRef();
    const vedioRef = useRef();
    useEffect(() => {
        if(cloudinaryRef.current){
            return;
        }
        cloudinaryRef.current = window.cloudinary
        cloudinaryRef.current.videoPlayer(vedioRef.current)
    }, []);
    return (
       
            <video 
            ref={vedioRef}
            data-cld-public-id="vedio/waterfall"
            />
        
    );
};

export default VideoPlayer;
