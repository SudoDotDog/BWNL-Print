/**
 * @author WMXPY
 * @namespace Print
 * @description Print
 */

import * as React from "react";
import { IPrinter } from "./print/declare";
import { MobilePrinter } from "./print/mobile";
import { Printer } from "./print/printer";
import { renderReactElementToString } from "./render/render";
import { isMobileBrowser } from "./util";

export type PrintOptions = {

    readonly fileName?: string;
    readonly polyfillMobile?: boolean;

    readonly needLoads?: boolean;
    readonly polyfillTimeout?: number;
};

export const getPrinter = (options: PrintOptions): IPrinter => {

    if (options.polyfillMobile) {
        if (isMobileBrowser()) {
            return MobilePrinter.create(options);
        }
    }
    return Printer.create(options);
};

export const printReactElementAsBody = async (
    element: React.ReactElement,
    options: PrintOptions = {},
): Promise<void> => {

    const agent: IPrinter = getPrinter(options);

    const renderResult: string = renderReactElementToString(element);
    await agent.printAsBody(renderResult);

    return;
};

export const printReactElementAsPage = async (
    element: React.ReactElement,
    options: PrintOptions = {},
): Promise<void> => {

    const agent: IPrinter = getPrinter(options);

    const renderResult: string = renderReactElementToString(element);
    await agent.printAsPage(renderResult);

    return;
};
