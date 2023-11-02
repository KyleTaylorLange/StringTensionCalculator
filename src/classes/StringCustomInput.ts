import { Utilities } from '../static/Utilities.js'

export { StringCustomInput }

class StringCustomInput {
	private _customStringUI: HTMLElement = Utilities.createElement('div', 'overlay')

	constructor() {
		const card = Utilities.createElement('div', 'card')
		const content = Utilities.createElement('div', 'content')
		const inputTable = Utilities.createElement('table', 'input-table')
		const stringBrandLabel = Utilities.createElement('label', 'string-brand-label', 'String Brand')
		const stringTypeLabel = Utilities.createElement('label', 'string-type-label', 'String Type')
		const stringBrand = Utilities.createElement('input', 'string-brand')
		const stringType = Utilities.createElement('input', 'string-type')

		let count = 0
		let stringLabels = []
		let stringInputs = []

		while (count < 8) {
			stringLabels.push(Utilities.createElement('label', 'string-label', `String`))
			stringInputs.push(Utilities.createElement('input', 'string'))
			++count
		}

		card.appendChild(content)
		content.appendChild(inputTable)
		inputTable.appendChild(stringBrandLabel)
		inputTable.appendChild(stringBrand)
		inputTable.appendChild(stringTypeLabel)
		inputTable.appendChild(stringType)

		for (let i = 0; i < 8; ++i) {
			inputTable.appendChild(stringLabels[i])
			inputTable.appendChild(stringInputs[i])
		}

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