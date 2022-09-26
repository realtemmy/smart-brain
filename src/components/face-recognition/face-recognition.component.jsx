import './face-recogniton.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputimage" src={imageUrl} alt="" width='500px' height='auto'/>
        <div className='bounding-box' style={{top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow}}></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
