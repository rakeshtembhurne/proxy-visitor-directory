import React, { useState, useEffect } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Data } from 'react-data-grid-addons';

import './visitor-logs.styles.scss';

const selectors = Data.Selectors;
const defaultColumnProperties = {
  sortable: true,
  filterable: true,
};
const columns = [
  // { key: "visit_id", name: "ID", editable: false },
  { key: "visitor_name", name: "Title", editable: false },
  { key: "visit_date", name: "Visit Date", editable: false },
  { key: "host_name", name: "Host", editable: false },
  { key: "host_company", name: "Company", editable: false },
  // { key: "visitor_check_in", name: "Checked In", editable: false }
].map(c => ({...c, ...defaultColumnProperties}));

const sortRows = (initialRows, sortColumn, sortDirection) => rows => {
  const comparer = (a, b) => {
    if (sortDirection === "ASC") {
      return a[sortColumn] > b[sortColumn] ? 1 : -1;
    } else if (sortDirection === "DESC") {
      return a[sortColumn] < b[sortColumn] ? 1 : -1;
    }
  };
  return sortDirection === "NONE" ? initialRows : [...rows].sort(comparer);
};

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function VisitorLogs() {
  const [filters, setFilters] = useState({});
  const [rows, setRows] = useState([]);
  const [dataGridRef, setDataGridRef] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl =
        "https://epic-gates-a1c2f8.netlify.com/.netlify/functions/getVisits?count=100";
      const response = await fetch(apiUrl);
      const data = await response.json();
      setRows(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataGridRef && dataGridRef.onToggleFilter) {
      dataGridRef.onToggleFilter();
    }
  }, [dataGridRef])
  
  const filteredRows = getRows(rows, filters);

  return (
    <div className="visitor-logs">
      <ReactDataGrid
        ref={setDataGridRef}
        columns={columns}
        rowGetter={i => filteredRows[i]}
        rowsCount={filteredRows.length}
        minHeight={500}
        onAddFilter={filter => setFilters(handleFilterChange(filter))}
        onClearFilters={() => setFilters({})}
        onGridSort={(sortColumn, sortDirection) =>
          setRows(sortRows(rows, sortColumn, sortDirection))
        }
      />
    </div>
  );
}

export default VisitorLogs;