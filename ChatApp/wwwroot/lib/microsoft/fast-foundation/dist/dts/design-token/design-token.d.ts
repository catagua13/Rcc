import { CSSDirective } from "@microsoft/fast-element";
import type { DesignTokenConfiguration, DesignTokenValue, StaticDesignTokenValue } from "./interfaces";
/**
 * Describes a DesignToken instance.
 * @public
 */
export interface DesignToken<T extends string | number | boolean | BigInteger | null | Array<any> | symbol | {}> {
    /**
     * The name of the token
     */
    readonly name: string;
    /**
     * A list of elements for which the DesignToken has a value set
     */
    readonly appliedTo: HTMLElement[];
    /**
     * Get the token value for an element.
     * @param element - The element to get the value for
     * @returns - The value set for the element, or the value set for the nearest element ancestor.
     */
    getValueFor(element: HTMLElement): StaticDesignTokenValue<T>;
    /**
     * Sets the token to a value for an element.
     * @param element - The element to set the value for.
     * @param value - The value.
     */
    setValueFor(element: HTMLElement, value: DesignTokenValue<T> | DesignToken<T>): void;
    /**
     * Removes a value set for an element.
     * @param element - The element to remove the value from
     */
    deleteValueFor(element: HTMLElement): this;
    /**
     * Associates a default value to the token
     */
    withDefault(value: DesignTokenValue<T> | DesignToken<T>): this;
    /**
     * Subscribes a subscriber to change records for a token. If an element is provided, only
     * change records for that element will be emitted.
     */
    subscribe(subscriber: DesignTokenSubscriber<this>, target?: HTMLElement): void;
    /**
     * Unsubscribes a subscriber from change records for a token.
     */
    unsubscribe(subscriber: DesignTokenSubscriber<this>, target?: HTMLElement): void;
}
/**
 * A {@link (DesignToken:interface)} that emits a CSS custom property.
 * @public
 */
export interface CSSDesignToken<T extends string | number | boolean | BigInteger | null | Array<any> | symbol | ({
    createCSS?(): string;
} & Record<PropertyKey, any>)> extends DesignToken<T>, CSSDirective {
    /**
     * The {@link (DesignToken:interface)} formatted as a CSS custom property if the token is
     * configured to write a CSS custom property.
     */
    readonly cssCustomProperty: string;
}
/**
 * Change record provided to to a {@link DesignTokenSubscriber} when a token changes for a target.
 * @public
 */
export interface DesignTokenChangeRecord<T extends DesignToken<any>> {
    /**
     * The element for which the value was changed
     */
    target: HTMLElement;
    /**
     * The token that was changed
     */
    token: T;
}
/**
 * A subscriber that should receive {@link DesignTokenChangeRecord | change records} when a token changes for a target
 * @public
 */
export interface DesignTokenSubscriber<T extends DesignToken<any>> {
    handleChange(record: DesignTokenChangeRecord<T>): void;
}
declare function create<T extends Function>(nameOrConfig: string | DesignTokenConfiguration): never;
declare function create<T extends undefined | void>(nameOrConfig: string | DesignTokenConfiguration): never;
declare function create<T>(nameOrConfig: string): CSSDesignToken<T>;
declare function create<T>(nameOrConfig: Omit<DesignTokenConfiguration, "cssCustomPropertyName"> | (DesignTokenConfiguration & Record<"cssCustomPropertyName", string>)): CSSDesignToken<T>;
declare function create<T>(nameOrConfig: DesignTokenConfiguration & Record<"cssCustomPropertyName", null>): DesignToken<T>;
/**
 * Factory object for creating {@link (DesignToken:interface)} instances.
 * @public
 */
export declare const DesignToken: Readonly<{
    create: typeof create;
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been connected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     * 3. The HTMLElement is not connected to the document when token values are set.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyConnection(element: HTMLElement): boolean;
    /**
     * Informs DesignToken that an HTMLElement for which tokens have
     * been set has been disconnected to the document.
     *
     * The browser does not provide a reliable mechanism to observe an HTMLElement's connectedness
     * in all scenarios, so invoking this method manually is necessary when:
     *
     * 1. Token values are set for an HTMLElement.
     * 2. The HTMLElement does not inherit from FASTElement.
     *
     * @param element - The element to notify
     * @returns - true if notification was successful, otherwise false.
     */
    notifyDisconnection(element: HTMLElement): boolean;
    /**
     * Registers and element or document as a DesignToken root.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link (DesignToken:interface).withDefault} will emit CSS custom properties to all
     * registered roots.
     * @param target - The root to register
     */
    registerRoot(target?: HTMLElement | Document): void;
    /**
     * Unregister an element or document as a DesignToken root.
     * @param target - The root to deregister
     */
    unregisterRoot(target?: HTMLElement | Document): void;
}>;
export {};
