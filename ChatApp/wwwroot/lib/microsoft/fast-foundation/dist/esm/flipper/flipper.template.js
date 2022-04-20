import { html, when } from "@microsoft/fast-element";
import { FlipperDirection } from "./flipper.options";
/**
 * The template for the {@link @microsoft/fast-foundation#Flipper} component.
 * @public
 */
export const flipperTemplate = (context, definition) => html `
    <template
        role="button"
        aria-disabled="${x => (x.disabled ? true : void 0)}"
        tabindex="${x => (x.hiddenFromAT ? -1 : 0)}"
        class="${x => x.direction} ${x => (x.disabled ? "disabled" : "")}"
        @keyup="${(x, c) => x.keyupHandler(c.event)}"
    >
        ${when(x => x.direction === FlipperDirection.next, html `
                <span part="next" class="next">
                    <slot name="next">
                        ${definition.next || ""}
                    </slot>
                </span>
            `)}
        ${when(x => x.direction === FlipperDirection.previous, html `
                <span part="previous" class="previous">
                    <slot name="previous">
                        ${definition.previous || ""}
                    </slot>
                </span>
            `)}
    </template>
`;
