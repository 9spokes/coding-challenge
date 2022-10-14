import './App.css';
import Card from 'react-bootstrap/Card';

import data from './data/data.json';

function App() {
  const finanaceData = data.data.map((data) => {
    return (
      <Card key={data.account_identifier}>
        <Card.Body>
          <Card.Title>{data.account_name}</Card.Title>
          <Card.Text>{}</Card.Text>
        </Card.Body>
      </Card>
    );
  });

  return finanaceData;
}

export default App;
