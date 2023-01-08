import fs from 'fs/promises';

export async function getStoredGames() {
  const rawFileContent = await fs.readFile('games.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedNotes = data.games ?? [];
  return storedNotes;
}

export function storeGames(games) {
  return fs.writeFile('games.json', JSON.stringify({ games: games || [] }));
}


export async function getStoredGameById(id) {
    const games = await getStoredGames();

    return games;  
}