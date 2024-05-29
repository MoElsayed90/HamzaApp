import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../Pages/Layout";
import HomePage from "../Pages/HomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} >

        <Route
          index
          element={<HomePage/>} />
      </Route>


    </>
  )
);



export default router;