import { useEffect } from "react";
import { PaginationItem, Pagination, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, fetchTasksBySearch } from "../actions/tasks";

export default function Pag({ sort }: { sort: string }) {
  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  // Get the numberOfPages and currentPage from the Redux store
  const { numberOfPages, currentPage } = useSelector(
    (state: any) => state?.tasks
  );

  // Get the current URL location using React Router's useLocation hook
  const location = useLocation();

  // Get the "page" parameter from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const paramsPage = searchParams.get("page");

  // Handle invalid or missing page values
  const invalidPageValues = [null, undefined, "null", "undefined"];
  const page = invalidPageValues.includes(paramsPage) ? "1" : paramsPage;

  // Extract searchQuery and searchTags from the URL query parameters
  const urlQuery = searchParams.get("searchQuery");
  const urlTags = searchParams.getAll("searchTags");
  const searchQuery = urlQuery || null;
  const searchTags = urlTags?.join(",") || null;

  // Fetch tasks based on page, searchQuery, and searchTags
  useEffect(() => {
    if (page) {
      if (searchQuery || searchTags) {
        // Fetch tasks with search parameters
        dispatch(fetchTasksBySearch({ searchQuery, searchTags }, page, sort));
      } else {
        // Fetch tasks without search parameters
        dispatch(fetchTasks(page, sort));
      }
    }
  }, [searchQuery, searchTags, dispatch, page, sort]);

  return (
    // Render the pagination component if currentPage exists
    currentPage && (
      <Box
        borderRadius={3}
        p={1}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          mt: "auto",
          width: "fit-content",
          mx: "auto",
          mb: 2,
        }}
      >
        <Pagination
          page={Number(page)}
          renderItem={(item) => (
            // Customize the PaginationItem to include appropriate links
            <PaginationItem
              to={
                !(searchQuery || searchTags)
                  ? `/?page=${item.page}`
                  : `/search?searchQuery=${searchQuery}&searchTags=${searchTags}&page=${item.page}`
              }
              component={Link}
              {...item}
            />
          )}
          size="large"
          count={numberOfPages || 0}
          defaultPage={1}
          color={"primary"}
        />
      </Box>
    )
  );
}
