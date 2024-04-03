import React from "react";
import '../Styles/CommonMatTable.css'
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonMatTable = ({ columns, data, renderTopToolbar, isLoading }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    state: {
      isLoading: isLoading
    },
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    renderTopToolbarCustomActions:renderTopToolbar
  });

  return <MaterialReactTable table={table} />;
};

export default CommonMatTable;
