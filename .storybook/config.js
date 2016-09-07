import { configure } from '@kadira/storybook'

import 'normalize.css'
import './storybook.scss'

function loadStories() {
  require('../stories/Menu.story')
}

configure(loadStories, module)
