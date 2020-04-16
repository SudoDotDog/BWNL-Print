/**
 * @author WMXPY
 * @namespace Print
 * @description Queue
 */

import { PrintOptions, printReactElementAsBody, printReactElementAsPage } from "./print";

export class PrintQueue {

    public static create(): PrintQueue {

        return new PrintQueue();
    }

    private _loading: boolean;

    private constructor() {

        this._loading = false;
    }

    public get loading(): boolean {

        return this._loading;
    }

    public async printReactElementAsBody(element: React.ReactElement, options: PrintOptions = {}): Promise<this> {

        await printReactElementAsBody(element, options);
        return this;
    }

    public async printReactElementAsPage(element: React.ReactElement, options: PrintOptions = {}): Promise<this> {

        await printReactElementAsPage(element, options);
        return this;
    }
}
