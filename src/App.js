import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Singin from './components/Singin/Singin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceDetection from './components/FaceDetection/FaceDetection';
import './App.css';

const app = new Clarifai.App({
  apiKey: '0284d93eb8ce4b85a49c868dba583df2'
})

const particlesParams = {
  particles: {
    number: {
      value: 10,
      density: {
        enable: true,
        value_area: 80
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    //console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
    console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    console.log('click');
    app.models.predict(
      // "a403429f2ddf4b49b307e318f00e528b",
      Clarifai.FACE_DETECT_MODEL,
      //"https://samples.clarifai.com/face-det.jpg")
      this.state.input)
      .then(response => {
        //console.log(response);
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.displayFaceBox(this.calculateFaceLocation(response));
      },
        function (err) {
          // there was an error
        }
      );
  }

  onRouteChange = (route) => {
    if (route === 'signedout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
  }
    this.setState({ route: route })
  }

  render() {
    //  const{isSignedIn, ImageURL, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesParams} />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceDetection box={this.state.box} imageURL={this.state.imageURL} />
          </div>
          : (
            this.state.route === 'signin' 
            ? <Singin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }
}
export default App;
