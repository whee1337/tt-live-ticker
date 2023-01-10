import { Box, TextInput, Group, Button, Select, NumberInput, Grid, SelectItem, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import Game from "~/models/game";
import { TeamType } from "~/models/teamrepresentation";
import {
    IconAlertCircle
  } from '@tabler/icons';
import { Form, useActionData, useNavigate, useTransition } from "@remix-run/react";
import { useEffect } from "react";

interface GameFormProps {
    setGame: (game: Game) => void,
    game: Game | undefined,
    setOpen: (value: boolean) => void
}

const data: SelectItem[] = [
    { value: TeamType.Damen.toString(), label: 'Damen' },
    { value: TeamType.Herren.toString(), label: 'Herren' },
    { value: TeamType.Jugend.toString(), label: 'Jugend' },
];

export default function GameForm({ setGame, game,setOpen }: GameFormProps) {
    const actionData = useActionData();
    const transition = useTransition();

    useEffect(()=>
    {
        if(transition.state ==="loading" &&  actionData?.isValid)
            setOpen(false);

    }, [actionData, transition])


    const form = useForm({
        initialValues:( game ? {
            nameO: game.opponentTeam.teamName,
            teamType: game.type.toString(),
            id: game.id,
            numberH: game.homeTeam.teamNumber,
            player1H: game.homeTeam.aufstellung.player1,
            player2H: game.homeTeam.aufstellung.player2,
            player3H: game.homeTeam.aufstellung.player3,
            player4H: game.homeTeam.aufstellung.player4,
            player5H: game.homeTeam.aufstellung.player5,
            player6H: game.homeTeam.aufstellung.player6,
            player1O: game.opponentTeam.aufstellung.player1,
            player2O: game.opponentTeam.aufstellung.player2,
            player3O: game.opponentTeam.aufstellung.player3,
            player4O: game.opponentTeam.aufstellung.player4,
            player5O: game.opponentTeam.aufstellung.player5,
            player6O: game.opponentTeam.aufstellung.player6,
        } :
            {
                nameO: '',
                teamType: TeamType.Herren.toString(),
                numberH: 1,
                player1H: '',
                player2H: '',
                player3H: '',
                player4H: '',
                player5H: '',
                player6H: '',
                player1O: '',
                player2O: '',
                player3O: '',
                player4O: '',
                player5O: '',
                player6O: '',
            }),
    }
    );

    const renderAuftellung = (heim: boolean) => {
        const rows = [];
        const postix: string = heim ? "H" : "O"
        for (let i = 1; i < 7; i++) {
            rows.push(
                <TextInput
                    withAsterisk
                    placeholder={i.toString()}
                    key={i + postix}
                    error={true}
                    name={"player" + i.toString() + postix}
                    {...form.getInputProps("player" + i.toString() + postix)}
                />
            )
        }
        return rows;
    }
    return (
        <Box mx="auto">
            <Form method="post">
                <TextInput
                    style={{ display: "none" }}
                    name="id"
                    {...form.getInputProps('id')}
                />
                <Grid>
                    <Grid.Col span={6} >
                        <Select label="Type"
                            name="type" placeholder="Damen,Herren oder Jugend"
                            data={data}
                            {...form.getInputProps('teamType')}
                        />
                        <NumberInput
                            defaultValue={1}
                            max={15}
                            min={1}
                            placeholder="*te Mannschaft"
                            label=""
                            radius="xs"
                            name="numberH"
                            withAsterisk
                            {...form.getInputProps('numberH')}
                        />
                        <h4>Aufstellung</h4>
                        {renderAuftellung(true)}
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <TextInput
                            withAsterisk
                            label="Gegner"
                            name="nameO"
                            id="nameO"
                            placeholder="TV Musterverein"
                            {...form.getInputProps('nameO')}
                        />
                        <NumberInput
                            defaultValue={1}
                            max={15}
                            min={1}
                            placeholder="*te Mannschaft"
                            label=""
                            radius="xs"
                            withAsterisk
                            name="numberO"
                            {...form.getInputProps('numberO')}
                        />
                        <h4>Aufstellung</h4>
                        {renderAuftellung(false)}

                    </Grid.Col>
                </Grid>
                { actionData&& !actionData.isValid && <Alert mt={8} icon={<IconAlertCircle size={16} />} title="Fehlerhafte Eingabe" color="orange">
                {actionData.messages.map((value:string) => <p key={Math.random()}>{value}</p>)}
            </Alert>}
                <Group position="right" mt="md">
                    <Button disabled={!form.isValid()} type="submit">Submit</Button>
                </Group>
            </Form>

        </Box>
    )
}