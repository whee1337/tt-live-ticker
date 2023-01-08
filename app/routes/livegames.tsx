import { Button, Grid, Modal, Stack } from "@mantine/core";
import { redirect } from "@remix-run/node";
import { useState } from "react";
import GameForm from "~/forms/gameForm";
import Game, { GameState } from "~/models/game";
import {getStoredGames, storeGames} from '~/data/games'
import { useLoaderData } from "@remix-run/react";
import GameDisplay from "~/components/gameDisplay";

export default function LiveGames() {

    const games = useLoaderData<typeof loader>();

    const [open, setOpen] = useState<boolean>(false);
    const [game, setGame] = useState<Game | undefined>(undefined);

    const openToEdit = (game: Game)=> {
        setGame(game);
        setOpen(true);
    }

    const openToCreate= ()=> {
      setGame(undefined);
      setOpen(true);
  }
    return <>
    <Stack>
        <Button onClick={()=>openToCreate()}>Neues Live-Spiel erstellen</Button>
        <h2>Live Spiele</h2>
    </Stack>
    <Grid grow>
        {games.map((game: Game) => {return <Grid.Col key={game.id.toString()} span={3} style={{ maxWidth: 400 }}> <GameDisplay openModalEdit={openToEdit} game={game}/></Grid.Col>})}
    </Grid>
      <Modal
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
        title="Neues Live-Spiel"
      >
        <GameForm game={game} setGame={setGame}></GameForm>
      </Modal>
    </>
}


export async function action({request}) {

  const getRandom = (min:number, max:number) => {
      const floatRandom = Math.random()
    
      const difference = max - min
    
      // random between 0 and the difference
      const random = Math.round(difference * floatRandom)
    
      const randomWithinRange = random + min
    
      return randomWithinRange
  }

  const formData = await request.formData();

  const game: Game = 
    {
      id: !formData.get("id") ? getRandom(0,100) : +formData.get("id") ,
      state: GameState.pending,
      homeTeam: {
        teamName: formData.get("numberH") + ". " + formData.get("type"),
        teamNumber: formData.get("numberH"),
        aufstellung: 
        {
          player1: formData.get("player1H"),
          player2: formData.get("player2H"),
          player3: formData.get("player3H"),
          player4: formData.get("player4H"), 
          player5: formData.get("player5H"),
          player6: formData.get("player6H")
        }
      },
      opponentTeam: {
        teamName: formData.get("nameO"),
        aufstellung: {
          player1: formData.get("player1O"),
          player2: formData.get("player2O"),
          player3: formData.get("player3O"),
          player4: formData.get("player4O"), 
          player5: formData.get("player5O"),
          player6: formData.get("player6O")
        }
      },
      type: formData.get("type"),
    }
    
    const games: Game[] = await getStoredGames();
    
    if(games)
    { 
      const gamesToStore = games.filter((g => g.id !== game.id));
      gamesToStore.push(game);
      storeGames(gamesToStore)
    }
    else{
      storeGames(game)
    }

  return redirect("/livegames");
}

export async function loader(){
  const games =  await getStoredGames();
  return games;
}