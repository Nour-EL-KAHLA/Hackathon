import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Home></Home>
            </>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
