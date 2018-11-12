import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript loop statement parser', () => {
    it('is parsing a simple while statement without body', () => {
        resetResults();
        parseBody(parseCode('while(x){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'while statement', name: '', condition: 'x', value: ''}]
        );
    });
    it('is parsing a simple while statement with body', () => {
        resetResults();
        parseBody(parseCode('while(x){\n x = x + 2; \n }'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'while statement', name: '', condition: 'x', value: ''},
                {line: 2, type: 'assignment expression', name: 'x', condition: '', value: 'x + 2'}
            ]
        );
    });
});