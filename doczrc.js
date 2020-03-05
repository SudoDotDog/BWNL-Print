/**
 * @author WMXPY
 * @namespace Print
 * @description DOCZ_RC
 */

export default {
    title: 'BWNL Print',
    filterComponents: (files) =>
        files.filter(filePath => /[w-]*.(js|jsx|ts|tsx)$/.test(filePath)),
    codeSandbox: false,
    typescript: true,
}
