/**
 * @author WMXPY
 * @namespace Print
 * @description Util
 */

export const getEmptyHtmlText = (): string => {

    return [
        '<html>',
        '<head></head>',
        '<body></body>',
        '</html>',
    ].join('\n');
};

export const createIFrame = (): HTMLIFrameElement => {

    const frame: HTMLIFrameElement = document.createElement('iframe');
    frame.style.border = '0px';
    frame.height = '0';
    frame.width = '0';
    frame.src = 'about:blank';

    return frame;
};

export const createCSSLink = (href: string): HTMLLinkElement => {

    const link: HTMLLinkElement = document.createElement('link');
    link.href = href;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    return link;
};
