import React from 'react';
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';

class Face extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.style = getStyles();
    this.inputVideo = React.createRef();
    this.overlay = React.createRef();
  }

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
    this.run();
  }

  run = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
    const videoEl = this.inputVideo.current;
    videoEl.srcObject = stream;
  }
  onPlay = async () => {
    console.log(this);
    const videoEl = this.inputVideo.current;

    if (videoEl.paused || videoEl.ended) {
      return setTimeout(() => this.onPlay());
    }

    let minConfidence = 0.5;

    const options = new faceapi.SsdMobilenetv1Options({ minConfidence });

    const result = await faceapi.detectSingleFace(videoEl, options);

    if (result) {
      const canvas = this.inputVideo.current;
      const dims = faceapi.matchDimensions(canvas, videoEl, true);
      faceapi.draw.drawDetections(canvas, faceapi.resizeResults(result, dims));
    }

    setTimeout(() => this.onPlay());
  }

  render() {
    return (
      <div style={{ ...this.style.base }}>
        <video
          onLoadedMetadata={this.onPlay}
          ref={this.inputVideo}
          autoPlay
          muted
          playsInline
        />
        <canvas ref={this.overlay} />
      </div>
    );
  }
}

export {
  Face as default,
  Face,
};

const getStyles = () => ({
  base: {
    position: 'absolute',
    flex: 1,
  },
});
