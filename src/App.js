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
    <div className="container-fluid bg-custom">
      <div className="text-center title-box">
        <h1 className="title">DuelScore</h1>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-4 text-center">
          <div className="team-box">
            <input
              type="text"
              className="form-control team-name"
              placeholder="Team 1 Name"
              value={team1Name}
              onChange={(e) => setTeam1Name(e.target.value)}
            />
            <div className="score-box">{team1Score}</div>
            <button className="btn score-btn btn-outline-danger" onClick={() => updateScore(1, 15)}>+15</button>
            <button className="btn score-btn btn-outline-success" onClick={() => updateScore(1, 10)}>+10</button>
            <button className="btn score-btn btn-outline-warning" onClick={() => updateScore(1, -5)}>-5</button>
          </div>
        </div>

        <div className="col-md-2 text-center">
          <button className="btn btn-undo" onClick={undo}>Undo</button>
        </div>

        <div className="col-md-4 text-center">
          <div className="team-box">
            <input
              type="text"
              className="form-control team-name"
              placeholder="Team 2 Name"
              value={team2Name}
              onChange={(e) => setTeam2Name(e.target.value)}
            />
            <div className="score-box">{team2Score}</div>
            <button className="btn score-btn btn-outline-danger" onClick={() => updateScore(2, 15)}>+15</button>
            <button className="btn score-btn btn-outline-success" onClick={() => updateScore(2, 10)}>+10</button>
            <button className="btn score-btn btn-outline-warning" onClick={() => updateScore(2, -5)}>-5</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
