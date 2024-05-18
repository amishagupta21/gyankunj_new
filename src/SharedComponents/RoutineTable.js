import React, { useState } from "react";
import Table from 'react-bootstrap/Table';

const RoutineTableComponent = ({data, column, rowData}) => {
    return (
        <>
        <Table striped bordered hover>
      <thead>
        <tr>
          {column.map((item, indx) => <TableHeader item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, indx) =><TableRow item={item} rowData={rowData} /> )}
        </tbody>
        </Table>
        </>
    )
}

const TableHeader = ({ item }) => <th>{item.field}</th>

const TableRow = ({ item, rowData }) => (
    <tr>
        {rowData.map((rowItem, indx) => {
        return <td>{item[`${rowItem.value}`]}</td>
    })}
    </tr>
)

export default RoutineTableComponent;