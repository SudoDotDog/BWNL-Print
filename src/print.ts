/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Print
 */

import * as React from "react";
import { Printer } from "./print/printer";
import { renderReactElementToString } from "./render/render";

export type PrintOptions = {

    readonly needLoads?: boolean;
    readonly polyfillTimeout?: number;
};

export const printReactElement = async (
    element: React.ReactElement,
    options: PrintOptions = {},
): Promise<void> => {

    const agent: Printer = Printer.create(options);

    const renderResult: string = renderReactElementToString(element);
    await agent.printAsBody(renderResult);

    return;
};
