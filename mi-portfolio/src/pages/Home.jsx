import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Home = () => {
  const navigate = useNavigate();
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [moveCount, setMoveCount] = useState(0);
  const [gameMessage, setGameMessage] = useState('¡Encuentra el camino hacia mi hobby!');
  const [showHint, setShowHint] = useState(false);
  
  // Tamaño del laberinto
  const rows = 25;
  const cols = 25;
  
  // Estado inicial del laberinto (0 = camino bloqueado, 1 = camino libre)
  // Laberinto 25x25 - más complejo y divertido
const initialMaze = [
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1]
];
  
  const [maze, setMaze] = useState(initialMaze);
  
  // Posición de la meta (esquina inferior derecha)
  const targetPosition = { x: rows - 1, y: cols - 1 };
  
  // Función para cambiar el laberinto
  const shuffleMaze = () => {
    const newMaze = [...initialMaze.map(row => [...row])];
    
    // Cambiar algunos caminos aleatoriamente
    for (let i = 0; i < 250; i++) {
      const randomRow = Math.floor(Math.random() * rows);
      const randomCol = Math.floor(Math.random() * cols);
      
      // No cambiar la posición inicial ni la final
      if ((randomRow !== 0 || randomCol !== 0) && 
          (randomRow !== rows - 1 || randomCol !== cols - 1)) {
        newMaze[randomRow][randomCol] = newMaze[randomRow][randomCol] === 1 ? 0 : 1;
      }
    }
    
    setMaze(newMaze);
    setGameMessage('¡El laberinto ha cambiado! Sigue intentando.');
  };
  
  // Efecto para cambiar el laberinto cada 25 movimientos
  useEffect(() => {
    if (moveCount > 0 && moveCount % 5 === 0) {
      shuffleMaze();
      
      // Volver al diseño original después de 25 movimientos más
      const timer = setTimeout(() => {
        setMaze(initialMaze);
        setGameMessage('¡El laberinto volvió a su forma original!');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [moveCount]);
  
  // Verificar si el jugador ganó
  useEffect(() => {
    if (playerPosition.x === targetPosition.x && playerPosition.y === targetPosition.y) {
      setGameMessage('¡Felicidades! Descubriste mi hobby.');
      setTimeout(() => {
        navigate('/hobby');
      }, 2000);
    }
  }, [playerPosition, navigate]);
  
  // Mover al jugador
  const movePlayer = (direction) => {
    const newPosition = { ...playerPosition };
    
    switch(direction) {
      case 'up':
        if (playerPosition.x > 0) newPosition.x -= 1;
        break;
      case 'down':
        if (playerPosition.x < rows - 1) newPosition.x += 1;
        break;
      case 'left':
        if (playerPosition.y > 0) newPosition.y -= 1;
        break;
      case 'right':
        if (playerPosition.y < cols - 1) newPosition.y += 1;
        break;
      default:
        break;
    }
    
    // Verificar si el camino está bloqueado
    if (maze[newPosition.x][newPosition.y] === 1) {
      setPlayerPosition(newPosition);
      setMoveCount(prev => prev + 1);
    } else {
      setGameMessage('¡Camino bloqueado! Intenta otra dirección.');
      setTimeout(() => setGameMessage('¡Encuentra el camino hacia mi hobby!'), 1500);
    }
  };
  
  // Manejar teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
          movePlayer('up');
          break;
        case 'ArrowDown':
          movePlayer('down');
          break;
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, maze]);
  
  // Renderizar celda del laberinto
  const renderCell = (row, col) => {
    const isPlayer = playerPosition.x === row && playerPosition.y === col;
    const isTarget = targetPosition.x === row && targetPosition.y === col;
    const isPath = maze[row][col] === 1;
    
      let cellClass = 'w-6 h-6 border border-gray-300 flex items-center justify-center ';
    
    if (isPlayer) {
      cellClass += 'bg-blue-500 animate-bounce ';
    } else if (isTarget) {
      cellClass += 'bg-green-500 ';
    } else if (isPath) {
      cellClass += 'bg-white ';
    } else {
      cellClass += 'bg-gray-800 ';
    }
    
    return (
      <div key={`${row}-${col}`} className={cellClass}>
        {isPlayer ? '😊' : isTarget ? '🎯' : isPath ? ' ' : '⬛'}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white pt-16">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">¡Bienvenido a mi mundo!</h1>
        <p className="text-lg mb-8">¿Puedes encontrar el camino hacia mis otros mundos?</p>
        
        <div className="mb-6 p-4 bg-blue-800 rounded-lg shadow-lg">
          <p className="text-center text-xl">{gameMessage}</p>
          <p className="text-center mt-2">Movimientos: {moveCount}</p>
        </div>
        
        <div className="mb-8 bg-gray-700 p-4 rounded-lg shadow-2xl overflow-auto max-h-200 max-w-8xl mx-auto">
           <div className="inline">
          {maze.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
            </div>
            
          ))}
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-8 w-40">
          <div></div>
          <button 
            onClick={() => movePlayer('up')}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            ↑
          </button>
          <div></div>
          
          <button 
            onClick={() => movePlayer('left')}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            ←
          </button>
          <div className="bg-gray-700 p-2 rounded text-center">😊</div>
          <button 
            onClick={() => movePlayer('right')}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            →
          </button>
          
          <div></div>
          <button 
            onClick={() => movePlayer('down')}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded"
          >
            ↓
          </button>
          <div></div>
        </div>
        
        <button 
          onClick={() => setShowHint(!showHint)}
          className="mb-4 text-blue-300 hover:text-blue-100"
        >
          {showHint ? 'Ocultar pista' : '¿Necesitas una pista?'}
        </button>
        
        {showHint && (
          <div className="bg-yellow-800 p-4 rounded-lg max-w-md text-center">
            <p className="mb-2">💡 El laberinto cambia cada 5 movimientos, pero siempre vuelve a su forma original.</p>
            <p>¡Observa los patrones y planifica tu estrategia!</p>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm text-gray-300">
          <p>Usa las flechas del teclado o los botones para moverte</p>
          <p>Llega a la meta 🎯 para descubrir mi hobby</p>
        </div>
      </div>
    </div>
  );
};

export default Home;