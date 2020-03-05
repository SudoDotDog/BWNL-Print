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

        this._frame.contentWindow.document.write(text);
    }

    public print() {

        this._frame.contentWindow.document.close();
        this._frame.contentWindow.focus();
        this._frame.contentWindow.print();
    }
}
