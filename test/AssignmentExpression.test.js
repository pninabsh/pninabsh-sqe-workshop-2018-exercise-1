import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript assignment expression parser', () => {
    it('is parsing a simple assignment expression with literal correctly', () => {
        resetResults();
        parseBody(parseCode('x[5] = 5;'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'assignment expression', name: 'x[5]', condition: '', value: '5'}]
        );
    });
    it('is parsing a simple assignment expression with binary expression correctly', () => {
        resetResults();
        parseBody(parseCode('a = n - 1;'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'assignment expression', name: 'a', condition: '', value: 'n - 1'}]
        );
    });
});