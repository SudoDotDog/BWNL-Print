/**
 * @author WMXPY
 * @namespace Print
 * @description Print As Page
 * @override Story
 */

import * as React from 'react';
import { printReactElementAsPage } from "../src";
import { Card } from 'antd';

export default {
    title: 'Print As Page',
};

export const Simple = () => {

    return (<button onClick={() => {
        printReactElementAsPage(<html>
            <head></head>
            <body>
                <div>Hello There</div>
            </body>
        </html>);
    }}>Print</button>);
};

export const InjectCSS = () => {

    return (<button onClick={() => {
        printReactElementAsPage((<html>
            <head>
                <link
                    href="https://cdn.jsdelivr.net/npm/antd@4.1.3/dist/antd.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </head>
            <body>
                <Card
                    title="Hello"
                >
                    Hello There
                </Card>
            </body>
        </html>), {
            needLoads: true,
        });
    }}>Print</button>);
};

export const InjectCSSWorkingOnSafari = () => {

    return (<button onClick={() => {
        printReactElementAsPage((<html>
            <head>
                <link
                    href="https://cdn.jsdelivr.net/npm/antd@4.1.3/dist/antd.min.css"
                    rel="stylesheet"
                    type="text/css"
                />
            </head>
            <body>
                <Card
                    title="Hello"
                >
                    Hello There
                </Card>
            </body>
        </html>), {
            needLoads: true,
            polyfillTimeout: 200,
        });
    }}>Print</button>);
};
