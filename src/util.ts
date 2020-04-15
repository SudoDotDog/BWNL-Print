/**
 * @author WMXPY
 * @namespace Print
 * @description Util
 */

export const getBodyHtmlText = (body: string): string => {

    return [
        '<html>',
        '<head></head>',
        `<body>${body}</body>`,
        '</html>',
    ].join('\n');
};

export const createIFrame = (): HTMLIFrameElement => {

    const frame: HTMLIFrameElement = document.createElement('iframe');
    frame.style.border = '0px';
    frame.style.display = 'none';
    frame.height = '0';
    frame.width = '0';
    frame.src = 'about:blank';

    return frame;
};

export const createVisibleIFrame = (): HTMLIFrameElement => {

    const frame: HTMLIFrameElement = document.createElement('iframe');
    frame.style.border = '0px';
    frame.height = '100vh';
    frame.width = '100vw';
    frame.src = 'about:blank';

    return frame;
};
