/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Printer
 */

import { createCSSLink, createIFrame, getEmptyHtmlText } from "../util";

export class Printer {

    public static create(): Printer {

        return new Printer();
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

    public injectCSSFiles(...links: string[]): this {

        this._styles.push(...links);
        return this;
    }

    public print(): Promise<void> {

        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

            try {
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
                console.log('1');

                frame.onload = ((_: Event) => {
                    console.log('2');
                    frame.contentWindow.print();
                    document.body.removeChild(frame);
                    resolve();
                });
            } catch (error) {

                console.log(error);

                reject(error);
            }
            return;
        });
    }
}
