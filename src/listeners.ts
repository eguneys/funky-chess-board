import type { FunkyBoardActions, FunkyBoardState } from "./"


export function key_listeners(_fb_state: FunkyBoardState, set_fb: FunkyBoardActions) {

    const on_key_down = (e: KeyboardEvent) => {
        if (e.key === 'f') {
            set_fb.logic_actions.flip_board()
        }
    }

    document.addEventListener('keydown', on_key_down)

    return () => {
        document.removeEventListener('keydown', on_key_down)
    }
}


export function mouse_listeners(fb_state: FunkyBoardState, set_fb: FunkyBoardActions) {

    const client_to_normalized = (clientX: number, clientY: number) => {

        let bounds = fb_state.dom_state.bounds


        let normalized_x = (clientX - bounds.left) / bounds.width
        let normalized_y = (clientY - bounds.top) / bounds.height

        return [normalized_x, normalized_y]
    }

    const on_pointer_down = (e: PointerEvent) => {
        let res = client_to_normalized(e.clientX, e.clientY)
        console.log(res)
    }

    const on_pointer_move = (e: PointerEvent) => {
        let res = client_to_normalized(e.clientX, e.clientY)
        set_fb.dom_actions.set_hover(res[0], res[1])
    }

    fb_state.dom_state.$el.addEventListener('pointerdown', on_pointer_down)
    fb_state.dom_state.$el.addEventListener('pointermove', on_pointer_move)

    return () => {
        fb_state.dom_state.$el.removeEventListener('pointerdown', on_pointer_down)
        fb_state.dom_state.$el.removeEventListener('pointermove', on_pointer_move)
    }
}


export function core_listeners(fb_state: FunkyBoardState, set_fb: FunkyBoardActions) {
    let resize = new ResizeObserver(() => {
        set_fb.dom_actions.invalidate_bounds()
    })
    resize.observe(fb_state.dom_state.$el)

    return () => {
        resize.disconnect()
    }
}