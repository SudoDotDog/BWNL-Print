/**
 * @author WMXPY
 * @namespace Print_Print
 * @description Declare
 */

export interface IPrinter {

    printAsBody(body: string): Promise<void>;
    printAsPage(body: string): Promise<void>;
}
