import { createArrows, type ArrowsActions } from "./arrows"
import { createCoords } from "./coords"
import type { LogicState } from "./logic"
import { type Color } from "./types"

export type DomState = {
    $el: HTMLDivElement
    bounds: DOMRect
}

export type DomActions = {
    set_orientation(prev: Color, orientation: Color): void
    setArrows: ArrowsActions
    invalidate_bounds(): void
    set_hover(x: number, y: number): void
}

export type DomStore = [DomState, DomActions]


export function createDom(logic_state: LogicState): DomStore {
    let $el = document.createElement('div')
    $el.classList.add('funky-board')

    $el.classList.add(`orientation-${logic_state.orientation}`)


    let [pieces, setPieces] = createPieces()
    $el.appendChild(pieces.$pieces)

    let [arrows, setArrows] = createArrows()
    $el.appendChild(arrows.$arrows)

    let [coords, setCoords] = createCoords(logic_state)
    $el.appendChild(coords.$files)
    $el.appendChild(coords.$ranks)


    let set_orientation = (prev: Color, orientation: Color) => {
        $el.classList.remove(`orientation-${prev}`)

        $el.classList.add(`orientation-${orientation}`)

        setPieces.set_orientation(prev, orientation)
        setCoords.set_orientation(prev, orientation)
        setArrows.set_orientation(prev, orientation)
    }


    let set_hover = (x: number, y: number) => {
        setCoords.set_hover(x, y)
    }

    let bounds: DOMRect | undefined = undefined
    const invalidate_bounds = () => bounds = undefined

    let state = {
        get bounds() {
            if (!bounds) {
                bounds = $el.getBoundingClientRect()
            }

            return bounds
        },
        get $el() {
            return $el
        }
    }

    let actions = {
        invalidate_bounds,
        set_orientation,
        setArrows,
        set_hover
    }

    return [state, actions]
}

type PiecesState = {
    $pieces: HTMLDivElement
}

type PiecesActions = {
    set_orientation: (prev: Color, orientation: Color) => void
}

type PiecesStore = [PiecesState, PiecesActions]
function createPieces(): PiecesStore {

    let $pieces = document.createElement('div')
    $pieces.classList.add('pieces')

    const set_orientation = () => {}

    let state = {
        $pieces
    }

    let actions = {
        set_orientation
    }

    return [state, actions]
}