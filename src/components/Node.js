import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Form, Dropdown } from 'react-bootstrap'
import Navbar from "./Navbar.js";
import background from '../img/pokale_eye.jpeg'
import Card2 from "./Card2.js";
import './Node.css'
import { storage } from "../firebase.js";
import {ref ,  uploadBytes } from "firebase/storage";
import {v4} from 'uuid';
import LoadingSpinner from "./spinner/spinner.js";

const Node = () => {

  const navigate = useNavigate()
  const { id1, id2 } = useParams()
  const regex = /^\s*$/

  // direction => 0 means selling, 1 means buying

  const [arch, setArch] = useState("")
  const [model, setModel] = useState("")
  const [picture, setPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);




  const [direction, setDirection] = useState(0)
  const [energy, setEnergy] = useState("")
  const [price, setPrice] = useState("")
  const [desc, setDesc] = useState("")
  const [isEnergyEmpty, setIsEnergyEmpty] = useState(false)
  const [isDescEmpty, setIsDescEmpty] = useState(false)
  const [isPriceEmpty, setIsPriceEmpty] = useState(false)

  const [user1, setUser1] = useState([])
  const [user2, setUser2] = useState([])
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [show, setShow] = useState(false)
  const [blockchain, setBlockchain] = useState([])
  
  const handleVideo = (e) => {   
    console.log('Video submitted successfully');
    console.log(e);
    
  }

  const handleClose = () => {
    setEnergy("")
    setPrice("")
    setDesc("")
    setIsPriceEmpty(false)
    setIsEnergyEmpty(false)
    setIsDescEmpty(false)
    setShow(false)
    setShowMessage(false)
  }
  const onChangePicture = e => {
    console.log('picture: ', picture);
    setPicture(e.target.files[0]);
};
  const handleSubmitTrans = async(event) => {
   //alert("Submit Button Clicked");
   event.preventDefault(); 

    if(picture == null){
      return ;
    }
    setIsLoading(true);
    const imgRef= ref(storage, `videoInput/${picture.name + v4()}`);
 
   
    uploadBytes(imgRef,picture).then(()=>{
      setIsLoading(false);   
      //alert("Video uploaded successfully");
      handleClose();
    })



   
  }


  const filterArch = ["Arch-1", "Arch-2", "Arch-3", "Arch-4", "Arch-5", "Arch-6", "Arch-7", "Arch-8", "Arch-9"]
  const filterModel = ["Mod-1", "Mod-2", "Mod-3", "Mod-4", "Mod-5", "Mod-6"]

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    zIndex: "66",
    // filter: "blur(8px)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }
  let startLoading = (
    <h1>  </h1>
  )

  return (
      // <div className="bg-image dark-overlay" style={sectionStyle}> 
      <div className="login">
        <div className="dark-overlay text-light">
          <div className="container">

      {/* <Navbar userId={id1}/> */}
      <br />

      <div className="jumbotron m-2 my-5">
        <div className="container text-center text-white">
          <h1>Pupillometry</h1>
          {/* <p></p> */}
        </div>
      </div>
      <br />

      <div className="container mt-5 mb-4">
        <div className='row justify-content-center'>
          <div className="col-7 h4 text-white">Output</div>
          <button className="col-2 btn btn-danger text-white" onClick={() => setShow(true)}>Make new prediction</button>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-5">
              <div className="row">
                {blockchain.map(block => {
                  return (
                    <div className="col-4 mb-5 d-flex justify-content-center">
                      {/* <Link to={`/node/${id}/${item[0]}`} className="text-decoration-none"> */}
                        <Card2
                          key={block[0]}
                          index={block[0]}
                          timestamp={block[1]}
                          trans={block[4]}
                          res={block[5]}
                        />
                      {/* </Link> */}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>


      <Modal show={show} onHide={handleClose} disabled={isLoading}>
      
        <Modal.Header closeButton>
          <Modal.Title>Input Parameters</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form>
            <div className="row align-items-center mt-4">
              <div className="col-md-3 ">Architecture</div>
              <div className="col-md-3 text-center d-flex flex-row align-items-start">
                <select className="p-1 pb-2 pe-5" onChange={e => setArch(e.target.value)} >
                  {
                    filterArch.map(arch => <option value={arch}>{arch}</option>)
                  }
                </select>
              </div>
            </div>

            <div className="row align-items-center mt-4 mb-4">
              <div className="col-md-3 ">Model</div>
              <div className="col-md-3 text-center d-flex flex-row align-items-start">
                <select className="p-1 pb-2 pe-5" onChange={e => setModel(e.target.value)} >
                  {
                    filterModel.map(model => <option value={model}>{model}</option>)
                  }
                </select>
              </div>
            </div>

            <div className="row align-items-center mt-4">
              <div className="col-md-3">Video</div>
              <div className="col-md-3 text-start">
                <div className="form-group">
                  <input type="file" className="form-control-file"  onChange={onChangePicture}/>
                </div>
              </div>
            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
        {isLoading ? <LoadingSpinner />: startLoading }
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitTrans} >Predict</button>
        </Modal.Footer>
      </Modal>
      
      </div>
      </div>
      </div>
  )
}

export default Node