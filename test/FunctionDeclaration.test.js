import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript function declaration parser', () => {
    it('is parsing a function expression without body correctly', () => {
        resetResults();
        parseBody(parseCode('function foo(x){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'function declaration', name: 'foo', condition: '', value: ''}, {line: 1, type: 'variable declaration', name: 'x', condition: '', value: ''}]
        );
    });
    it('is parsing a function expression with body correctly', () => {
        resetResults();
        parseBody(parseCode('function foo(x){\n a = 5; \n }'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'function declaration', name: 'foo', condition: '', value: ''},
                {line: 1, type: 'variable declaration', name: 'x', condition: '', value: ''}, {line: 2, type: 'assignment expression', name: 'a', condition: '', value: '5'}]
        );
    });
});