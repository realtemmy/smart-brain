import { Component } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/navigation/navigation.component";
import SignIn from "./components/signIn/signIn.component";
import Register from "./components/Register/register.component";
import Logo from "./components/logo/logo.component";
import Rank from "./components/rank/rank.component";
import ImageFormLink from "./components/imageFormLink/imageFormLink.component";
import FaceRecognition from "./components/face-recognition/face-recognition.component";
import ParticlesBg from "particles-bg";
import "./App.css";

const app = new Clarifai.App({
  apiKey: "57d80a6654e4494dac261e11d5cb671f",
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: "signin",
      isSignedIn: false
    };
  }

  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  onRouteChange = (route) =>{
    if(route === "signout"){
      this.setState({isSignedIn: false})
    }else if(route === "home")
    this.setState({isSignedIn: true});
    this.setState({route: route})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * width,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then((response) =>
        this.displayFaceBox(this.calculateFaceLocation(response))
      )
      .catch((err) => console.log(err));
  };
  render() {
    const { imageUrl, box, isSignedIn, route } = this.state;
    return (
      <div className="App">
        <ParticlesBg type="square" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank />
            <ImageFormLink
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition
              box={box}
              imageUrl={imageUrl}
            />
          </div>
          
        ) : (
          route === "signin" ? <SignIn onRouteChange={this.onRouteChange} /> : <Register />
        )}
      </div>
    );
  }
}

export default App;
