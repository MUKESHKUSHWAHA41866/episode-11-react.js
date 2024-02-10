import React from "react";

class UserClass extends React.Component {

   constructor(props) {
    super(props);
      
    this.state = {
       userInfo: {
        name: "Dummy",
        location: "Default",
        // avatar_url: "htp://dummy-photo.com"
       } ,
    };
    //  console.log(this.props.name +"Child Constructor");
   }

    async componentDidMount() {
    // console.log(this.props.name +"Child Component Did Mount");

    // API call

     const data = await fetch("https://api.github.com/users/MUKESHKUSHWAHA41866");
     const json = await data.json();

     this.setState({
        userInfo: json,
     });

    //  console.log(json);
   }

    componentDidUpdate() {
        // console.log("component Did Update");
    }

    componentWillUnmount () {
    //    console.log("component will unmount");
    }

    render() {
     
        // const { name, location} = this.props;
         
         const {name, location, avatar_url} = this.state.userInfo;
        console.log(this.props.name + "Child Render"); 
        return (
        <div className="user-card">
            <img src={avatar_url}></img>
        <h2>Name: {name } </h2>
        <h3>Location: { location}</h3>
        <h4>Contact:7607968476</h4>
    </div>
        );
    };
};

export default UserClass;