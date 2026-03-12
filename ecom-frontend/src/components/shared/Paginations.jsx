import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Paginations = ({totalPages}) => {
    const [searchParams] = useSearchParams()
    const params = new URLSearchParams(searchParams)
    const navigate = useNavigate()
    const pathName = useLocation().pathname
    const paramValue = searchParams.get("page") 
                        ? Number(searchParams.get("page"))
                        : 1

    const onChangeHandler = (event , value) => {
        params.set("page" , value.toString())
        navigate(`${pathName}?${params}`)
    }

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={paramValue}
        shape="rounded"
        defaultPage={1}
        siblingCount={1}
        boundaryCount={2}
        onChange={onChangeHandler}
      />
    </Stack>
  );
};

export default Paginations;
