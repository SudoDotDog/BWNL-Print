/**
 * @author WMXPY
 * @namespace Print
 * @description Util
 */

export const isMobileBrowser = (): boolean => {

    const regexp: RegExp = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i);
    return regexp.test(navigator.userAgent);
}

export const getBodyHtmlText = (body: string): string => {

    return [
        '<html>',
        '<head></head>',
        `<body>${body}</body>`,
        '</html>',
    ].join('\n');
};

export const createHiddenStyle = (): HTMLStyleElement => {

    const style: HTMLStyleElement = document.createElement('style');
    style.innerHTML = [
        '* {display: none}',
    ].join('');

    return style;
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
