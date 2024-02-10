
// import resList from "../utils/mockData";
import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import {useEffect, useState, useContext} from "react";
// import resList from "../utils/mockData";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";



const Body = () => {
  
    // Local State Variable
    const [listOfRestaurants, setListOfRestraunt] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted =withPromotedLabel(RestaurantCard);

    // whenever state variable update , react triggers a reconcilation cycle(re-render the component)
    // console.log("Body Rendered ");


   useEffect(()=>{
     fetchData();
   },[]);
    
   const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.4358011&lng=81.846311&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();
    // console.log(json);
    setListOfRestraunt(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
   };

   const onlineStatus = useOnlineStatus();

   if (onlineStatus === false) {
    return (
 <h1> Looks like you are offline!! please check your internet connection;</h1>
   );
   }
     const {  setUserName ,loggedInUser } = useContext(UserContext);
    return  listOfRestaurants.length ===0 ?  (
      <Shimmer/>
    ) : (
       <div className="body">
           <div className="filter flex">
            <div className="search m-4 p-4">
                <input type="text"
                 className="border border-solid border-black" 
                 value= {searchText} onChange={(e) => {
                    setSearchText(e.target.value);
                }}/>
                <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" 
                onClick={() => {
                  console.log(searchText);
                 const filteredRestaurant = listOfRestaurants.filter((res)=> 
                 res.info.name.toLowerCase().includes(searchText.toLowerCase()) );
                 setFilteredRestaurant(filteredRestaurant);
                }}
                >
                    Search
                    </button>
            </div>
            <div className="search m-4 p-4 flex items-center">
            <button className="px-4 py-2 bg-gray-100 rounded-lg" onClick={() => {
                const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
                setListOfRestraunt(filteredList);

                 
        }}
        >
            Top Rated Restaurants</button>
            </div>

            <div className="search m-4 p-4 flex items-center">
            <label>UserName : </label>
            <input className="border border-black p-2"
            value={loggedInUser} 
            onChange={(e) => setUserName(e.target.value)}/>
            </div>
            
           </div>
           <div className="flex flex-wrap">
            {filteredRestaurant.map((Restaurants) =>(
              <Link key={Restaurants.info.id}
              to={"/restaurants/" +Restaurants.info.id }> 
              { 
              Restaurants.info.promoted ? (<RestaurantCardPromoted resData = {Restaurants}/>) :( <RestaurantCard resData = {Restaurants}/> )}
                </Link>
              ))} 
 
           </div>
       </div>
       );  
   };


   export default Body;