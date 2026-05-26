import type { Color } from "./types"

export type LogicState = {
    orientation: Color
}

export type LogicActions = {
    set_orientation(_: Color): Color
    flip_board(): void
    on_orientation_changed(cb: Listener<Color>): void
}

export type LogicStore = [LogicState, LogicActions]

export type Listener<T> = (prev: T, next: T) => void

export function createLogic(): LogicStore {


    let orientation_listeners: Listener<Color>[] = []
    let orientation: Color = 'white'

    let state = {
        get orientation() {
            return orientation
        }
    }

    const set_orientation = (value: Color) => {
        let prev = orientation
        orientation = value
        queueMicrotask(() => {
            orientation_listeners.forEach(_ => _(prev, orientation))
        })
        return orientation
    }
    let actions = {
        set_orientation,
        flip_board() {
            return set_orientation(orientation === 'white' ? 'black' : 'white')
        },
        on_orientation_changed(cb: Listener<Color>) {
            orientation_listeners.push(cb)
        }
    }

    return [state, actions]
}
