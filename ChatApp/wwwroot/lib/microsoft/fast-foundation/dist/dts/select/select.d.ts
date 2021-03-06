import type { SyntheticViewTemplate } from "@microsoft/fast-element";
import type { FoundationElementDefinition } from "../foundation-element";
import { DelegatesARIAListbox } from "../listbox";
import { StartEnd } from "../patterns/start-end";
import type { StartEndOptions } from "../patterns/start-end";
import { FormAssociatedSelect } from "./select.form-associated";
import { SelectPosition } from "./select.options";
/**
 * Select configuration options
 * @public
 */
export declare type SelectOptions = FoundationElementDefinition & StartEndOptions & {
    indicator?: string | SyntheticViewTemplate;
};
/**
 * A Select Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#select | ARIA select }.
 *
 * @public
 */
export declare class Select extends FormAssociatedSelect {
    /**
     * The open attribute.
     *
     * @public
     * @remarks
     * HTML Attribute: open
     */
    open: boolean;
    protected openChanged(): void;
    private indexWhenOpened;
    /**
     * The internal value property.
     *
     * @internal
     */
    private _value;
    /**
     * The value property.
     *
     * @public
     */
    get value(): string;
    set value(next: string);
    private updateValue;
    /**
     * Updates the proxy value when the selected index changes.
     *
     * @param prev - the previous selected index
     * @param next - the next selected index
     *
     * @internal
     */
    selectedIndexChanged(prev: number, next: number): void;
    /**
     * Reflects the placement for the listbox when the select is open.
     *
     * @public
     */
    positionAttribute: SelectPosition | "above" | "below";
    /**
     * Indicates the initial state of the position attribute.
     *
     * @internal
     */
    private forcedPosition;
    /**
     * Holds the current state for the calculated position of the listbox.
     *
     * @public
     */
    position: SelectPosition | "above" | "below";
    protected positionChanged(): void;
    /**
     * Reference to the internal listbox element.
     *
     * @internal
     */
    listbox: HTMLDivElement;
    /**
     * The unique id for the internal listbox element.
     *
     * @internal
     */
    listboxId: string;
    /**
     * Calculate and apply listbox positioning based on available viewport space.
     *
     * @param force - direction to force the listbox to display
     * @public
     */
    setPositioning(): void;
    /**
     * The max height for the listbox when opened.
     *
     * @internal
     */
    maxHeight: number;
    private maxHeightChanged;
    /**
     * The value displayed on the button.
     *
     * @public
     */
    displayValue: string;
    /**
     * Synchronize the `aria-disabled` property when the `disabled` property changes.
     *
     * @param prev - The previous disabled value
     * @param next - The next disabled value
     *
     * @internal
     */
    disabledChanged(prev: boolean, next: boolean): void;
    /**
     * Reset the element to its first selectable option when its parent form is reset.
     *
     * @internal
     */
    formResetCallback(): void;
    /**
     * Handle opening and closing the listbox when the select is clicked.
     *
     * @param e - the mouse event
     * @internal
     */
    clickHandler(e: MouseEvent): boolean | void;
    /**
     * Handle focus state when the element or its children lose focus.
     *
     * @param e - The focus event
     * @internal
     */
    focusoutHandler(e: FocusEvent): boolean | void;
    /**
     * Synchronize the form-associated proxy and update the value property of the element.
     *
     * @param prev - the previous collection of slotted option elements
     * @param next - the next collection of slotted option elements
     *
     * @internal
     */
    slottedOptionsChanged(prev: Element[], next: Element[]): void;
    protected setDefaultSelectedOption(): void;
    /**
     * Reset and fill the proxy to match the component's options.
     *
     * @internal
     */
    private setProxyOptions;
    /**
     * Handle keyboard interaction for the select.
     *
     * @param e - the keyboard event
     * @internal
     */
    keydownHandler(e: KeyboardEvent): boolean | void;
    connectedCallback(): void;
}
/**
 * Includes ARIA states and properties relating to the ARIA select role.
 *
 * @public
 */
export declare class DelegatesARIASelect {
    /**
     * See {@link https://www.w3.org/TR/wai-aria-1.2/#combobox} for more information
     * @public
     * @remarks
     * HTML Attribute: `aria-controls`
     */
    ariaControls: string;
}
/**
 * Mark internal because exporting class and interface of the same name
 * confuses API documenter.
 * TODO: https://github.com/microsoft/fast/issues/3317
 * @internal
 */
export interface DelegatesARIASelect extends DelegatesARIAListbox {
}
/**
 * @internal
 */
export interface Select extends StartEnd, DelegatesARIASelect {
}
