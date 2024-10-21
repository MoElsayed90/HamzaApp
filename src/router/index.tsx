import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import RootLayout from "../Pages/Layout";
import HomePage from "../Pages/HomePage";
import Author from "../Pages/Author";
import ListOfAuthors from "../Pages/ListOfAuthors";
import Quran from "../Pages/Quran";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />} >

        <Route
          index
          element={<HomePage />} />
        <Route
          path="author/:id/:authorId"
          element={<Author />} />
        <Route
          path="authors"
          element={<ListOfAuthors />} />
      </Route>
        <Route
          path="authors"
          element={<Quran />} />



    </>
  )
);



export default router;