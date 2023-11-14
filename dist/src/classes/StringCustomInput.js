import { Utilities } from '../static/Utilities.js';
export { StringCustomInput };
class StringCustomInput {
    constructor() {
        this._customStringUI = Utilities.createElement('div', 'overlay show');
        const card = Utilities.createElement('div', 'card');
        const content = Utilities.createElement('div', 'content');
        const openingMessage = Utilities.createElement('div', 'opening-message', 'Please provide values for up to eight strings. You must enter a brand name, a type name, and at least one full row of string data. Incomplete rows will not be used.');
        const stringBrandLabel = Utilities.createElement('label', 'string-brand-label', 'String Brand');
        const stringTypeLabel = Utilities.createElement('label', 'string-type-label', 'String Type');
        const stringBrand = Utilities.createElement('input', 'custom-string-brand');
        const stringType = Utilities.createElement('input', 'custom-string-type');
        const rowTop = Utilities.createElement('div', 'row-top');
        const submit = Utilities.createElement('button', 'submit', 'Submit');
        const exit = Utilities.createElement('div', 'exit', 'X');
        // TODO: Allow user to define the count
        let count = 8;
        let stringLabels = [];
        let stringGauges = [];
        let stringWeights = [];
        for (let i = 0; i < count; ++i) {
            stringLabels.push(Utilities.createElement('label', 'string-label', `String`));
            stringGauges.push(Utilities.createElement('input', 'custom-string-gauge'));
            stringWeights.push(Utilities.createElement('input', 'custom-string-weight'));
        }
        card.appendChild(content);
        content.appendChild(openingMessage);
        content.appendChild(rowTop);
        rowTop.appendChild(stringBrandLabel);
        rowTop.appendChild(stringBrand);
        rowTop.appendChild(stringTypeLabel);
        rowTop.appendChild(stringType);
        for (let i = 0; i < count + 1; ++i) {
            if (i === 0) {
                const row = Utilities.createElement('div', 'row-string-top');
                content.appendChild(row);
                row.appendChild(Utilities.createElement('div', 'gauge', 'Gauge'));
                row.appendChild(Utilities.createElement('div', 'weight', 'Weight'));
                continue;
            }
            const row = Utilities.createElement('div', 'row');
            content.appendChild(row);
            row.appendChild(stringGauges[i - 1]);
            row.appendChild(stringWeights[i - 1]);
        }
        card.appendChild(submit);
        card.appendChild(exit);
        this.customStringUI.appendChild(card);
    }
    get customStringUI() {
        return this._customStringUI;
    }
    set customStringUI(value) {
        this._customStringUI = value;
    }
    /**
     * Renders the custom string user interface.
     */
    render() {
        const mainContainer = document.getElementsByClassName("main-container")[0];
        mainContainer.appendChild(this.customStringUI);
    }
}
