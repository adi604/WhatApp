import { useRef } from "react";
import Massage from "../massage/Massage";
import React from "react";
import { Modal } from "react-bootstrap";
import { render } from "react-dom";
import useRecorder from "./useRecorder";
import UsersData from "../usersData/UsersData";


function Chat(props) {
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    const [records, setRecord] = React.useState(false);
    const [hadRecorded, setHadRecorded] = React.useState(false);
    const toSendMassage = React.createRef('');
    var massageContent = "";
    var massageType = "";
    //open window for record
    const showRecordModal = (event) => {
        event.preventDefault();
        setRecord(true);
    }

    //function returns all of the Massage Components that are in the database
    const massagesList = props.massages.map((massage, key) => {
        if (massage.massage !== "")
            return <Massage content={massage.massage} isRecived={massage.isRecived} time={massage.time} type={massage.type}/>
        return <></>
    });

    var ImageChat;
    for (let i = 0; i < UsersData.usersList.length; ++i) {
        if (UsersData.usersList[i].userName === props.chatName) {
            ImageChat = UsersData.usersList[i].image;
            break;
        }
    }

    // function sending an audio massage
    const sendRecord = (event) => {
        if(!hadRecorded || isRecording)
            return;
        event.preventDefault();
        let recordContent = audioURL;
        props.massages.unshift({ massage: recordContent, isRecived: false, time: new Date(), type: "audio" });
        props.setReRender(!props.reRender);
        setHadRecorded(false);
        setRecord(false);
    }

    //function handeling sending massage to a contact
    const handlePressingKey = (event) => {
        if (event.key !== "Enter" || toSendMassage.current.value === "")
            return;
        event.preventDefault();
        sendText();
    }

    //function sending an image massage
    const sendImage = (event) => {
        massageContent = URL.createObjectURL(event.target.files[0]);
        massageType = "image";
        event.target.value = "";
        sendFile();
    }

    //function sending an image massage
    const sendVideo = (event) => {
        let file = event.target.files[0];
        event.target.value = "";
        getBase64(file);
    }

    //function converting file to base64
    const getBase64 = (file) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            massageContent = reader.result;
            massageType = "video";
            sendFile();
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    //function sending the massageContent by adding it to the dataBase and re rendering the outer component
    const sendFile = (event) => {
        props.massages.unshift({ massage: massageContent, isRecived: false, time: new Date(), type: massageType });
        props.setReRender(!props.reRender);
    }

    // function sending a text massage
    const sendText = (event) => {
        massageContent = toSendMassage.current.value;
        massageType = "text";
        toSendMassage.current.value = "";
        sendFile();
    }

    //function starting to record an audio massage
    const startRecord = () => {
        setHadRecorded(true);
        startRecording();
    }

    return (
        <div className="right-chat">
            <div className="headingChat">
                <div className="chatPhoto">
                    <img src={ImageChat} className="profileImg"></img>
                </div>
                <a className="chatName">{props.chatName}</a>
                <span className="heading-online">Online</span>
            </div>
            <div className="allMessages">
                {massagesList}
            </div>
            <div className="chat-box">
                <div className="toSend">
                    <input onInput={sendImage} type="file" id="upload" accept="image/*" hidden />
                    <label className="photo btn" id="photo" for="upload"></label>
                    <input onInput={sendVideo} type="file" id="video-upload" accept="video/*" hidden />
                    <label className="video btn" id="video" for="video-upload"></label>
                    <button className="record" onClick={showRecordModal}></button>
                    <input onKeyPress={handlePressingKey} ref={toSendMassage} type="text" class="form-control textBox"></input>
                    <span className="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </div>
            <Modal show={records} onHide={() => {setRecord(false); setHadRecorded(false); stopRecording()}}>
                <Modal.Body className="bodyRecordWin">
                    <div>
                        <audio src={audioURL} controls className="audio" />
                        <button onClick={startRecord} disabled={isRecording} className=" form-control startRecord">
                            Start recording
                        </button>
                        <button onClick={stopRecording} disabled={!isRecording} className=" form-control stoptRecord">
                            Stop
                        </button>
                    </div>
                </Modal.Body>
                <Modal.Footer className="sendRecord" type="button" onClick={sendRecord}>
                    Send
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Chat;