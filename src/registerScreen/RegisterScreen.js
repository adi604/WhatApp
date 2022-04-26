import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../errorModal/ErrorModal";
import UsersData from "../usersData/UsersData";



function RegisterScreen(props) {

    const navigate = useNavigate();
    const [showError, setShowError] = React.useState(false);
    const [bodyMassage, setBodyMassage] = React.useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        var userName = document.getElementById('username').value;
        var nickName = document.getElementById('nick-name').value;
        var password = document.getElementById('exampleInputPassword2').value;
        var confirmPass = document.getElementById('exampleInputPassword1').value;
        var fileInput = document.getElementById('upload');
        var image = fileInput.files[0];

        
        // input validation
        if (userName === '') {
            setShowError(true);
            setBodyMassage("Please enter username.");
            return;
        }
        if (nickName === '') {
            setShowError(true);
            setBodyMassage("Please enter nickname.");
            return;
        }
        if (fileInput.value === '') {
            setShowError(true);
            setBodyMassage("Please enter photo.");
            return;
        }
        //create temporary URL for photo
        fileInput.src = URL.createObjectURL(image);
        if (password === '') {
            setShowError(true);
            setBodyMassage("Please enter password.");
            return;
        }
        if (confirmPass === '') {
            setShowError(true);
            setBodyMassage("Please confirm your password.");
            return;
        }
        // test if password contain only letter and number using regex
        if ((password.length < 8 || password.length > 20 || !(password.match("^[A-Za-z0-9]+$")))) {
            setShowError(true);
            setBodyMassage("Your password must be 8-20 characters long," +
                " contain letters and numbers, and must not contain spaces, special characters, or emoji.");
            return;
        }
        if (confirmPass !== password) {
            setShowError(true);
            setBodyMassage("The password confirmation does not match.");
            return;
        }
        let isUserTaken = false;
        UsersData.usersList.forEach(element => { // check if the username is being used by someone else
            if (userName === element.userName) {
                isUserTaken = true;
            }
        });
        if (isUserTaken) {
            setShowError(true);
            setBodyMassage("The username is already taken, please choose another username.");
            return;
        }
        // adds the user to the users database
        UsersData.usersList.push({
            userName: userName,
            password: password,
            nickName: nickName,
            image: fileInput.src
        });
        UsersData.usersChat.set(
            userName, []
        );
        props.onSignUp(userName);
        navigate('/Chat');
    }


    return (
        <div className="register">
            <div className="boxRegister shadow-lg p-3 mb-5 bg-body rounded">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input className="form-control username form1" id="username" placeholder="Username"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nickname</label>
                        <input id="nick-name" className="form-control username form1" placeholder="Nick&nbsp;name"></input>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">image</label>
                        <input className="form-control image form1" placeholder="Image"></input>
                        <input type="file" id="upload" accept="image/*" hidden />
                        <label class = "addPhoto btn btn-primary" id="photo" for="upload">Choose file</label>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control password form1" id="exampleInputPassword2" placeholder="Password"></input>
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control password form1" id="exampleInputPassword1" placeholder="Confirm Password"></input>
                    </div>
                    <div className="mb-3">
                        <label>Already register?&nbsp;</label>
                        <Link to='/'>Click here</Link>
                        <label>&nbsp;to login</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
            <ErrorModal handleShow={showError} handleClose={() => setShowError(false)} bodyMassage={bodyMassage} closeButton="Close" />
        </div>
    );
}

export default RegisterScreen;