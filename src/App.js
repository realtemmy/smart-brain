import { Component } from "react";
import Clarifai from 'clarifai'
import Navigation from "./components/navigation/navigation.component";
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
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (e) =>{
    this.setState({input: e.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box)
      },
      function(err){
        console.log(err)
      }
    )
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="square" bg={true} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageFormLink
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
