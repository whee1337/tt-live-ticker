import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";



export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.livegameid, "Expected params.livegameid");

    return params.livegameid; 
  };

export default function LiveGame()
{
    const gameid = useLoaderData<typeof loader>();

    return <h2>LIVE GAME!!! - {gameid}</h2>
}