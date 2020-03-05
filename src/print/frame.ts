/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Frame
 */

import { createCSSLink, createIFrame, getEmptyHtmlText } from "../util";

export class PrintFrameAgent {

    public static create(): PrintFrameAgent {

        return new PrintFrameAgent();
    }

    private readonly _contents: string[];
    private readonly _styles: string[];

    private constructor() {

        this._contents = [];
        this._styles = [];
    }

    public write(text: string): this {

        this._contents.push(text);
        return this;
    }

    public injectCSS(href: string): this {

        this._styles.push(href);
        return this;
    }

    public print(): this {

        const frame: HTMLIFrameElement = createIFrame();

        document.body.appendChild(frame);

        if (!frame.contentWindow) {
            throw new Error("[BWNL-Print] Mount Failed");
        }

        frame.contentWindow.document.open();
        frame.contentWindow.document.write(getEmptyHtmlText());

        for (const style of this._styles) {
            const link: HTMLLinkElement = createCSSLink(style);
            frame.contentWindow.document.head.appendChild(link);
        }

        frame.contentWindow.document.write(...this._contents);
        frame.contentWindow.document.close();

        frame.contentWindow.focus();
        // frame.contentWindow.print();

        // document.body.removeChild(frame);
        return this;
    }
}
