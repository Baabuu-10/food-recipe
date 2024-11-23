import Mainpage from "./Component/Mainpage";
import { Route, Routes } from "react-router-dom";
import MealInfo from "./Component/MealInfo";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Mainpage />} />
      <Route path="/:mealid" element={<MealInfo />} />
    </Routes>
  );
};

export default App;
