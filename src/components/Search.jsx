import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import { useState,useEffect } from 'react';
import axios from "axios";
import { useNavigate,createSearchParams } from "react-router-dom";

const Search = () => {

  const [suggestions, setSuggestions]= useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();
    navigate({
      pathname: "search",
      search: `${createSearchParams({
      category:`${category}`,
      searchTerm:`${searchTerm}`
      })
      }`,
    });

    setSearchTerm("")
    setCategory("All")
  }
  

  const getSuggestions=() => {
    axios
      .get("/data/suggestions.json")
      .then((response) => {
        setSuggestions([...response.data]);
        
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }
  

  useEffect(()=>{
    getSuggestions();
  },[])

  return (
    <div className="w-[100%]">
      <div className="flex items-center h-10 bg-amazonclone-yellow rounded">
        <select
          className="p-2 bg-gray-300 text-black border text-xs xl:text-sm"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Deals</option>
          <option>Amazon</option>
          <option>Fashion</option>
          <option>Computers</option>
          <option>Home</option>
          <option>Mobiles</option>
        </select>
        <input
          className="flex grow items-center h-[100%] rounded-l text-black"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={onhandleSubmit} className="w-[45px]">
          <MagnifyingGlassIcon className="h-[27px] m-auto stroke-slate-900" />
        </button>
      </div>
      {suggestions && (
        <div className="bg-white text-black w-full z-40 absolute">
          {suggestions
            .filter((suggestion) => {
              const currentSearchTerm = searchTerm.toLowerCase();
              const title = suggestion.title.toLowerCase();
              return (
                currentSearchTerm &&
                title.startsWith(currentSearchTerm) &&
                title !== currentSearchTerm
              );
            })
            .slice(0, 10)
            .map((suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => setSearchTerm(suggestion.title)}
              >
                {suggestion.title}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Search