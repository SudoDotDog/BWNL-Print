/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Print
 */

import * as React from "react";
import { renderReactElementToString } from "../render/render";

export const printReactElement = (element: React.ReactElement): Promise<void> => {

    return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

        const renderResult: string = renderReactElementToString(element);
        console.log(renderResult);
    });
};
