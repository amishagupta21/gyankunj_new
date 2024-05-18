import React, { useState } from "react";
import Table from 'react-bootstrap/Table';

const TableComponent = ({data, column}) => {
    return (
        <>
        <Table striped bordered hover>
      <thead>
        <tr>
          {column.map((item, indx) => <TableHeader item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, indx) =><TableRow item={item} column={column} /> )}
        </tbody>
        </Table>
        </>
    )
}

const TableHeader = ({ item }) => <th>{item.field}</th>

const TableRow = ({ item, column }) => (
    <tr>{column.map((columnItem, indx) => {
        return <td>{item[`${columnItem.value}`]}</td>
    })}</tr>
)

export default TableComponent;