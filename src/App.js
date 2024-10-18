import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [isEditingTeam1, setIsEditingTeam1] = useState(false);
  const [isEditingTeam2, setIsEditingTeam2] = useState(false);

  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);

  const MAX_ACTIONS = 20;
  const VANDALISM_THRESHOLD = 500;

  const clickTimeout = 1000; 
  const team1ClickCount = useRef(0);
  const team2ClickCount = useRef(0);

  const updateScore = (team, change) => {
    const now = Date.now();
    const action = { team, change, timestamp: now };

    if (team === 1) setTeam1Score((prev) => prev + change);
    else setTeam2Score((prev) => prev + change);

    setUndoStack((prev) => [...prev.slice(-MAX_ACTIONS + 1), action]);
    setRedoStack([]);
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const lastAction = undoStack.pop();
    const { team, change } = lastAction;

    if (team === 1) setTeam1Score((prev) => prev - change);
    else setTeam2Score((prev) => prev - change);

    setRedoStack((prev) => [...prev.slice(-MAX_ACTIONS + 1), lastAction]);
    setUndoStack([...undoStack]);
  };

  const redo = () => {
    if (redoStack.length === 0) return;
    const lastUndone = redoStack.pop();
    const { team, change } = lastUndone;

    if (team === 1) setTeam1Score((prev) => prev + change);
    else setTeam2Score((prev) => prev + change);

    setUndoStack((prev) => [...prev.slice(-MAX_ACTIONS + 1), lastUndone]);
    setRedoStack([...redoStack]);
  };

  const handleScoreChange = (team, value) => {
    const newScore = Math.min(Math.max(parseInt(value) || 0, 0), 999);
    if (team === 1) setTeam1Score(newScore);
    else setTeam2Score(newScore);
  };

  const handleQuadrupleClick = (team) => {
    if (team === 1) {
      team1ClickCount.current++;
      setTimeout(() => (team1ClickCount.current = 0), clickTimeout);
      if (team1ClickCount.current === 4) setIsEditingTeam1(true);
    } else {
      team2ClickCount.current++;
      setTimeout(() => (team2ClickCount.current = 0), clickTimeout);
      if (team2ClickCount.current === 4) setIsEditingTeam2(true);
    }
  };

  const activateVandalMode = () => {
    if (undoStack.length < 2) return;
    const vandalActions = new Set();
  
    for (let i = 1; i < undoStack.length; i++) {
      const prevAction = undoStack[i - 1];
      const currentAction = undoStack[i];
  
      const timeDiff = currentAction.timestamp - prevAction.timestamp;
      if (timeDiff <= VANDALISM_THRESHOLD) {
        vandalActions.add(prevAction);
        vandalActions.add(currentAction);
      }
    }
  
    vandalActions.forEach(({ team, change }) => {
      if (team === 1) setTeam1Score((prev) => prev - change);
      else if (team === 2) setTeam2Score((prev) => prev - change);
    });
  
    setUndoStack((prev) =>
      prev.filter((action) => !vandalActions.has(action))
    );
  };

  return (
    <div className="container-fluid bg-custom">

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
            {isEditingTeam1 ? (
              <input
                type="number"
                className="form-control score-input"
                value={team1Score}
                onBlur={() => setIsEditingTeam1(false)}
                onChange={(e) => handleScoreChange(1, e.target.value)}
                autoFocus
              />
            ) : (
              <div
                className="score-box"
                onClick={() => handleQuadrupleClick(1)}
              >
                {team1Score}
              </div>
            )}
            <button className="btn score-btn btn-outline-warning" onClick={() => updateScore(1, 15)}>+15</button>
            <button className="btn score-btn btn-outline-success" onClick={() => updateScore(1, 10)}>+10</button>
            <button className="btn score-btn btn-outline-danger" onClick={() => updateScore(1, -5)}>-5</button>
          </div>
        </div>

        <div className="col-md-2 text-center">
          <button className="btn btn-undo" onClick={undo}>Undo</button><br></br>
          <button className="btn btn-undo mt-2" onClick={redo}>Redo</button><br></br>
          <button
            className="btn-circle mt-4"
            onClick={activateVandalMode}
          >
            Ian Mode
          </button>
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
            {isEditingTeam2 ? (
              <input
                type="number"
                className="form-control score-input"
                value={team2Score}
                onBlur={() => setIsEditingTeam2(false)}
                onChange={(e) => handleScoreChange(2, e.target.value)}
                autoFocus
              />
            ) : (
              <div
                className="score-box"
                onClick={() => handleQuadrupleClick(2)}
              >
                {team2Score}
              </div>
            )}
            <button className="btn score-btn btn-outline-warning" onClick={() => updateScore(2, 15)}>+15</button>
            <button className="btn score-btn btn-outline-success" onClick={() => updateScore(2, 10)}>+10</button>
            <button className="btn score-btn btn-outline-danger" onClick={() => updateScore(2, -5)}>-5</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
