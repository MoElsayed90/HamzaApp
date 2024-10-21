import { useEffect, useState } from "react";
import { Authors } from "../interfaces";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  const [authors, setAuthors] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/364794/ar/json");
        const res = await response.json()
        console.log(res)
        const filterdAuthors = res.authors.filter((author: Authors) => (author.id === 135998 || author.id === 8195 || author.id === 8326 || author.id === 8474 || author.id === 86335 || author.id === 111670 || author.id === 111542 || author.id === 151567))
        setAuthors(filterdAuthors)
      } catch (error) {
        console.log("error")
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <div className="space-y-5 px-8 Home">

        <div className="flex justify-center items-center">
          <h1 className=" text-2xl font-extrabold text-appcolor">القرأن الكريم</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          {
            authors.map((author: Authors) => (
              <>
                <div key={author.id} className="card bg-appcolor shadow-xl grid-cols-1 cursor-pointer transition ease-in-out delay-150   hover:scale-105  duration-300 " >
                  <NavLink to={`/author/${author.id}`} className="card-body  flex justify-center items-center md:m-3 ">
                    <p className="  text-base-content/70 text-xs text-white font-semibold">{author.title}</p>
                  </NavLink>
                </div>
              </>
            )
            )
          }
        </div>
        <div className="flex items-center justify-center">

          <NavLink to="/authors" className="btn btn-outline px-16  ">المزيد من القراء </NavLink>
        </div>

      </div>
    </>
  )

}

export default HomePage;