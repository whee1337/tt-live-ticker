import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";

export default function LiveGames() {

    const [open, setOpen] = useState<boolean>(false);

    return <>
    <Stack>
        <Button onClick={()=>setOpen(!open)}>Neues Live-Spiel erstellen</Button>
        <h2>Live games</h2>
        </Stack>
        <Modal
        opened={open}
        onClose={() => setOpen(false)}
        fullScreen
        title="Neues Live-Spiel"
      >
        {/* Modal content */}
      </Modal>
    </>
}
