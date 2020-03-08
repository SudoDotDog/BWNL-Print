/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Printer
 */

import { PrintOptions } from "../print";
import { createCSSLink, createIFrame, getEmptyHtmlText } from "../util";

export class Printer {

    public static create(options: PrintOptions): Printer {

        return new Printer(options);
    }

    private readonly _options: PrintOptions;

    private readonly _contents: string[];

    private _needLoads: boolean;

    private constructor(options: PrintOptions) {

        this._options = options;

        this._contents = [];

        this._needLoads = false;
    }

    public write(text: string): this {

        this._contents.push(text);
        return this;
    }

    public print(): Promise<void> {

        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

            try {

                const frame: HTMLIFrameElement = createIFrame();

                document.body.appendChild(frame);

                if (!frame.contentWindow) {
                    throw new Error("[BWNL-Print] IFrame Mount Failed");
                }

                frame.contentWindow.document.open();
                frame.contentWindow.document.write(getEmptyHtmlText());

                frame.contentWindow.document.write(...this._contents);
                frame.contentWindow.document.close();

                if (this._needLoads) {

                    let printed: boolean = false;

                    if (this._options.polyfillTimeout) {

                        setTimeout(() => {

                            if (printed) {
                                return;
                            }

                            const result: boolean = this._executePrint(frame);
                            if (!result) {
                                reject(new Error("[BWNL-Print] Printing Failed"));
                                return;
                            }
                            printed = true;
                            resolve();
                        }, this._options.polyfillTimeout);
                    }

                    frame.onload = ((_: Event) => {

                        if (printed) {
                            return;
                        }

                        const result: boolean = this._executePrint(frame);
                        if (!result) {
                            reject(new Error("[BWNL-Print] Printing Failed"));
                            return;
                        }
                        printed = true;
                        resolve();
                    });
                } else {

                    const result: boolean = this._executePrint(frame);
                    if (!result) {
                        reject(new Error("[BWNL-Print] Printing Failed"));
                        return;
                    }
                    resolve();
                }
            } catch (error) {

                reject(error);
            }
            return;
        });
    }

    private _executePrint(frame: HTMLIFrameElement): boolean {

        console.log('triggered');

        if (!frame.contentWindow) {
            return false;
        }

        frame.contentWindow.focus();
        frame.contentWindow.print();
        document.body.removeChild(frame);
        return true;
    }
}
