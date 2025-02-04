import { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);

  const handleAsk = async () => {
    try {
      const result = await axios.post('http://coycafe.ddns.net:3000/ask', {
        question: question,
      });
      setResponse(result.data);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const handleShowHistory = async () => {
    try {
      const result = await axios.get('http://coycafe.ddns.net:3001/events/latest');
      // console.log(result);
      setResponse(result.data);
    } catch (error) {
      console.error('Error fetching event history:', error);
    }
  };

  const renderTableHeaders = (data) => {
    return Object.keys(data).map((key) => (
      <th key={key} className="align-top">
        {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
      </th>
    ));
  };

  const renderTableRow = (item) => {
    return Object.entries(item).map(([key, value]) => (
      <td key={key} className="align-top">
        {key.includes('date') || key.includes('time') ? (
          (() => {
            try {
              const date = new Date(value);
              if (isNaN(date.getTime())) {
                throw new Error('Invalid Date');
              }
              return date.toLocaleString();
            } catch (error) {
              console.error('Date parsing error for value:', value, 'Error:', error);
              return 'Invalid Date';
            }
          })()
        ) : (
          value as React.ReactNode
        )}
      </td>
    ));
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Quick Patient Information</h1>

      <div className="mb-3">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
          className="form-control"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <button onClick={handleAsk} className="btn btn-primary me-2">
          Ask
        </button>
        <button onClick={handleShowHistory} className="btn btn-secondary">
          Show History
        </button>
      </div>

      <div className="mt-3">
        {response && response.length > 0 ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>{renderTableHeaders(response[0])}</tr>
            </thead>
            <tbody>
              {response.map((item, index) => (
                <tr key={index}>{renderTableRow(item)}</tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No data available.</p>
        )}
      </div>
    </div>
  );
}

export default App;