import { __decorate } from "tslib";
import { attr, DOM, Observable, observable } from "@microsoft/fast-element";
import { uniqueId } from "@microsoft/fast-web-utilities";
import { DelegatesARIAListbox, Listbox } from "../listbox";
import { StartEnd } from "../patterns/start-end";
import { applyMixins } from "../utilities/apply-mixins";
import { FormAssociatedSelect } from "./select.form-associated";
import { SelectPosition } from "./select.options";
/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @public
 */
export class Select extends FormAssociatedSelect {
    constructor() {
        super(...arguments);
        /**
         * The open attribute.
         *
         * @public
         * @remarks
         * HTML Attribute: open
         */
        this.open = false;
        /**
         * Indicates the initial state of the position attribute.
         *
         * @internal
         */
        this.forcedPosition = false;
        /**
         * Holds the current state for the calculated position of the listbox.
         *
         * @public
         */
        this.position = SelectPosition.below;
        /**
         * The unique id for the internal listbox element.
         *
         * @internal
         */
        this.listboxId = uniqueId("listbox-");
        /**
         * The max height for the listbox when opened.
         *
         * @internal
         */
        this.maxHeight = 0;
        /**
         * The value displayed on the button.
         *
         * @public
         */
        this.displayValue = "";
    }
    openChanged() {
        if (this.open) {
            this.ariaControls = this.listboxId;
            this.ariaExpanded = "true";
            this.setPositioning();
            this.focusAndScrollOptionIntoView();
            this.indexWhenOpened = this.selectedIndex;
            // focus is directed to the element when `open` is changed programmatically
            DOM.queueUpdate(() => this.focus());
            return;
        }
        this.ariaControls = "";
        this.ariaExpanded = "false";
    }
    /**
     * The value property.
     *
     * @public
     */
    get value() {
        Observable.track(this, "value");
        return this._value;
    }
    set value(next) {
        var _a;
        const prev = `${this._value}`;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.length) {
            const selectedIndex = this.options.findIndex(el => el.value === next);
            const prevSelectedOption = this.options[this.selectedIndex];
            const nextSelectedOption = this.options[selectedIndex];
            const prevSelectedValue = prevSelectedOption
                ? prevSelectedOption.value
                : null;
            const nextSelectedValue = nextSelectedOption
                ? nextSelectedOption.value
                : null;
            if (selectedIndex === -1 || prevSelectedValue !== nextSelectedValue) {
                next = "";
                this.selectedIndex = selectedIndex;
            }
            if (this.firstSelectedOption) {
                next = this.firstSelectedOption.value;
            }
        }
        if (prev !== next) {
            this._value = next;
            super.valueChanged(prev, next);
            Observable.notify(this, "value");
        }
    }
    updateValue(shouldEmit) {
        if (this.$fastController.isConnected) {
            this.value = this.firstSelectedOption ? this.firstSelectedOption.value : "";
            this.displayValue = this.firstSelectedOption
                ? this.firstSelectedOption.textContent || this.firstSelectedOption.value
                : this.value;
        }
        if (shouldEmit) {
            this.$emit("input");
            this.$emit("change", this, {
                bubbles: true,
                composed: undefined,
            });
        }
    }
    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    selectedIndexChanged(prev, next) {
        super.selectedIndexChanged(prev, next);
        this.updateValue();
    }
    positionChanged() {
        this.positionAttribute = this.position;
        this.setPositioning();
    }
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @param force - direction to force the listbox to display
     * @public
     */
    setPositioning() {
        const currentBox = this.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const availableBottom = viewportHeight - currentBox.bottom;
        this.position = this.forcedPosition
            ? this.positionAttribute
            : currentBox.top > availableBottom
                ? SelectPosition.above
                : SelectPosition.below;
        this.positionAttribute = this.forcedPosition
            ? this.positionAttribute
            : this.position;
        this.maxHeight =
            this.position === SelectPosition.above ? ~~currentBox.top : ~~availableBottom;
    }
    maxHeightChanged() {
        if (this.listbox) {
            this.listbox.style.setProperty("--max-height", `${this.maxHeight}px`);
        }
    }
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev, next) {
        if (super.disabledChanged) {
            super.disabledChanged(prev, next);
        }
        this.ariaDisabled = this.disabled ? "true" : "false";
    }
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback() {
        this.setProxyOptions();
        // Call the base class's implementation setDefaultSelectedOption instead of the select's
        // override, in order to reset the selectedIndex without using the value property.
        super.setDefaultSelectedOption();
        if (this.selectedIndex === -1) {
            this.selectedIndex = 0;
        }
    }
    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e) {
        // do nothing if the select is disabled
        if (this.disabled) {
            return;
        }
        if (this.open) {
            const captured = e.target.closest(`option,[role=option]`);
            if (captured && captured.disabled) {
                return;
            }
        }
        super.clickHandler(e);
        this.open = !this.open;
        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
        }
        return true;
    }
    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e) {
        var _a;
        if (!this.open) {
            return true;
        }
        const focusTarget = e.relatedTarget;
        if (this.isSameNode(focusTarget)) {
            this.focus();
            return;
        }
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.includes(focusTarget))) {
            this.open = false;
            if (this.indexWhenOpened !== this.selectedIndex) {
                this.updateValue(true);
            }
        }
    }
    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev, next) {
        super.slottedOptionsChanged(prev, next);
        this.setProxyOptions();
        this.updateValue();
    }
    setDefaultSelectedOption() {
        var _a;
        const options = (_a = this.options) !== null && _a !== void 0 ? _a : Array.from(this.children).filter(Listbox.slottedOptionFilter);
        const selectedIndex = options === null || options === void 0 ? void 0 : options.findIndex(el => el.hasAttribute("selected") || el.selected || el.value === this.value);
        if (selectedIndex !== -1) {
            this.selectedIndex = selectedIndex;
            return;
        }
        this.selectedIndex = 0;
    }
    /**
     * Reset and fill the proxy to match the component's options.
     *
     * @internal
     */
    setProxyOptions() {
        if (this.proxy instanceof HTMLSelectElement && this.options) {
            this.proxy.options.length = 0;
            this.options.forEach(option => {
                const proxyOption = option.proxy ||
                    (option instanceof HTMLOptionElement ? option.cloneNode() : null);
                if (proxyOption) {
                    this.proxy.appendChild(proxyOption);
                }
            });
        }
    }
    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e) {
        super.keydownHandler(e);
        const key = e.key || e.key.charCodeAt(0);
        switch (key) {
            case " ": {
                if (this.typeaheadExpired) {
                    e.preventDefault();
                    this.open = !this.open;
                }
                break;
            }
            case "Enter": {
                e.preventDefault();
                this.open = !this.open;
                break;
            }
            case "Escape": {
                if (this.open) {
                    e.preventDefault();
                    this.open = false;
                }
                break;
            }
            case "Tab": {
                if (!this.open) {
                    return true;
                }
                e.preventDefault();
                this.open = false;
            }
        }
        if (!this.open && this.indexWhenOpened !== this.selectedIndex) {
            this.updateValue(true);
            this.indexWhenOpened = this.selectedIndex;
        }
        return true;
    }
    connectedCallback() {
        super.connectedCallback();
        this.forcedPosition = !!this.positionAttribute;
    }
}
__decorate([
    attr({ attribute: "open", mode: "boolean" })
], Select.prototype, "open", void 0);
__decorate([
    attr({ attribute: "position" })
], Select.prototype, "positionAttribute", void 0);
__decorate([
    observable
], Select.prototype, "position", void 0);
__decorate([
    observable
], Select.prototype, "maxHeight", void 0);
__decorate([
    observable
], Select.prototype, "displayValue", void 0);
/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export class DelegatesARIASelect {
}
__decorate([
    observable
], DelegatesARIASelect.prototype, "ariaControls", void 0);
applyMixins(DelegatesARIASelect, DelegatesARIAListbox);
applyMixins(Select, StartEnd, DelegatesARIASelect);
