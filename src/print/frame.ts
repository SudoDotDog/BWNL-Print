/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Frame
 */

export class PrintFrameAgent {

    public static create(): PrintFrameAgent {

        return new PrintFrameAgent();
    }

    private readonly _frame: HTMLIFrameElement;

    private constructor() {

        this._frame = document.createElement('iframe');
    }

    public mount(): this {

        document.body.appendChild(this._frame);
        return this;
    }

    public unmount(): this {

        document.body.removeChild(this._frame);
        return this;
    }

    public write(text: string): this {

        const frameWindow: Window = this._getWindow();

        frameWindow.document.write(text);
        return this;
    }

    public print(): this {

        const frameWindow: Window = this._getWindow();

        frameWindow.document.close();
        frameWindow.focus();
        frameWindow.print();
        return this;
    }

    private _getWindow(): Window {

        if (this._frame.contentWindow) {
            return this._frame.contentWindow;
        }
        throw new Error('[Sudoo-Print] Mount window first');
    }
}
