import { Card, Group, Image, Text, Badge, Button, Avatar, Center } from "@mantine/core";
import Game, { GameState } from "~/models/game";
import {
    IconEye,
    IconPlayerPlay,
    IconPencil
} from '@tabler/icons';
import { useNavigate } from "@remix-run/react";
import racketIcon from '../assets/racket.png';
import { TeamType } from "~/models/teamrepresentation";



interface GameDisplayProps {
    game: Game,
    openModalEdit: (value: Game)=>void
}

export default function GameDisplay({ openModalEdit,game }: GameDisplayProps) {
    const navigate = useNavigate();

    const isCreator: boolean = true;

    const navigateTo = () => {
        navigate("/livegames/" + game.id)
    }
    const startGame = () => {
        console.log("Game Started!")
    }

    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
            <Card.Section styles={{ diplay: "flex" }}>
                <Center>
                    <Avatar radius="xl" variant="outline" color={getAvatarColor(game)} m={2} size="lg">{getAvatarText(game)}</Avatar>
                </Center>
            </Card.Section>


            <Group position="apart" mt="md" mb="xs">
                <Text ta="center" weight={350}>- {game.opponentTeam.teamName}</Text>
                <Badge color={getStateColor(game.state)} variant="light">
                    {getStateText(game.state)}
                </Badge>
            </Group>

            <Text size="lg" color="dimmed" ta="center">
                {game.result ?? "0:0"}
            </Text>
            {isCreator ?
                <Group position="apart">
                    <Button onClick={()=> openModalEdit(game)}  variant="subtle" color="orange" radius="md" leftIcon={<IconPencil size={20} />}>
                        Bearbeiten 
                    </Button>
                    <Button onClick={startGame} variant="subtle" color="green" radius="md" rightIcon={<IconPlayerPlay size={20} />}>
                        Starten
                    </Button>
                </Group>
                :

                <Button onClick={navigateTo} variant="light" color="blue" fullWidth mt="md" radius="md" leftIcon={<IconEye size={20} />}>
                    Ansehen
                </Button>
            }
        </Card>
    );
}


function getStateText(state: GameState) {
    switch (state) {
        case GameState.pending: return "In Vorbereitung";
        case GameState.finished: return "Beendet";
        case GameState.live: return "Live";
    }
}
function getStateColor(state: GameState) {
    switch (state) {
        case GameState.pending: return "cyan";
        case GameState.finished: return "pink";
        case GameState.live: return "gray";
    }
}
function getAvatarText(game: Game) {
    switch (game.type) {
        case TeamType.Damen: return "D" + game.homeTeam.teamNumber;
        case TeamType.Herren: return "H" + game.homeTeam.teamNumber;
        case TeamType.Jugend: return "J" + game.homeTeam.teamNumber;
    }
}

function getAvatarColor(game: Game) {
    switch (game.type) {
        case TeamType.Damen: return "pink";
        case TeamType.Herren: return "blue";
        case TeamType.Jugend: return "teal";
    }
}