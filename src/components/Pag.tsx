import React, { useEffect } from "react";
import { PaginationItem, Pagination, Box } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, fetchTasksBySearch } from "../actions/tasks";

export default function Pag() {
  const dispatch = useDispatch();
  const { numberOfPages, currentPage } = useSelector(
    (state: any) => state?.tasks
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paramsPage = searchParams.get("page");

  const invalidPageValues = [null, undefined, "null", "undefined"];
  const page = invalidPageValues.includes(paramsPage) ? "1" : paramsPage;
  const urlQuery = searchParams.get("searchQuery");
  const urlTags = searchParams.getAll("searchTags");
  const searchQuery = urlQuery || null;
  const searchTags = urlTags?.join(",") || null;

  useEffect(() => {
    if (page) {
      if (searchQuery || searchTags) {
        dispatch(fetchTasksBySearch({ searchQuery, searchTags }, page));
        console.log("search dispatched")
      } else {
        dispatch(fetchTasks(page));
      }
    }
  }, [searchQuery, searchTags, dispatch, page]);

  return (
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
