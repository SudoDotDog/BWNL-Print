/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Print
 */

import * as React from "react";
import { Printer } from "./print/printer";
import { renderReactElementToString } from "./render/render";

export type PrintOptions = {

    readonly injectCSSFiles?: string[];
};

export const printReactElement = async (
    element: React.ReactElement,
    options: PrintOptions = {},
): Promise<void> => {

    const agent: Printer = Printer.create();

    if (options.injectCSSFiles) {
        agent.injectCSSFiles(...options.injectCSSFiles);
    }

    const renderResult: string = renderReactElementToString(element);
    agent.write(renderResult);
    await agent.print();

    return;
};
