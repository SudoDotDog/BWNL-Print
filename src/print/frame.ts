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

    public mount() {

        document.body.appendChild(this._frame);
    }

    public unmount() {

        document.body.removeChild(this._frame);
    }

    public write(text: string) {

        this._getWindow().document.write(text);
    }

    public print() {

        this._getWindow().document.close();
        this._getWindow().focus();
        this._getWindow().print();
    }

    private _getWindow(): Window {

        if (this._frame.contentWindow) {
            return this._frame.contentWindow;
        }
        throw new Error('[Sudoo-Print] Mount window first');
    }
}
