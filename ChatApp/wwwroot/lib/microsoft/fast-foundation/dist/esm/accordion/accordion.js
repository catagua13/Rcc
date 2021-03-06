import { __decorate } from "tslib";
import { attr, observable } from "@microsoft/fast-element";
import { keyArrowDown, keyArrowUp, keyEnd, keyHome, wrapInBounds, } from "@microsoft/fast-web-utilities";
import { FoundationElement } from "../foundation-element";
import { AccordionItem } from "../accordion-item";
/**
 * Expand mode for {@link Accordion}
 * @public
 */
export var AccordionExpandMode;
(function (AccordionExpandMode) {
    /**
     * Designates only a single {@link @microsoft/fast-foundation#(AccordionItem:class) } can be open a time.
     */
    AccordionExpandMode["single"] = "single";
    /**
     * Designates multiple {@link @microsoft/fast-foundation#(AccordionItem:class) | AccordionItems} can be open simultaneously.
     */
    AccordionExpandMode["multi"] = "multi";
})(AccordionExpandMode || (AccordionExpandMode = {}));
/**
 * An Accordion Custom HTML Element
 * Implements {@link https://www.w3.org/TR/wai-aria-practices-1.1/#accordion | ARIA Accordion}.
 * @public
 *
 * @remarks
 * Designed to be used with {@link @microsoft/fast-foundation#accordionTemplate} and {@link @microsoft/fast-foundation#(AccordionItem:class)}.
 */
export class Accordion extends FoundationElement {
    constructor() {
        super(...arguments);
        /**
         * Controls the expand mode of the Accordion, either allowing
         * single or multiple item expansion.
         * @public
         *
         * @remarks
         * HTML attribute: expand-mode
         */
        this.expandmode = AccordionExpandMode.multi;
        this.activeItemIndex = 0;
        this.change = () => {
            this.$emit("change");
        };
        this.setItems = () => {
            var _a;
            if (this.accordionItems.length === 0) {
                return;
            }
            this.accordionIds = this.getItemIds();
            this.accordionItems.forEach((item, index) => {
                if (item instanceof AccordionItem) {
                    item.addEventListener("change", this.activeItemChange);
                    if (this.isSingleExpandMode()) {
                        this.activeItemIndex !== index
                            ? (item.expanded = false)
                            : (item.expanded = true);
                    }
                }
                const itemId = this.accordionIds[index];
                item.setAttribute("id", typeof itemId !== "string" ? `accordion-${index + 1}` : itemId);
                this.activeid = this.accordionIds[this.activeItemIndex];
                item.addEventListener("keydown", this.handleItemKeyDown);
                item.addEventListener("focus", this.handleItemFocus);
            });
            if (this.isSingleExpandMode()) {
                const expandedItem = (_a = this.findExpandedItem()) !== null && _a !== void 0 ? _a : this.accordionItems[0];
                expandedItem.setAttribute("aria-disabled", "true");
            }
        };
        this.removeItemListeners = (oldValue) => {
            oldValue.forEach((item, index) => {
                item.removeEventListener("change", this.activeItemChange);
                item.removeEventListener("keydown", this.handleItemKeyDown);
                item.removeEventListener("focus", this.handleItemFocus);
            });
        };
        this.activeItemChange = (event) => {
            const selectedItem = event.target;
            this.activeid = selectedItem.getAttribute("id");
            if (this.isSingleExpandMode()) {
                this.resetItems();
                selectedItem.expanded = true;
                selectedItem.setAttribute("aria-disabled", "true");
                this.accordionItems.forEach((item) => {
                    if (!item.hasAttribute("disabled") && item.id !== this.activeid) {
                        item.removeAttribute("aria-disabled");
                    }
                });
            }
            this.activeItemIndex = Array.from(this.accordionItems).indexOf(selectedItem);
            this.change();
        };
        this.handleItemKeyDown = (event) => {
            // only handle the keydown if the event target is the accordion item
            // prevents arrow keys from moving focus to accordion headers when focus is on accordion item panel content
            if (event.target !== event.currentTarget) {
                return;
            }
            this.accordionIds = this.getItemIds();
            switch (event.key) {
                case keyArrowUp:
                    event.preventDefault();
                    this.adjust(-1);
                    break;
                case keyArrowDown:
                    event.preventDefault();
                    this.adjust(1);
                    break;
                case keyHome:
                    this.activeItemIndex = 0;
                    this.focusItem();
                    break;
                case keyEnd:
                    this.activeItemIndex = this.accordionItems.length - 1;
                    this.focusItem();
                    break;
            }
        };
        this.handleItemFocus = (event) => {
            // update the active item index if the focus moves to an accordion item via a different method other than the up and down arrow key actions
            // only do so if the focus is actually on the accordion item and not on any of its children
            if (event.target === event.currentTarget) {
                const focusedItem = event.target;
                const focusedIndex = (this.activeItemIndex = Array.from(this.accordionItems).indexOf(focusedItem));
                if (this.activeItemIndex !== focusedIndex && focusedIndex !== -1) {
                    this.activeItemIndex = focusedIndex;
                    this.activeid = this.accordionIds[this.activeItemIndex];
                }
            }
        };
    }
    /**
     * @internal
     */
    accordionItemsChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.removeItemListeners(oldValue);
            this.setItems();
        }
    }
    findExpandedItem() {
        for (let item = 0; item < this.accordionItems.length; item++) {
            if (this.accordionItems[item].getAttribute("expanded") === "true") {
                return this.accordionItems[item];
            }
        }
        return null;
    }
    resetItems() {
        this.accordionItems.forEach((item, index) => {
            item.expanded = false;
        });
    }
    getItemIds() {
        return this.accordionItems.map((accordionItem) => {
            return accordionItem.getAttribute("id");
        });
    }
    isSingleExpandMode() {
        return this.expandmode === AccordionExpandMode.single;
    }
    adjust(adjustment) {
        this.activeItemIndex = wrapInBounds(0, this.accordionItems.length - 1, this.activeItemIndex + adjustment);
        this.focusItem();
    }
    focusItem() {
        const element = this.accordionItems[this.activeItemIndex];
        if (element instanceof AccordionItem) {
            element.expandbutton.focus();
        }
    }
}
__decorate([
    attr({ attribute: "expand-mode" })
], Accordion.prototype, "expandmode", void 0);
__decorate([
    observable
], Accordion.prototype, "accordionItems", void 0);
