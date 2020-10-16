/**
 * @author WMXPY
 * @namespace Print
 * @description Print As Body
 * @override Story
 */

import * as React from 'react';
import { printReactElementAsBody } from "../src";

export default {
    title: 'Print As Body',
};

export const Simple = () => {

    return (<button onClick={() => {
        printReactElementAsBody(<div>Hello There</div>);
    }}>Print</button>);
};

export const NeedLoad = () => {

    return (<button onClick={() => {
        printReactElementAsBody(
            (<div>Hello There</div>),
            {
                needLoads: true,
            },
        );
    }}>Print</button>);
};

export const PolyfillMobile = () => {

    return (<button onClick={() => {
        printReactElementAsBody(<div>Hello There</div>, {
            polyfillMobile: true,
        });
    }}>Print</button>);
};

export const ChangeFileName = () => {

    return (<button onClick={() => {
        printReactElementAsBody(<div>Hello There</div>, {
            fileName: 'Hello World',
        });
    }}>Print</button>);
};
