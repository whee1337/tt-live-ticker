import { Alert, Badge, Box, Container, MultiSelect, SelectItemProps } from "@mantine/core";
import Game from "~/models/game";
import { IconAlertCircle } from "@tabler/icons"
import { forwardRef, useState } from "react";

interface StartFormProps {
    game: Game | undefined
}


const Item = forwardRef<HTMLDivElement, SelectItemProps>(({ label, value, ...others }, ref) => {
    return (
        <div ref={ref} {...others}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Badge variant="outline" sx={{ marginRight: 5 }}>
                    {value}
                </Badge>
                <div>{label}</div>
            </Box>
        </div>
    );
});

export default function StartForm({ game }: StartFormProps) {

    const [pickedHomePlayers, setPickedHomePlayers] = useState(new Set<string>());
    console.log("Picked home players: ")

    const updatePlayerPool = (values: string[]) => {
        setPickedHomePlayers((oldSet) => {
            values.forEach((value) => {
                oldSet.add(value)
            })
            return new Set<string>(oldSet);
        })
    }

    if (!game) {
        return <Alert icon={<IconAlertCircle size={16} />} title="Fehler!" color="red">
            Es ist ein Fehler aufgetreten
        </Alert>
    }


    return (<Container>
        <MultiSelect
            data={Object.entries(game.homeTeam.aufstellung).filter((value: [k: string, v: any]) => {
                if (value[0] || !pickedHomePlayers.has(value[0]))
                    return value;
            }).map((value: [k: string, v: any]) => {
                return {
                    label: value[1],
                    value: value[0].replace("player", "")
                }
            })}
            onChange={updatePlayerPool}
            valueComponent={Item}
            label="Doppel 1"
            placeholder="Spieler auswählen"
        />
        <MultiSelect
            data={Object.entries(game.homeTeam.aufstellung).filter((value: [k: string, v: any]) => {
                console.log("filtered data")
                if (value[0] && !pickedHomePlayers.has(value[0]))
                    return value;
            }).map((value: [k: string, v: any]) => {
                return {
                    label: value[1],
                    value: value[0].replace("player", "")
                }
            })}
            onChange={updatePlayerPool}
            valueComponent={Item}
            label="Doppel 1"
            placeholder="Spieler auswählen"
        />
    </Container>)
}