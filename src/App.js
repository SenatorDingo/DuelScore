import React, { useState } from 'react';
import './App.css';

function App() {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const [lastAction, setLastAction] = useState(null);

  const updateScore = (team, change) => {
    if (team === 1) {
      setTeam1Score(team1Score + change);
    } else {
      setTeam2Score(team2Score + change);
    }

    setLastAction({ team, change });
  };

  const undo = () => {
    if (lastAction) {
      if (lastAction.team === 1) {
        setTeam1Score(team1Score - lastAction.change);
      } else {
        setTeam2Score(team2Score - lastAction.change);
      }
      setLastAction(null);
    }
  };

  return (
    <div className="container-fluid bg-light p-4">
      <div className="text-center mb-4">
        <h1>DuelScore</h1>
      </div>

      <div className="row mb-4">
        <div className="col-md-2 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={undo}>Undo</button>
        </div>
        <div className="col-md-8">
          <div className="row mb-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Team Name"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                value={team1Score}
                readOnly
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              <button className="btn btn-danger btn-lg" onClick={() => updateScore(1, -5)}>-5 pts</button>
            </div>
            <div className="col">
              <button className="btn btn-success btn-lg" onClick={() => updateScore(1, 10)}>+10 pts</button>
            </div>
            <div className="col">
              <button className="btn btn-warning btn-lg" onClick={() => updateScore(1, 15)}>+15 pts</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-2 d-flex justify-content-center">
          <button className="btn btn-outline-secondary" onClick={undo}>Undo</button>
        </div>
        <div className="col-md-8">
          <div className="row mb-2">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Team Name"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                value={team2Score}
                readOnly
              />
            </div>
          </div>
          <div className="row text-center">
            <div className="col">
              <button className="btn btn-danger btn-lg" onClick={() => updateScore(2, -5)}>-5 pts</button>
            </div>
            <div className="col">
              <button className="btn btn-success btn-lg" onClick={() => updateScore(2, 10)}>+10 pts</button>
            </div>
            <div className="col">
              <button className="btn btn-warning btn-lg" onClick={() => updateScore(2, 15)}>+15 pts</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
