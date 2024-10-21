import { useEffect, useState } from "react";
import { Authors, AuthorsData } from "../interfaces";
import { NavLink } from "react-router-dom";

const ListOfAuthors = () => {
  const [authors, setAuthors] = useState<AuthorsData>({ id: 0, title: '', recitations: [] })
  const [search, setSearch] = useState(""); // State to keep track of search input
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/quran/get-category/364764/ar/json");
        const res = await response.json()
        console.log(res)
        setAuthors(res)
      } catch (error) {
        console.log("error")
      }
    }
    fetchData()
  }, [])
  // const authorId = authors.recitations.map(recitation => {
  //   const authorInfo = recitation.prepared_by.find(info => info.type === 'author');
  //   return authorInfo ? authorInfo.id : null; // Return the author's ID or null if not found
  // })
  // console.log(authorId); // This will log an array of author IDs
  // Filter authors based on search input
  const filteredAuthors = authors.recitations.filter((author: { title: string }) =>
    author.title.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>
      <div className="space-y-5 px-8 Home my-5">
        <div className="flex items-center justify-center">

          <label className="input input-bordered flex justify-center items-center gap-2">
            <input type="text"
              placeholder="البحث بأسم القارئ .. "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-7"
            />
          </label>
        </div>
        <div className="flex justify-center items-center">
          <h1 className=" text-2xl font-extrabold text-appcolor">{authors.title}</h1>
        </div>
        <div className="grid md:grid-cols-4 gap-3">
          {
            filteredAuthors.map((author: Authors) => {

              const authorInfo = authors.recitations.find(recitation => recitation.id === author.id);
              const authorId = authorInfo ? authorInfo.prepared_by.find(info => info.type === 'author')?.id : null;

              return (

                <div key={author.id} className="card bg-appcolor shadow-xl grid-cols-1 cursor-pointer transition ease-in-out delay-150   hover:scale-105  duration-300 " >
                  <NavLink to={`/author/${author.id}/${authorId}`} className="card-body  flex justify-center items-center md:m-3 ">
                    <p className="  text-base-content/70 text-xs text-white font-semibold">{author.title}</p>
                  </NavLink>
                </div>

              )
            }
            )
          }
        </div>
      </div>
    </div>
  )

}

export default ListOfAuthors;