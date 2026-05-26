import { createDom, type DomActions, type DomState } from "./dom"
import { createLogic, type LogicActions } from "./logic"



export type FunkyBoardState = {
    dom_state: DomState
}

export type FunkyBoardActions = {
    dom_actions: DomActions
    logic_actions: LogicActions
}

export type FunkyBoardStore = [FunkyBoardState, FunkyBoardActions]

export function createFunkyBoard(): FunkyBoardStore {

    let [logic_state, logic_actions] = createLogic()
    let [dom_state, dom_actions] = createDom(logic_state)

    let state = {
        logic_state,
        dom_state
    }

    let actions = {
        logic_actions,
        dom_actions
    }

    return [state, actions]
}


