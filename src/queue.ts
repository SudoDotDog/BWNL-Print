/**
 * @author WMXPY
 * @namespace Print
 * @description Queue
 */

import { PrintOptions, printReactElementAsBody, printReactElementAsPage } from "./print";

export type PrintQueueEventListener = (loading: boolean) => any;

export class PrintQueue {

    public static create(): PrintQueue {

        return new PrintQueue();
    }

    private _loading: boolean;
    private _beforeEventListener: PrintQueueEventListener[];
    private _afterEventListener: PrintQueueEventListener[];

    private constructor() {

        this._loading = false;
        this._beforeEventListener = [];
        this._afterEventListener = [];
    }

    public get loading(): boolean {
        return this._loading;
    }

    public async printReactElementAsBody(element: React.ReactElement, options: PrintOptions = {}): Promise<this> {

        if (this._loading) {
            return this;
        }

        this._preparePrint();
        await printReactElementAsBody(element, options);
        this._finishPrint();

        return this;
    }

    public async printReactElementAsPage(element: React.ReactElement, options: PrintOptions = {}): Promise<this> {

        if (this._loading) {
            return this;
        }

        this._preparePrint();
        await printReactElementAsPage(element, options);
        this._finishPrint();

        return this;
    }

    public addBeforeEventListener(listener: PrintQueueEventListener): this {

        this._beforeEventListener.push(listener);
        return this;
    }

    public addAfterEventListener(listener: PrintQueueEventListener): this {

        this._afterEventListener.push(listener);
        return this;
    }

    public removeAllBeforeEventListeners(): this {

        this._beforeEventListener = [];
        return this;
    }

    public removeAllAfterEventListeners(): this {

        this._afterEventListener = [];
        return this;
    }

    public removeAllEventListeners(): this {

        this.removeAllBeforeEventListeners();
        this.removeAllAfterEventListeners();
        return this;
    }

    private _preparePrint(): this {

        this._loading = true;
        this._beforeEventListener.forEach((listener: PrintQueueEventListener) => listener(this._loading));
        return this;
    }

    private _finishPrint(): this {

        this._loading = false;
        this._afterEventListener.forEach((listener: PrintQueueEventListener) => listener(this._loading));
        return this;
    }
}
