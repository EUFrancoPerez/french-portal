import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "fileName", headerName: "File name", width: 130 },
  { field: "author", headerName: "Author", width: 130 },
  {
    field: "pages",
    headerName: "Pages",
    type: "number",
    width: 130,
  },
];

const rows = [
  {
    id: 1,
    fileName: "Learn French 1",
    author: "Laura",
    pages: 35,
  },
  { id: 2, fileName: "Learn French 2", author: "Laura", pages: 44 },
  { id: 3, fileName: "Learn French 3", author: "Laura", pages: 55 },
  {
    id: 4,
    fileName: "Learn French 4",
    author: "Laura",
    pages: 77,
  },
  {
    id: 5,
    fileName: "Learn French 5",
    author: "Laura",
    pages: 88,
  },
  {
    id: 6,
    fileName: "Learn French 6",
    pages: 315,
  },
];

function Documents() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div
        style={{
          height: 400,
          width: "700px",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Box>
  );
}

export default Documents;
