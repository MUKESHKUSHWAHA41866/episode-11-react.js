
import React,  {lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
// import Grocery from "./components/Grocery";

// chunking
// code splitting
// Dynamic Bundling
// lazy loading
// on demand loading
// Dynamic import

const Grocery = lazy(() => import("./components/Grocery"));

const About = lazy(() => import("./components/About"));
const AppLayout = () => {


  const [userName, setUserName] = useState();

  // authantication 
  useEffect(() => {
    // Make an API call and username and password
    const data = {
      name: "Mukesh Kushwaha",
    }
    setUserName(data.name);
  }, [])
  
    return (
      
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}> 
        <div className="app">
        {/* <UserContext.Provider value={{ loggedInUser: "Elon Mask" }}>  */}
           <Header />
           {/* </UserContext.Provider> */}
           <Outlet />
           {/* {/* if path = /}
           <Body />
           {/* if path = /about */}
           {/* <About /> */}
           {/* if path = /contact */}
           {/* <Contact />  */} 
        </div>
        </UserContext.Provider>
    );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <Suspense fallback= {<h1>Loading............</h1>}><About /></Suspense>,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element:( <Suspense fallback= {<h1>Loading............</h1>}><Grocery /></Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element:  < RestaurantMenu />, 
      },
    ],
    errorElement: <Error />,
  },
  
]);

 const root = ReactDOM.createRoot(document.getElementById("root"));

 root.render(<RouterProvider router={appRouter}/>);