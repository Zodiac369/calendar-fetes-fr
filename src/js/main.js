// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { manageCalendar } from "./calendar-func.js";
import { attachMenuEvents } from "./display-func.js";

window.addEventListener(
    'DOMContentLoaded',
function (event) {
    manageCalendar();
    attachMenuEvents();
});
