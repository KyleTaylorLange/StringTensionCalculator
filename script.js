import { Utilities } from './dist/src/static/Utilities.js'
import { Main } from './dist/src/Main.js'

//let jsonResult = Utilities.getJson('DAddario')

/**
 * On load, feed promise data from jsonResult into Main() to be used throughout the program.
 */
window.onload = function() {
	// TODO: Temp fix for gauges not displaying on live website.
	let jsonData = [
		{
			"brand": "D'Addario",
			"type": "Plain Steel",
			"strings": [
				{"gauge": 0.007, "unitWeight": 0.00001085},
				{"gauge": 0.008, "unitWeight": 0.00001418},
				{"gauge": 0.0085, "unitWeight": 0.00001601},
				{"gauge": 0.009, "unitWeight": 0.00001794},
				{"gauge": 0.0095, "unitWeight": 0.00001999},
				{"gauge": 0.01, "unitWeight": 0.00002215},
				{"gauge": 0.0105, "unitWeight": 0.00002442},
				{"gauge": 0.011, "unitWeight": 0.0000268},
				{"gauge": 0.0115, "unitWeight": 0.0000293},
				{"gauge": 0.012, "unitWeight": 0.0000319},
				{"gauge": 0.013, "unitWeight": 0.00003744},
				{"gauge": 0.0135, "unitWeight": 0.00004037},
				{"gauge": 0.014, "unitWeight": 0.00004342},
				{"gauge": 0.015, "unitWeight": 0.00004984},
				{"gauge": 0.016, "unitWeight": 0.00005671},
				{"gauge": 0.017, "unitWeight": 0.00006402},
				{"gauge": 0.018, "unitWeight": 0.00007177},
				{"gauge": 0.019, "unitWeight": 0.00007997},
				{"gauge": 0.02, "unitWeight": 0.00008861},
				{"gauge": 0.022, "unitWeight": 0.00010722},
				{"gauge": 0.024, "unitWeight": 0.0001276},
				{"gauge": 0.026, "unitWeight": 0.00014975}
			]
		},
		{
			"brand": "D'Addario",
			"type": "XL Nickel Wound",
			"strings": [
				{"gauge": 0.017, "unitWeight": 0.00005524},
				{"gauge": 0.018, "unitWeight": 0.00006215},
				{"gauge": 0.019, "unitWeight": 0.00006947},
				{"gauge": 0.02, "unitWeight": 0.00007495},
				{"gauge": 0.021, "unitWeight": 0.00008293},
				{"gauge": 0.022, "unitWeight": 0.00009184},
				{"gauge": 0.024, "unitWeight": 0.00010857},
				{"gauge": 0.026, "unitWeight": 0.00012671},
				{"gauge": 0.028, "unitWeight": 0.00014666},
				{"gauge": 0.03, "unitWeight": 0.00017236},
				{"gauge": 0.032, "unitWeight": 0.00019347},
				{"gauge": 0.034, "unitWeight": 0.0002159},
				{"gauge": 0.036, "unitWeight": 0.00023964},
				{"gauge": 0.038, "unitWeight": 0.00026471},
				{"gauge": 0.039, "unitWeight": 0.00027932},
				{"gauge": 0.042, "unitWeight": 0.00032279},
				{"gauge": 0.044, "unitWeight": 0.00035182},
				{"gauge": 0.046, "unitWeight": 0.00038216},
				{"gauge": 0.048, "unitWeight": 0.00041382},
				{"gauge": 0.049, "unitWeight": 0.00043014},
				{"gauge": 0.052, "unitWeight": 0.00048109},
				{"gauge": 0.054, "unitWeight": 0.00053838},
				{"gauge": 0.056, "unitWeight": 0.00057598},
				{"gauge": 0.059, "unitWeight": 0.00064191},
				{"gauge": 0.06, "unitWeight": 0.00066542},
				{"gauge": 0.062, "unitWeight": 0.00070697},
				{"gauge": 0.064, "unitWeight": 0.00074984},
				{"gauge": 0.066, "unitWeight": 0.00079889},
				{"gauge": 0.068, "unitWeight": 0.00084614},
				{"gauge": 0.07, "unitWeight": 0.00089304},
				{"gauge": 0.072, "unitWeight": 0.00094124},
				{"gauge": 0.074, "unitWeight": 0.00098869},
				{"gauge": 0.08, "unitWeight": 0.00115011}
			]
		}
	]
	
	new Main(jsonData).runTime()
	/**
	jsonResult
		.then((res) => {
			new Main(res).runTime()
		})
	*/
}
