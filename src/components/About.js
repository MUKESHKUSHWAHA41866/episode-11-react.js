import User from "./User";
import UserClass from "./UserClass";
import { Component} from "react";
import UserContext from "../utils/UserContext";

class About extends Component {
    constructor(props) {
       super(props); 

    //    console.log("Parent constructor");
    }

    componentDidMount() {
        // console.log("Parent Component Did Mount");
       }
    render() {
        // console.log("Parent Render");
        return (
            <div>
                <h1>About Class Component</h1>
                <div>
                    loggedIn User
                    <UserContext.Consumer>
                        {({loggedInUser}) => <h1 className="text-xl font-bold"> {loggedInUser}</h1>}
                    </UserContext.Consumer>
                </div>
                <h2>This is Namaste React Web Series</h2>
                {/* <User name={"Mukesh Singh (function)"}/> */}
    
                <UserClass name={"Mukesh kushwaha (classs)"} location={"Allahabad Class"} />
                
            </div>
        );
    }
}

 

/*
- parent Constructor
- parent Render
 - Mukesh Constructor
 - mukesh Render
 - mukesh ComponentDidMount

  -rakesh constructor
  -rakesh render
  -rakesh component

- parent componentDidMount 

*/

export default About; 