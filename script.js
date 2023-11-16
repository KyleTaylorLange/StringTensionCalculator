import { Utilities } from './dist/src/static/Utilities.js'
import { Main } from './dist/src/Main.js'

let jsonResult = Utilities.getJson('DAddario')

/**
 * On load, feed promise data from jsonResult into Main() to be used throughout the program.
 */
window.onload = function() {
	jsonResult
		.then((res) => {
			new Main(res).run()
		})
}