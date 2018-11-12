import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript return statement parser', () => {
    it('is parsing a simple return statement inside a function correctly', () => {
        resetResults();
        parseBody(parseCode('function f(){\nreturn -1;\n};'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'function declaration', name: 'f', condition: '', value: ''},
                {line: 2, type: 'return statement', name: '', condition: '', value: '-1'}
            ]
        );
    });
});