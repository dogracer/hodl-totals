// import { expect, test } from '@jest/globals';
// import { strictEqual } from 'qunitjs' (v1.12.0-pre)

// TODO - explore using other Qunit features as seen in GAS testing
// https://script.google.com/home/projects/1cmwYQ6H7k6v3xNoFhhcASR8K2_JBJcgJ2W0WFNE8Sy3fAJzfE2Kpbh_M/edit

/* global strictEqual */
/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * wrapper for asserting a value that works in both jest and QUnit test environments
 *
 */
export function assert(value: boolean | number | string, expected: boolean | number | string, detail = ''): void {
    if (typeof ScriptApp === 'undefined') {
        // jest unit test
        test(detail, () => {
            expect(value).toBe(expected);
        });
    } else {
        // QUnit unit test
        // @ts-expect-error Cannot find QUnit assertions as no type declarations exist for this library, names are present when loaded in GAS
        strictEqual(value, expected, detail);
    }
}

/**
 * wrapper for counting number of assertions expected, that works in both jest and QUnit test environments
 *
 */
export function expectedAssertions(value: number): void {
    if (typeof ScriptApp === 'undefined') {
        // jest unit test
        expect.assertions(value);
    } else {
        // QUnit unit test
        expect(value);
    }
}

/**
 * helper function to create temp sheet
 *
 * @return refernece to sheet if running in GAS, null if running locally
 */
export function createTempSheet(): GoogleAppsScript.Spreadsheet.Sheet | null {
    // only if running in GAS environment, create a temp sheet
    if (typeof ScriptApp !== 'undefined') {
        const currentdate = new Date();
        const uniqueSheetName = `CB_TEST1(${currentdate.getMonth() + 1}/${
            currentdate.getDate()}/${
            currentdate.getFullYear()}@${
            currentdate.getHours()}:${
            currentdate.getMinutes()}:${
            currentdate.getSeconds()})`;
        return SpreadsheetApp.getActiveSpreadsheet().insertSheet(uniqueSheetName);
    }
    return null;
}

/**
 * helper function to fill data into temp sheet when running in GAS environment
 *
 */
export function fillInTempSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet | null, data: [string, number, number, number, number][]): void {
    // only if running in GAS environment, fill in columns of temp sheet
    if ((typeof ScriptApp !== 'undefined') && (sheet !== null)) {
        // fill the in the test data
        // TODO - better/faster use of google APIs for this?  numeric rows/cols, batch set 2D array?
        for (let i = 0; i < data.length; i++) {
            sheet.getRange(`A${i + 1}:E${i + 1}`).setValues([data[i]]);
        }
        SpreadsheetApp.flush();
    }
}

/**
 * helper function to create temp sheet when running in GAS environment
 *
 */
export function deleteTempSheet(sheet: GoogleAppsScript.Spreadsheet.Sheet | null): void {
    // only if running in GAS environment, clean up by removing the temp sheet
    if ((typeof ScriptApp !== 'undefined') && (sheet !== null)) {
        // clean up temp sheet
        SpreadsheetApp.getActiveSpreadsheet().deleteSheet(sheet);
    }
}