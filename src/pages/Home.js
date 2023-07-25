import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";

const TableRowComponent = ({ row }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);
  
  const trimText = (text, maxLength) => {
    if (text.length > maxLength) {
      return `${text.substring(0, maxLength)}...`;
    }
    return text;
  };
  
  const [detailText, setDetailText] = useState(trimText(row.details, 50));
  
  const handleShowMoreClick = () => {
    setShowFullDetails(!showFullDetails);
    if (!showFullDetails) {
      setDetailText(row.details);
    } else {
      setDetailText(trimText(row.details, 50));
    }
  };
  
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.title}</TableCell>
      <TableCell>{row.year}</TableCell>
      <TableCell>{row.nation}</TableCell>
      <TableCell>
        {showFullDetails ? row.details : detailText}
        <Button href="#text-buttons" onClick={handleShowMoreClick} sx={{fontSize: "12px", paddingLeft: 1}}>
          {showFullDetails ? 'less' : 'more'}
        </Button>
      </TableCell>
      <TableCell>{row.edit}</TableCell>
    </TableRow>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const column = [
    { id: "no", label: "ID", minWidth: 170 },
    { id: "name", label: "Title", minWidth: 170 },
    { id: "year", label: "Year", minWidth: 170 },
    { id: "nation", label: "Nation", minWidth: 170 },
    { id: "detail", label: "Detail", minWidth: 170 },
  ];
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://64ac34619edb4181202f46db.mockapi.io/films");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        className="container"
        sx={{
          mt: 5,
          width: "90%",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              {column.map((column) => (
                <TableCell key={column.id} align="left">
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
              .map((row) => (
                <TableRowComponent key={row.id} row={row} />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};
export default Home;
