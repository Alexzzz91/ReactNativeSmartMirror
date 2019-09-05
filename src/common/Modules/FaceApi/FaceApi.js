import React from 'react';
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';


class Face extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.style = getStyles();
  }

  async componentDidMount() {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    await faceapi.loadFaceRecognitionModel(MODEL_URL);
  }

  render() {
    return (
      <div style={{ ...this.style.base }}>
        test
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
    flex: 1,
  },
});
