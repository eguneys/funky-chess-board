import type { Color, Square } from "./types"

export type ArrowsState = {
    $arrows: SVGSVGElement
}

export type ArrowsActions = {
    set_orientation(prev: Color, orientation: Color): void
    add_circle(square: Square): void
}

type ArrowsStore = [ArrowsState, ArrowsActions]
export function createArrows(): ArrowsStore {

    const SvgNS = 'http://www.w3.org/2000/svg'
    let $arrows = document.createElementNS(SvgNS, 'svg')
    $arrows.setAttribute('viewBox', '0 0 800 800')
    $arrows.classList.add('pieces')

    const set_orientation = () => {}

    const add_circle = (_square: Square) => {

        let cx = 100
        let cy = 100

        let $circle = document.createElementNS(SvgNS, 'circle')
        $circle.setAttribute('cx', `${cx}`)
        $circle.setAttribute('cy', `${cy}`)
        $arrows.appendChild($circle)
    }

    let state = {
        $arrows
    }

    let actions = {
        set_orientation,
        add_circle
    }

    return [state, actions]
}