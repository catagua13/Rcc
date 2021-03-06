import { __decorate } from "tslib";
import { attr, DOM, observable } from "@microsoft/fast-element";
import { Direction, keyArrowLeft, keyArrowRight, keyEnter, keySpace, } from "@microsoft/fast-web-utilities";
import { FoundationElement } from "../foundation-element";
import { StartEnd } from "../patterns/start-end";
import { getDirection } from "../utilities/";
import { applyMixins } from "../utilities/apply-mixins";
import { MenuItemRole, roleForMenuItem } from "./menu-item.options";
export { MenuItemRole, roleForMenuItem };
/**
 * A Switch Custom HTML Element.
 * Implements {@link https://www.w3.org/TR/wai-aria-1.1/#menuitem | ARIA menuitem }, {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemcheckbox | ARIA menuitemcheckbox}, or {@link https://www.w3.org/TR/wai-aria-1.1/#menuitemradio | ARIA menuitemradio }.
 *
 * @public
 */
export class MenuItem extends FoundationElement {
    constructor() {
        super(...arguments);
        /**
         * The role of the element.
         *
         * @public
         * @remarks
         * HTML Attribute: role
         */
        this.role = MenuItemRole.menuitem;
        /**
         * @internal
         */
        this.hasSubmenu = false;
        /**
         * Track current direction to pass to the anchored region
         *
         * @internal
         */
        this.currentDirection = Direction.ltr;
        this.focusSubmenuOnLoad = false;
        /**
         * @internal
         */
        this.handleMenuItemKeyDown = (e) => {
            if (e.defaultPrevented) {
                return false;
            }
            switch (e.key) {
                case keyEnter:
                case keySpace:
                    this.invoke();
                    return false;
                case keyArrowRight:
                    //open/focus on submenu
                    this.expandAndFocus();
                    return false;
                case keyArrowLeft:
                    //close submenu
                    if (this.expanded) {
                        this.expanded = false;
                        this.focus();
                        return false;
                    }
            }
            return true;
        };
        /**
         * @internal
         */
        this.handleMenuItemClick = (e) => {
            if (e.defaultPrevented || this.disabled) {
                return false;
            }
            this.invoke();
            return false;
        };
        /**
         * @internal
         */
        this.submenuLoaded = () => {
            if (!this.focusSubmenuOnLoad) {
                return;
            }
            this.focusSubmenuOnLoad = false;
            if (this.hasSubmenu) {
                this.submenu.focus();
                this.setAttribute("tabindex", "-1");
            }
        };
        /**
         * @internal
         */
        this.handleMouseOver = (e) => {
            if (this.disabled || !this.hasSubmenu || this.expanded) {
                return false;
            }
            this.expanded = true;
            return false;
        };
        /**
         * @internal
         */
        this.handleMouseOut = (e) => {
            if (!this.expanded || this.contains(document.activeElement)) {
                return false;
            }
            this.expanded = false;
            return false;
        };
        /**
         * @internal
         */
        this.expandAndFocus = () => {
            if (!this.hasSubmenu) {
                return;
            }
            this.focusSubmenuOnLoad = true;
            this.expanded = true;
        };
        /**
         * @internal
         */
        this.invoke = () => {
            if (this.disabled) {
                return;
            }
            switch (this.role) {
                case MenuItemRole.menuitemcheckbox:
                    this.checked = !this.checked;
                    break;
                case MenuItemRole.menuitem:
                    // update submenu
                    this.updateSubmenu();
                    if (this.hasSubmenu) {
                        this.expandAndFocus();
                    }
                    else {
                        this.$emit("change");
                    }
                    break;
                case MenuItemRole.menuitemradio:
                    if (!this.checked) {
                        this.checked = true;
                    }
                    break;
            }
        };
        /**
         * Gets the submenu element if any
         *
         * @internal
         */
        this.updateSubmenu = () => {
            this.submenu = this.domChildren().find((element) => {
                return element.getAttribute("role") === "menu";
            });
            this.hasSubmenu = this.submenu === undefined ? false : true;
        };
    }
    expandedChanged(oldValue) {
        if (this.$fastController.isConnected) {
            if (this.submenu === undefined) {
                return;
            }
            if (this.expanded === false) {
                this.submenu.collapseExpandedItem();
            }
            else {
                this.currentDirection = getDirection(this);
            }
            this.$emit("expanded-change", this, { bubbles: false });
        }
    }
    checkedChanged(oldValue, newValue) {
        if (this.$fastController.isConnected) {
            this.$emit("change");
        }
    }
    /**
     * @internal
     */
    connectedCallback() {
        super.connectedCallback();
        DOM.queueUpdate(() => {
            this.updateSubmenu();
        });
        if (!this.startColumnCount) {
            this.startColumnCount = 1;
        }
        this.observer = new MutationObserver(this.updateSubmenu);
    }
    /**
     * @internal
     */
    disconnectedCallback() {
        super.disconnectedCallback();
        this.submenu = undefined;
        if (this.observer !== undefined) {
            this.observer.disconnect();
            this.observer = undefined;
        }
    }
    /**
     * get an array of valid DOM children
     */
    domChildren() {
        return Array.from(this.children).filter(child => !child.hasAttribute("hidden"));
    }
}
__decorate([
    attr({ mode: "boolean" })
], MenuItem.prototype, "disabled", void 0);
__decorate([
    attr({ mode: "boolean" })
], MenuItem.prototype, "expanded", void 0);
__decorate([
    observable
], MenuItem.prototype, "startColumnCount", void 0);
__decorate([
    attr
], MenuItem.prototype, "role", void 0);
__decorate([
    attr({ mode: "boolean" })
], MenuItem.prototype, "checked", void 0);
__decorate([
    observable
], MenuItem.prototype, "submenuRegion", void 0);
__decorate([
    observable
], MenuItem.prototype, "hasSubmenu", void 0);
__decorate([
    observable
], MenuItem.prototype, "currentDirection", void 0);
__decorate([
    observable
], MenuItem.prototype, "submenu", void 0);
applyMixins(MenuItem, StartEnd);
