import type { ComponentPropsWithoutRef, JSX } from "react";

export declare const TEAL: "#0fa89b";
/** Set this CSS custom property in an app to colour the full stop with one of its own colours. Unset, it's teal. */
export declare const DOT_VAR: "--leomark-dot";
export declare const HREF: "https://leomorgan.ai";

/** The maker's mark for Leo Morgan's apps: "leomorgan●ai", linking to leomorgan.ai. */
export declare function LeoMark(props: Omit<ComponentPropsWithoutRef<"a">, "href" | "children">): JSX.Element;

/**
 * The same mark with no link, for leomorgan.ai's own header, which links it home itself.
 * Other apps use LeoMark. Without a title it's hidden from screen readers, so the link around it names it.
 */
export declare function LeoMarkGlyph(props: { className?: string; title?: string }): JSX.Element;
