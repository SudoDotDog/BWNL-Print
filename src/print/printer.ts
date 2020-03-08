/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Printer
 */

import { PrintOptions } from "../print";
import { createIFrame, getBodyHtmlText } from "../util";

export class Printer {

    public static create(options: PrintOptions): Printer {

        return new Printer(options);
    }

    private readonly _options: PrintOptions;

    private constructor(options: PrintOptions) {

        this._options = options;
    }

    public async printAsBody(body: string): Promise<void> {

        const frame: HTMLIFrameElement = this._prepareFrame();

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.write(getBodyHtmlText(body));

        return await this._printFrame(frame);
    }

    public async printAsPage(html: string): Promise<void> {

        const frame: HTMLIFrameElement = this._prepareFrame();

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.write(html);

        return await this._printFrame(frame);
    }

    private _prepareFrame(): HTMLIFrameElement {

        const frame: HTMLIFrameElement = createIFrame();

        document.body.appendChild(frame);

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.open();

        return frame;
    }

    private _printFrame(frame: HTMLIFrameElement): Promise<void> {

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.close();

        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

            try {

                if (this._options.needLoads) {

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

        if (!frame.contentWindow) {
            return false;
        }

        frame.contentWindow.focus();
        frame.contentWindow.print();
        document.body.removeChild(frame);
        return true;
    }

    private _getContentWindow(frame: HTMLIFrameElement): Window {

        if (!frame.contentWindow) {
            throw new Error("[BWNL-Print] IFrame Mount Failed");
        }

        return frame.contentWindow;
    }
}
