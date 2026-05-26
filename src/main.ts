import { createFunkyBoard } from '.'
import './style.css'
import './funky-core.css'
import './assets/chessground/funky-theme.css'
import { core_listeners, key_listeners, mouse_listeners } from './listeners'

function app(el: HTMLElement) {

  let [fb_state, set_fb] = createFunkyBoard()

  let $content = document.createElement('div')
  $content.classList.add('content')

  $content.appendChild(fb_state.dom_state.$el)

  el.appendChild($content)


  core_listeners(fb_state, set_fb)
  mouse_listeners(fb_state, set_fb)
  key_listeners(fb_state, set_fb)
}

app(document.getElementById('app')!)