import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const CommonMatTable = ({ columns, data, title }) => {
  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    enableFullScreenToggle: false,
    renderTopToolbarCustomActions: () => <h4>{title}</h4>,
  });

  return <MaterialReactTable table={table} />;
};

export default CommonMatTable;
