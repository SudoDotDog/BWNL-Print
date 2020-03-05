/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Print
 */

import * as React from "react";
import { renderReactElementToString } from "../render/render";
import { PrintFrameAgent } from "./frame";

export const printReactElement = (element: React.ReactElement): Promise<void> => {

    const agent: PrintFrameAgent = PrintFrameAgent.create();

    return new Promise<void>((resolve: () => void, reject: (reason: any) => void) => {

        try {

            const renderResult: string = renderReactElementToString(element);

            agent.injectCSS('https://cdn.jsdelivr.net/npm/antd@4.0.1/dist/antd.min.css');
            agent.write(renderResult);
            agent.print();

            resolve();
        } catch (error) {

            reject(error);
        }
        return;
    });
};
