import React, { useState, useEffect } from 'react';
import './LiveStatus.scss';
import { proximasPartidas } from '../../services/mockData';

// Interface para os dados de jogo em tempo real
interface LiveGameData {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  status: 'not_started' | 'live' | 'finished';
  currentMap?: string;
  currentRound?: number;
  timeRemaining?: string;
  homeTeamLogo: string;
  awayTeamLogo: string;
  competition: string;
  gameType: 'CS:GO' | 'VALORANT' | 'League of Legends';
}

const LiveStatus: React.FC = () => {
  const [liveGames, setLiveGames] = useState<LiveGameData[]>([]);
  const [selectedGame, setSelectedGame] = useState<LiveGameData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simular a busca de dados de jogos em tempo real
  useEffect(() => {
    const fetchLiveGames = async () => {
      setIsLoading(true);
      
      try {
        // Em um cenário real, aqui seria feita uma chamada para uma API externa
        // que forneceria dados de jogos em tempo real
        
        // Simulando um atraso de rede
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Criando dados simulados com base nos dados mockados de próximas partidas
        const simulatedLiveGames: LiveGameData[] = proximasPartidas
          .slice(0, 2) // Pegar apenas as duas primeiras partidas para simular
          .map(partida => ({
            id: partida.id,
            homeTeam: 'FURIA',
            awayTeam: partida.adversario,
            homeScore: Math.floor(Math.random() * 10),
            awayScore: Math.floor(Math.random() * 10),
            status: 'live',
            currentMap: partida.modalidade === 'CS:GO' ? 'Inferno' : 'Haven',
            currentRound: Math.floor(Math.random() * 30),
            timeRemaining: `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
            homeTeamLogo: '/furia-icon.png',
            awayTeamLogo: partida.logoAdversario,
            competition: partida.competicao,
            gameType: partida.modalidade as 'CS:GO' | 'VALORANT' | 'League of Legends'
          }));
        
        setLiveGames(simulatedLiveGames);
        
        // Selecionar o primeiro jogo por padrão
        if (simulatedLiveGames.length > 0) {
          setSelectedGame(simulatedLiveGames[0]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados de jogos em tempo real:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLiveGames();
    
    // Atualizar os dados a cada 30 segundos para simular atualizações em tempo real
    const intervalId = setInterval(() => {
      if (liveGames.length > 0) {
        // Atualizar os dados dos jogos existentes
        setLiveGames(prevGames => 
          prevGames.map(game => ({
            ...game,
            homeScore: Math.random() > 0.7 ? game.homeScore + 1 : game.homeScore,
            awayScore: Math.random() > 0.7 ? game.awayScore + 1 : game.awayScore,
            currentRound: game.currentRound ? 
              (game.currentRound < 30 ? game.currentRound + 1 : 1) : 
              undefined,
            timeRemaining: `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
          }))
        );
        
        // Atualizar o jogo selecionado se houver um
        if (selectedGame) {
          setSelectedGame(prevSelected => {
            if (!prevSelected) return null;
            
            const updatedGame = liveGames.find(game => game.id === prevSelected.id);
            return updatedGame || prevSelected;
          });
        }
      }
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGameSelect = (game: LiveGameData) => {
    setSelectedGame(game);
  };

  if (isLoading) {
    return (
      <div className="live-status-container loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando dados dos jogos...</p>
        </div>
      </div>
    );
  }

  if (liveGames.length === 0) {
    return (
      <div className="live-status-container no-games">
        <div className="no-games-message">
          <i className="bi bi-calendar-x"></i>
          <h3>Nenhum jogo ao vivo no momento</h3>
          <p>Confira a agenda para os próximos jogos da FURIA.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="live-status-container">
      <div className="live-status-header">
        <h2>
          <span className="live-indicator"></span>
          Jogos ao Vivo
        </h2>
        <div className="game-selector">
          {liveGames.map(game => (
            <button
              key={game.id}
              className={`game-selector-button ${selectedGame?.id === game.id ? 'active' : ''}`}
              onClick={() => handleGameSelect(game)}
            >
              <img src={game.homeTeamLogo} alt={game.homeTeam} className="team-logo" />
              <span>vs</span>
              <img src={game.awayTeamLogo} alt={game.awayTeam} className="team-logo" />
            </button>
          ))}
        </div>
      </div>

      {selectedGame && (
        <div className="live-game-details">
          <div className="game-info">
            <div className="competition-info">
              <span className="competition-name">{selectedGame.competition}</span>
              <span className="game-type">{selectedGame.gameType}</span>
            </div>
            
            <div className="teams-score">
              <div className="team home-team">
                <img src={selectedGame.homeTeamLogo} alt={selectedGame.homeTeam} className="team-logo" />
                <span className="team-name">{selectedGame.homeTeam}</span>
              </div>
              
              <div className="score-display">
                <span className="score home-score">{selectedGame.homeScore}</span>
                <span className="score-separator">:</span>
                <span className="score away-score">{selectedGame.awayScore}</span>
              </div>
              
              <div className="team away-team">
                <img src={selectedGame.awayTeamLogo} alt={selectedGame.awayTeam} className="team-logo" />
                <span className="team-name">{selectedGame.awayTeam}</span>
              </div>
            </div>
            
            <div className="game-status">
              {selectedGame.status === 'live' && (
                <>
                  <div className="status-indicator live">
                    <span className="dot"></span>
                    AO VIVO
                  </div>
                  <div className="game-details">
                    <span className="map">Mapa: {selectedGame.currentMap}</span>
                    <span className="round">Round: {selectedGame.currentRound}</span>
                    <span className="time">Tempo: {selectedGame.timeRemaining}</span>
                  </div>
                </>
              )}
              
              {selectedGame.status === 'finished' && (
                <div className="status-indicator finished">
                  FINALIZADO
                </div>
              )}
              
              {selectedGame.status === 'not_started' && (
                <div className="status-indicator not-started">
                  EM BREVE
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStatus;
