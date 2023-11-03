import { Utilities } from '../static/Utilities.js'

export { StringCustomInput }

class StringCustomInput {
	private _customStringUI: HTMLElement = Utilities.createElement('div', 'overlay')

	constructor() {
		const card = Utilities.createElement('div', 'card')
		const content = Utilities.createElement('div', 'content')
		const openingMessage = Utilities.createElement('div', 'opening-message', 'You can add your own custom strings here. Please provide values for up to eight strings. Any rows that have no data will not be used.')
		const stringBrandLabel = Utilities.createElement('label', 'string-brand-label', 'String Brand')
		const stringTypeLabel = Utilities.createElement('label', 'string-type-label', 'String Type')
		const stringBrand = Utilities.createElement('input', 'string-brand')
		const stringType = Utilities.createElement('input', 'string-type')
		const rowTop = Utilities.createElement('div', 'row-top')
		const submit = Utilities.createElement('button', 'submit', 'Submit')

		// TODO: Allow user to define the count
		let count = 8;
		let stringLabels = []
		let stringGauges = []
		let stringWeights = []

			
		for (let i = 0; i < count; ++i) {
			stringLabels.push(Utilities.createElement('label', 'string-label', `String`))
			stringGauges.push(Utilities.createElement('input', 'string-gauge'))
			stringWeights.push(Utilities.createElement('input', 'string-weight'))
		}

		card.appendChild(content)
		content.appendChild(openingMessage)
		content.appendChild(rowTop)
		rowTop.appendChild(stringBrandLabel)
		rowTop.appendChild(stringBrand)
		rowTop.appendChild(stringTypeLabel)
		rowTop.appendChild(stringType)

		for (let i = 0; i < count + 1; ++i) {

			if (i === 0) {
				const row = Utilities.createElement('div', 'row-string-top')
				content.appendChild(row)
				row.appendChild(Utilities.createElement('div', 'gauge', 'Gauge'))
				row.appendChild(Utilities.createElement('div', 'weight', 'Weight'))
				
				continue;
			}

			const row = Utilities.createElement('div', 'row')
			content.appendChild(row)
			row.appendChild(stringGauges[i - 1])
			row.appendChild(stringWeights[i - 1])
		}

		card.appendChild(submit)
		this.customStringUI.appendChild(card)
	}

	public get customStringUI(): any {
		return this._customStringUI
	}

	public set customStringUI(value: any) {
		this._customStringUI = value
	}
	
	/**
	 * Renders the custom string user interface.
	 */
	public render() {
		const mainContainer = document.getElementsByClassName("main-container")[0]
        mainContainer.appendChild(this.customStringUI)
	}
}