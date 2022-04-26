import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersData from "../usersData/UsersData";
import { Modal, Button } from "react-bootstrap";
import ErrorModal from "../errorModal/ErrorModal";

function OpenScreen(props) {
    const navigate = useNavigate();
    const [isInvalid, setIsInvalid] = React.useState(false);

    const handleClose = () => {
        setIsInvalid(false);
    }
    const handleShow = () => {
        setIsInvalid(true);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var username = document.getElementById('username').value;
        var password = document.getElementById('exampleInputPassword1').value;
        for (let i = 0; i < UsersData.usersList.length; i++) { // searching for the same username and password. 
            if (UsersData.usersList[i].userName === username && UsersData.usersList[i].password === password) {
                props.onSignIn(username);
                navigate('/Chat');
                return;
            }
        }
        handleShow();
    }


    return (
        <main>
            <div className="home" id="main-div">
                <div className="box shadow-lg p-3 mb-5 bg-body rounded">
                <label className="login">Login</label>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label for="username" className="form-label">Username</label>
                        <input className="form-control username form1" id="username" aria-describedby="emailHelp" placeholder="Email /&nbsp;Username"></input>
                    </div>
                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control password form1" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>
                    <div className="mb-3">
                        <label>Not register?&nbsp;</label>
                        <Link to='/Register'>Click here</Link>
                        <label>&nbsp;to register</label>
                    </div>
                    <div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-primary">Log in</button>
                    </div>
                </form>
                </div>
                <ErrorModal handleShow={isInvalid} handleClose={handleClose} bodyMassage="Invalid username or password" closeButton="Close"/>
            </div>
        </main>
    );
};



export default OpenScreen;