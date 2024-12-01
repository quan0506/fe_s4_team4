import React, { useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function GenericTable({
                                         headers,
                                         data,
                                         onRowClick,
                                         renderRow
                                     }) {
    const tableContainerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Sort data by `createdAt` field
    const sortedData = data.slice().sort((a, b) => {
        if (!a.createdAt || !b.createdAt) return 0;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // descending order
    });

    // Start dragging
    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.pageX - (tableContainerRef.current?.offsetLeft || 0));
        setScrollLeft(tableContainerRef.current?.scrollLeft || 0);
    };

    // Handle dragging movement
    const handleMouseMove = (event) => {
        if (!isDragging) return;
        event.preventDefault();
        const x = event.pageX - (tableContainerRef.current?.offsetLeft || 0);
        const scroll = (x - startX) * 1.5;
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollLeft = scrollLeft - scroll;
        }
    };

    // Stop dragging
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleRowClick = (row, event) => {
        const selection = window.getSelection();
        if (selection?.toString()) {
            return;
        }
        if (onRowClick && event.type === 'click') {
            onRowClick(row);
        }
    };

    return (
      <TableContainer
        component={Paper}
        ref={tableContainerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        sx={{
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            overflowX: 'auto',
            cursor: isDragging ? 'grabbing' : 'auto'
        }}
      >
          <Table>
              <TableHead>
                  <TableRow>
                      {headers.map((header, idx) => (
                        <TableCell
                          key={idx}
                          onMouseDown={handleMouseDown}
                          sx={{
                              color: 'white',
                              cursor: 'grab',
                              userSelect: 'none',
                          }}
                        >
                            {header}
                        </TableCell>
                      ))}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {sortedData.map((row, idx) => (
                    <TableRow
                      key={idx}
                      onClick={(event) => handleRowClick(row, event)}
                      sx={{
                          cursor: onRowClick ? 'pointer' : '',
                          borderBottom: idx === data.length - 1 ? 'none' : undefined,
                          '&:hover': {
                              backgroundColor: onRowClick ? 'hsl(0deg 0.83% 52.94%)' : '',
                          },
                      }}
                    >
                        {React.Children.map(renderRow(row).props.children, (cell, cellIdx) => {
                            return cell
                              ? React.cloneElement(cell, {
                                  key: cellIdx,
                                  sx: {
                                      ...(cell.props.sx || {}),
                                      color: 'white',
                                      fontSize: '14px',
                                      borderBottom: idx === data.length - 1 ? 'none' : undefined,
                                  },
                              })
                              : null;
                        })}
                    </TableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
    );
}
