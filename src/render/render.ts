/**
 * @author WMXPY
 * @namespace Print_Render
 * @description Render
 */

import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";

export const renderReactElementToString = (node: React.ReactElement): string => {

    const result: string = renderToStaticMarkup(node);
    return result;
};
