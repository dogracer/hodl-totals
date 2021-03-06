import { unitTestWrapper, assert, createTempSheet, fillInTempSheet, deleteTempSheet } from './utils.test';
import { sixPackDataRow, sixPackLooselyTypedDataRow } from '../src/types';
import validate from '../src/validate';

/**
 * test1 for validate()
 *
 */
export function test1DataValidation(): unitTestWrapper {
    return (): void => {
        const coinName = 'VAL_TEST1';
        const sheet = createTempSheet(coinName);
        const initialData: sixPackDataRow[] = [
            ['', '', 0, 0, 0, 0],
            ['', '', 0, 0, 0, 0],
            ['2017-01-01', '', 1.0, 1000, 0, 0],
            ['2017-01-02', '', 1.0, 1000, 0, 0],
            ['2017-01-02', '', 0, 0, 0.5, 2000],
            ['2017-01-01', '', 0, 0, 1.0, 2000]];

        const TestRun = function (): void {
            let result = '';
            if (typeof ScriptApp === 'undefined') {
                // jest unit test
                result = validate(initialData);
            } else if (sheet !== null) {
                // QUnit unit test
                result = validate(sheet.getRange('A:F').getValues() as sixPackLooselyTypedDataRow[]);
            }
            assert((result === ''), false, 'Test for Date Out of Order Validation : Validation Error : expected validation to fail');
        };

        fillInTempSheet(sheet, initialData as string[][]);
        TestRun();

        deleteTempSheet(sheet);
    };
}

/**
 * test2 for function validate(sheet)
 */
export function test2DataValidation(): unitTestWrapper {
    return (): void => {
        const coinName = 'VAL_TEST2';
        const sheet = createTempSheet(coinName);
        const initialData: sixPackDataRow[] = [
            ['', '', 0, 0, 0, 0],
            ['', '', 0, 0, 0, 0],
            ['2017-01-01', '', 1.0, 1000, 0, 0],
            ['2017-01-02', '', 1.0, 1000, 0, 0],
            ['2017-01-03', '', 0, 0, 0.5, 2000],
            ['2017-01-04', '', 0, 0, 2.0, 2000]];

        const TestRun = function (): void {
            let result = '';
            if (typeof ScriptApp === 'undefined') {
                // jest unit test
                result = validate(initialData);
            } else if (sheet !== null) {
                // QUnit unit test
                result = validate(sheet.getRange('A:F').getValues() as sixPackLooselyTypedDataRow[]);
            }
            assert((result === ''), false, 'Test for Coin Oversold Condition : Validation Error : expected validation to fail');
        };

        fillInTempSheet(sheet, initialData as string[][]);
        TestRun();

        deleteTempSheet(sheet);
    };
}

/**
 * test3 for function validate(sheet)
 */
export function test3DataValidation(): unitTestWrapper {
    return (): void => {
        const coinName = 'VAL_TEST3';
        const sheet = createTempSheet(coinName);
        const initialData: sixPackDataRow[] = [
            ['', '', 0, 0, 0, 0],
            ['', '', 0, 0, 0, 0],
            ['2017-01-01', '', 1.0, 1000, 0, 0],
            ['2017-01-02', '', 1.0, 1000, 0.5, 0],
            ['2017-01-03', '', 0, 0, 0.5, 2000]];

        const TestRun = function (): void {
            let result = '';
            if (typeof ScriptApp === 'undefined') {
                result = validate(initialData);
            } else if (sheet !== null) {
                // QUnit unit test
                result = validate(sheet.getRange('A:F').getValues() as sixPackLooselyTypedDataRow[]);
            }
            assert((result === ''), false, 'Test for Buy and Sell on Same Line : Validation Error : expected validation to fail');
        };

        fillInTempSheet(sheet, initialData as string[][]);
        TestRun();

        deleteTempSheet(sheet);
    };
}
