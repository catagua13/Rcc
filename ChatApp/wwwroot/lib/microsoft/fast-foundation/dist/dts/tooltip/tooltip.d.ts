import { Direction } from "@microsoft/fast-web-utilities";
import type { AnchoredRegion, AutoUpdateMode, AxisPositioningMode, AxisScalingMode } from "../anchored-region";
import { FoundationElement } from "../foundation-element";
import { TooltipPosition } from "./tooltip.options";
export { TooltipPosition };
/**
 * An Tooltip Custom HTML Element.
 *
 * @public
 */
export declare class Tooltip extends FoundationElement {
    /**
     * Whether the tooltip is visible or not.
     * If undefined tooltip is shown when anchor element is hovered
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: visible
     */
    visible: boolean;
    private visibleChanged;
    /**
     * The id of the element the tooltip is anchored to
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: anchor
     */
    anchor: string;
    private anchorChanged;
    /**
     * The delay in milliseconds before a tooltip is shown after a hover event
     *
     * @defaultValue - 300
     * @public
     * HTML Attribute: delay
     */
    delay: number;
    /**
     * Controls the placement of the tooltip relative to the anchor.
     * When the position is undefined the tooltip is placed above or below the anchor based on available space.
     *
     * @defaultValue - undefined
     * @public
     * HTML Attribute: position
     */
    position: TooltipPosition | "top" | "right" | "bottom" | "left" | "start" | "end" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-start" | "top-end" | "bottom-start" | "bottom-end";
    private positionChanged;
    /**
     * Controls when the tooltip updates its position, default is 'anchor' which only updates when
     * the anchor is resized.  'auto' will update on scroll/resize events.
     * Corresponds to anchored-region auto-update-mode.
     * @public
     * @remarks
     * HTML Attribute: auto-update-mode
     */
    autoUpdateMode: AutoUpdateMode;
    /**
     * Controls if the tooltip will always remain fully in the viewport on the horizontal axis
     * @public
     * @remarks
     * HTML Attribute: horizontal-viewport-lock
     */
    horizontalViewportLock: boolean;
    /**
     * Controls if the tooltip will always remain fully in the viewport on the vertical axis
     * @public
     * @remarks
     * HTML Attribute: vertical-viewport-lock
     */
    verticalViewportLock: boolean;
    /**
     * the html element currently being used as anchor.
     * Setting this directly overrides the anchor attribute.
     *
     * @public
     */
    anchorElement: HTMLElement | null;
    private anchorElementChanged;
    /**
     * The current viewport element instance
     *
     * @internal
     */
    viewportElement: HTMLElement | null;
    private viewportElementChanged;
    /**
     * @internal
     * @defaultValue "dynamic"
     */
    verticalPositioningMode: AxisPositioningMode;
    /**
     * @internal
     * @defaultValue "dynamic"
     */
    horizontalPositioningMode: AxisPositioningMode;
    /**
     * @internal
     */
    horizontalInset: string;
    /**
     * @internal
     */
    verticalInset: string;
    /**
     * @internal
     */
    horizontalScaling: AxisScalingMode;
    /**
     * @internal
     */
    verticalScaling: AxisScalingMode;
    /**
     * @internal
     */
    verticalDefaultPosition: string | undefined;
    /**
     * @internal
     */
    horizontalDefaultPosition: string | undefined;
    /**
     * @internal
     */
    tooltipVisible: boolean;
    /**
     * Track current direction to pass to the anchored region
     * updated when tooltip is shown
     *
     * @internal
     */
    currentDirection: Direction;
    /**
     * reference to the anchored region
     *
     * @internal
     */
    region: AnchoredRegion;
    /**
     * The timer that tracks delay time before the tooltip is shown on hover
     */
    private showDelayTimer;
    /**
     * The timer that tracks delay time before the tooltip is hidden
     */
    private hideDelayTimer;
    /**
     * Indicates whether the anchor is currently being hovered or has focus
     */
    private isAnchorHoveredFocused;
    /**
     * Indicates whether the region is currently being hovered
     */
    private isRegionHovered;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * invoked when the anchored region's position relative to the anchor changes
     *
     * @internal
     */
    handlePositionChange: (ev: Event) => void;
    /**
     * mouse enters region
     */
    private handleRegionMouseOver;
    /**
     * mouse leaves region
     */
    private handleRegionMouseOut;
    /**
     * mouse enters anchor
     */
    private handleAnchorMouseOver;
    /**
     * mouse leaves anchor
     */
    private handleAnchorMouseOut;
    /**
     * anchor gets focus
     */
    private handleAnchorFocusIn;
    /**
     * anchor loses focus
     */
    private handleAnchorFocusOut;
    /**
     * starts the hide timer
     */
    private startHideDelayTimer;
    /**
     * clears the hide delay
     */
    private clearHideDelayTimer;
    /**
     * starts the show timer if not currently running
     */
    private startShowDelayTimer;
    /**
     * start hover
     */
    private startHover;
    /**
     * clears the show delay
     */
    private clearShowDelayTimer;
    /**
     * updated the properties being passed to the anchored region
     */
    private updateLayout;
    /**
     *  Gets the anchor element by id
     */
    private getAnchor;
    /**
     * handles key down events to check for dismiss
     */
    private handleDocumentKeydown;
    /**
     * determines whether to show or hide the tooltip based on current state
     */
    private updateTooltipVisibility;
    /**
     * shows the tooltip
     */
    private showTooltip;
    /**
     * hides the tooltip
     */
    private hideTooltip;
    /**
     * updates the tooltip anchored region props after it has been
     * added to the DOM
     */
    private setRegionProps;
}
