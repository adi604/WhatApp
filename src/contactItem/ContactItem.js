import UsersData from "../usersData/UsersData";

function ContactItem(props) {

    var ImageChat;
    for (let i = 0; i < UsersData.usersList.length; ++i) {
        if (UsersData.usersList[i].userName === props.contactName) {
            ImageChat = UsersData.usersList[i].image;
        }
    }

    // function calculates the time that passed since time argument and return a string represnts it 
    const timePassedSince = (time) => {
        let currTime = new Date();
        let diffTime = Math.abs(currTime - time);
        diffTime = diffTime / 1000;
        if(props.lastMessage === "") {
            return "";
        } else if(diffTime < 60) {
            return "Right now";
        } else if((diffTime / 60) < 60) {
            return Math.round(diffTime / 60) + " minutes ago"
        } else if((diffTime / 60*60) < 24) {
            return Math.round(diffTime / 60*60) + " hours ago"
        }
        return time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();
    }

    return (
        <ul className="list-group users-list">
            <button type="button" className="list-group-item list-group-item-action" onClick={() => {props.setDetails(props.contactName)}}>
                <div className="sideBar-body">
                    <div className="avatar-icon">
                        <img src={ImageChat}></img>
                    </div>
                    <div className="sideBar-name">{props.contactName}
                    </div>
                    <div className="lastMessage">{props.lastMessage}</div>
                    <span className="time-meta">{timePassedSince(props.sentTime)}</span>
                </div>
            </button>
        </ul>
    );
}

export default ContactItem