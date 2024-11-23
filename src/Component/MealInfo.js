import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const MealInfo = () => {
    const { mealid } = useParams();
    const [info, setInfo] = useState(null);

    // Fetch meal details when the component mounts or mealid changes
    useEffect(() => {
        const getInfo = async () => {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`);
                const jsonData = await response.json();
                setInfo(jsonData.meals[0]); // Save the meal data in state
            } catch (error) {
                console.error("Error fetching meal data:", error);
            }
        };

        getInfo();
    }, [mealid]); // Dependency ensures the effect runs only when mealid changes

    return (
        <div>
            {!info ? (
                <p>Loading...</p>
            ) : (
                <div className="mealInfo">
                    <img src={info.strMealThumb} alt={info.strMeal} />
                    <div className="info">
                        <h1>Recipe Detail</h1>
                        <button>{info.strMeal}</button>
                        <h3>Instructions</h3>
                        <p>{info.strInstructions}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealInfo;