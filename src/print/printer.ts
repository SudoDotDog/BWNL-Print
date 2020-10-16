/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Printer
 */

import { PrintOptions } from "../print";
import { createIFrame, getBodyHtmlText } from "../util";
import { IPrinter } from "./declare";

export class Printer implements IPrinter {

    public static create(options: PrintOptions): Printer {

        return new Printer(options);
    }

    protected _cachedTitle: string | null = null;

    private readonly _options: PrintOptions;

    protected constructor(options: PrintOptions) {

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

    protected _printFrame(frame: HTMLIFrameElement): Promise<void> {

        return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

            const contentWindow: Window = this._getContentWindow(frame);

            try {

                if (this._options.needLoads) {

                    let printed: boolean = false;

                    if (this._options.polyfillTimeout) {

                        setTimeout(() => {

                            if (printed) {
                                return;
                            }
                            printed = true;

                            const result: boolean = this._executePrint(frame);
                            if (!result) {
                                reject(new Error("[BWNL-Print] Printing Failed"));
                                return;
                            }
                            resolve();
                        }, this._options.polyfillTimeout);
                    }

                    frame.onload = (() => {

                        if (printed) {
                            return;
                        }
                        printed = true;

                        const result: boolean = this._executePrint(frame);
                        if (!result) {
                            reject(new Error("[BWNL-Print] Printing Failed"));
                            return;
                        }
                        resolve();
                    });

                    contentWindow.document.close();
                } else {

                    contentWindow.document.close();
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

    protected _executePrint(frame: HTMLIFrameElement): boolean {

        const contentWindow: Window = this._getContentWindow(frame);

        contentWindow.onafterprint = () => {
            this._finishPrint(frame);
            this._destroyFrame(frame);
        };

        this._preparePrint(frame);

        contentWindow.focus();
        contentWindow.print();
        return true;
    }

    protected _prepareFrame(): HTMLIFrameElement {

        const frame: HTMLIFrameElement = createIFrame();

        document.body.appendChild(frame);

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.open();

        return frame;
    }

    protected _destroyFrame(frame: HTMLIFrameElement): this {

        document.body.removeChild(frame);
        return this;
    }

    protected _preparePrint(_frame: HTMLIFrameElement): this {

        this._cachedTitle = window.top.document.title;

        if (this._options.fileName) {
            window.top.document.title = this._options.fileName;
        }

        return this;
    }

    protected _finishPrint(_frame: HTMLIFrameElement): this {

        if (this._cachedTitle !== null) {
            window.top.document.title = this._cachedTitle;
        }

        this._cachedTitle = null;

        return this;
    }

    protected _getContentWindow(frame: HTMLIFrameElement): Window {

        if (!frame.contentWindow) {
            throw new Error("[BWNL-Print] IFrame Mount Failed");
        }

        return frame.contentWindow;
    }
}
