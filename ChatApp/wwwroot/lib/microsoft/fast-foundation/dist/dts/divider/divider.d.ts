import { Orientation } from "@microsoft/fast-web-utilities";
import { FoundationElement } from "../foundation-element";
import { DividerRole } from "./divider.options";
export { DividerRole };
/**
 * A Divider Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#separator | ARIA separator } or {@link https://www.w3.org/TR/wai-aria-1.1/#presentation | ARIA presentation}.
 *
 * @public
 */
export declare class Divider extends FoundationElement {
    /**
     * The role of the element.
     *
     * @public
     * @defaultValue - {@link DividerRole.separator}
     * @remarks
     * HTML Attribute: role
     */
    role: DividerRole | "separator" | "presentation";
    /**
     * The orientation of the divider.
     *
     * @public
     * @remarks
     * HTML Attribute: orientation
     */
    orientation: Orientation;
}
