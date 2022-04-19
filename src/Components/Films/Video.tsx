import React from "react";
import { Video as VideoType } from '../../utils/types';

interface Props{
    video: VideoType
}

const Video = ({video}:Props) => {
    return(
        <iframe 
        src={`https://www.youtube.com/embed/${video.key}`}
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen />
    )
}

export default Video;