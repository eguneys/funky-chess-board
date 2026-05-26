import type { LogicActions, LogicState } from "./logic"
import { Files, normalized_in_square, Ranks, type Color } from "./types"

export type CoordState = {
    $files: HTMLDivElement
    $ranks: HTMLDivElement
}

export type CoordActions = {
}

export type CoordStore = [CoordState, CoordActions]
export function createCoords(logic_state: LogicState, logic_actions: LogicActions): CoordStore {

    let $files = document.createElement('div')
    let $ranks = document.createElement('div')
    $files.classList.add('files')
    $ranks.classList.add('ranks')


    for (let file of Files) {
        let $file = document.createElement('div')
        $file.classList.add('file')
        $file.classList.add(`file_${file}`)
        $file.textContent = file
        $files.appendChild($file)
    }

    for (let rank of Ranks) {
        let $rank = document.createElement('div')
        $rank.classList.add('rank')
        $rank.classList.add(`rank-${rank}`)
        $rank.textContent = rank
        $ranks.appendChild($rank)
    }

    const set_hover = (x: number, y: number) => {
        let orientation = logic_state.orientation

        console.log(normalized_in_square(x, y, orientation))
    }



    let state = {
        $files,
        $ranks
    }

    let actions = {
        set_hover
    }

    return [state, actions]
}

