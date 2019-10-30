import React from 'react';
import ReactDataGrid from 'react-data-grid';

import './visitor-logs.styles.scss';

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

class VisitorLogs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      logs: []
    }
  }

  async componentDidMount() {
    const apiUrl =
      "https://epic-gates-a1c2f8.netlify.com/.netlify/functions/getVisits?count=5";

    const response = await fetch(apiUrl);
    const data = await response.json();
    this.setState(state => {
      return {
        ...state,
        logs: data
      }
    })
  }

  render() {
    return (
      <div className="visitor-logs">
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.logs[i]}
          rowsCount={this.state.logs.length}
          enableCellSelect={true}
        />
      </div>
    );
  }
  
};

export default VisitorLogs;