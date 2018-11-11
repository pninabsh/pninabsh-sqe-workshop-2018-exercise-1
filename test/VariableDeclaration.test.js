import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';
import {describe} from 'nyc/lib/commands/check-coverage';

describe('The javascript variable declaration parser', () => {
    it('is parsing a simple let expression with init correctly', () => {
        resetResults();
        parseBody(parseCode('let a = 5;'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'variable declaration', name: 'a', condition: '', value: '5'}]
        );
    });

    it('is parsing a simple let expression without init correctly', () => {
        resetResults();
        parseBody(parseCode('let a;'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'variable declaration', name: 'a', condition: '', value: ''}]
        );
    });
});