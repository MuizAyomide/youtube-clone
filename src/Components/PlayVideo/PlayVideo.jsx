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

const PlayVideo = () => {
  const { videoId } = useParams();

  const [apiData, setApiData] = useState(null);

  const fetchVideoData = async () => {
    try {
      //fetching videos data
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(videoDetails_url);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        console.error('No video data found');
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>{value_converter(apiData.statistics.viewCount)} Views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>
        <div>
          <span>
            <img src={like} alt="" /> {apiData.statistics.likeCount}
          </span>
          <span>
            <img src={dislike} alt="" /> {apiData.statistics.dislikeCount}
          </span>
          <span>
            <img src={share} alt="" /> Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p>{apiData.snippet.channelTitle}</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData?apiData.snippet.description.slice(0, 250): 'description here'}</p>
        <hr />
        <h4>{apiData && apiData.statistics.commentCount ? apiData.statistics.commentCount : 102} Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nichole <span>1 day ago</span>
            </h3>
            <p>
              A global computer network providing a variety of information and
              communication focus on interconnected networks using standardized
              communication protocols...
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nichole <span>1 day ago</span>
            </h3>
            <p>
              A global computer network providing a variety of information and
              communication focus on interconnected networks using standardized
              communicationprotocols...
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nichole <span>1 day ago</span>
            </h3>
            <p>
              A global computer network providing a variety of information and
              communication focus on interconnected networks using standardized
              communicationprotocols...
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nichole <span>1 day ago</span>
            </h3>
            <p>
              A global computer network providing a variety of information and
              communication focus on interconnected networks using standardized
              communicationprotocols...
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;