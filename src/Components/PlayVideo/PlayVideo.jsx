import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import { API_KEY, value_converter } from "../../Data";
import moment from "moment";
import { useParams } from "react-router-dom";

const PlayVideo = (category) => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);

  const fetchVideoData = async () => {
    //fetching videos data
    const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&Id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetails_url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  };

  useEffect(() => {
    fetchVideoData();
  }, []);

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {apiData && <h3>{apiData.snippet.title}</h3>}
      <div className="play-video-info">
        {apiData && (
          <p>
            {value_converter(apiData.statistics.viewCount)} Views &bull; 2 days
            ago
          </p>
        )}
        <div>
          {apiData && (
            <>
              <span>
                <img src={like} alt="" /> {apiData.statistics.likeCount}
              </span>
              <span>
                <img src={dislike} alt="" /> 2
              </span>
              <span>
                <img src={share} alt="" /> Share
              </span>
              <span>
                <img src={save} alt="" /> Save
              </span>
            </>
          )}
        </div>
      </div>
      {/* Rest of the component */}
    </div>
  );
};

export default PlayVideo;
