import { useState } from "react";

export const Player = ({ name, symbol , isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  return (
    <li className={isActive?'active':undefined}>
      <span className="player">
        <span style={{ display: !isEditing ? 'inline' : 'none' }} className="player-name">{playerName}</span>
        <input type="text" onChange={(e)=>setPlayerName(e.target.value)} value={playerName} style={{ display: isEditing ? 'inline' : 'none' }} />
        <span className="player-symbol">{symbol}</span>
        <button onClick={()=>{
            setIsEditing((editing)=>!editing);
        }}>{isEditing?'Save':'Edit'}</button>        
      </span>
    </li>
  );
};
