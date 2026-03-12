import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdDelete, MdSearch } from "react-icons/md";
import {
  useLocation,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const Filter = ({categories}) => {
  // const categories = [
  //   { categoryId: 1, categoryName: "Electronics" },
  //   { categoryId: 2, categoryName: "Clothing" },
  //   { categoryId: 3, categoryName: "Furniture" },
  //   { categoryId: 4, categoryName: "Books" },
  //   { categoryId: 5, categoryName: "Toys" },
  //   { categoryId: 6, categoryName: "Travel" },
  // ];

  const [searchParams] = useSearchParams();
  const param = new URLSearchParams(searchParams);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "all";
    const currentSortOrder = searchParams.get("sortOrder") || "asc";
    const currentSearchTerm = searchParams.get("keyword") || "";

    setCategory(currentCategory);
    setSortOrder(currentSortOrder);
    setSearchTerm(currentSearchTerm);
  }, [searchParams]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "all") {
      param.delete("category");
    } else {
      param.set("category", selectedCategory);
    }

    navigate(`${pathName}?${param}`);
    setCategory(e.target.value);
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);

    param.set("sortOrder", newOrder);
    navigate(`${pathName}?${param}`);
  };

  const handleClearFilter = () => {
    navigate({ pathName: window.location.pathName });
  };

  useEffect(() => {
   const timer = setTimeout(() => {
    const param = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      param.set("keyword", searchTerm);
    } else {
      param.delete("keyword");
    }

    navigate(`${pathName}?${param}`);
  }, 700);

  return () => clearTimeout(timer);
  }, [searchParams, navigate, searchTerm, pathName]);

  // const handleSearchTerm = (event) => {
  //   const currentSearchTerm = event.target.value
  //   setSearchTerm(currentSearchTerm)
  //   param.set("searchTerm" , searchTerm)
  //   if(searchParams == ""){
  //     param.delete("searchTerm")
  //   }
  //   navigate(`${pathName}?${param}`)
  // };

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-2 md:flex-row md:justify-between">
      {/*Search Bar*/}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          value={searchTerm}
          onChange={(e) => (setSearchTerm(e.target.value))}
          type="text"
          placeholder="Search Products"
          className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#1976d2]"
        />
        <MdSearch className="absoule left-3 text-slate-800 size-6 ms-2" />
      </div>

      {/*Category Selector*/}
      <div className="flex sm:flex-row flex-col gap-4 items-center ">
        <FormControl
          className="text-slate-800 border-slate-700"
          variant="outlined"
          size="small"
        >
          <InputLabel>Category</InputLabel>
          <Select
            id="category-select-label"
            value={category}
            onChange={handleCategoryChange}
            label="Category"
            className="min-w-[120px] text-slate-800 border-slate-700"
          >
            <MenuItem value="all">All</MenuItem>
            {categories.map((item) => {
              return (
                <MenuItem value={item.categoryName} key={item.categoryId}>
                  {item.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        {/*SORT BUTTON*/}
        <Tooltip
          title={
            sortOrder === "asc" ? "Sorted by price asc" : "Sorted by price desc"
          }
        >
          <Button
            onClick={toggleSortOrder}
            variant="contained"
            color="primary"
            className="flex items-center gap-2 h-10"
          >
            Sort By
            {sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
          </Button>
        </Tooltip>

        {/*Clear Filter*/}
        <Button
          onClick={handleClearFilter}
          variant="contained"
          color="error"
          className="flex items-center gap-2 h-10"
        >
          <span>Clear Filter </span>
          <MdDelete></MdDelete>
        </Button>
      </div>
    </div>
  );
};
export default Filter;
