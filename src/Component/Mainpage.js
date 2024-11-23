import { useState } from "react";
import MealCards from "./MealCards";

const Mainpage = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [msg, setMsg] = useState("");

    const handleInput = (event) => {
        setSearch(event.target.value);
        if (msg) setMsg(""); // Clear error message on input
    };

    const myFun = async () => {
        if (!search.trim()) {
            setMsg("Please enter something");
            return;
        }
        try {
            const get = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.trim()}`);
            const jsonData = await get.json();
            if (jsonData.meals) {
                setData(jsonData.meals);
                setMsg(""); // Clear any previous error message
            } else {
                setData([]);
                setMsg("No results found for your search");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMsg("Something went wrong. Please try again.");
        }
    };

    const clearSearch = () => {
        setSearch("");
        setData([]);
        setMsg("");
    };

    return (
        <>
            <h1 className="head">FOOD RECIPE APP</h1>
            <div className="container">
                <div className="searchBar">
                    <input
                        type="text"
                        placeholder="Enter Dish"
                        value={search}
                        onChange={handleInput}
                    />
                    <button onClick={myFun}>Search</button>
                    <button onClick={clearSearch}>Clear</button>
                </div>
                <h4 className="error">{msg}</h4>
                <div>
                    <MealCards detail={data} />
                </div>
            </div>
        </>
    );
};

export default Mainpage;
