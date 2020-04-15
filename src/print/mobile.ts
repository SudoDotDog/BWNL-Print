/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Mobile Printer
 */

import { PrintOptions } from "../print";
import { createHiddenStyle, createVisibleIFrame, getBodyHtmlText } from "../util";
import { Printer } from "./printer";

export class MobilePrinter extends Printer {

    public static create(options: PrintOptions): MobilePrinter {

        return new MobilePrinter(options);
    }

    protected constructor(options: PrintOptions) {

        super(options);
    }

    protected _executePrint(frame: HTMLIFrameElement): boolean {

        const contentWindow: Window = this._getContentWindow(frame);

        const style: HTMLStyleElement = createHiddenStyle();
        document.head.appendChild(style);

        frame.height = `${contentWindow.document.body.scrollHeight}px`;

        window.print();

        this._destroyFrame(frame);
        document.head.removeChild(style);
        return true;
    }

    protected _prepareFrame(): HTMLIFrameElement {

        const frame: HTMLIFrameElement = createVisibleIFrame();

        document.body.appendChild(frame);

        const contentWindow: Window = this._getContentWindow(frame);
        contentWindow.document.open();

        return frame;
    }
}
