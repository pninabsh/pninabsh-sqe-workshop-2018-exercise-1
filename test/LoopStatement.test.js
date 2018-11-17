import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript while statement parser', () => {
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

describe('The javascript for statement parser', () => {
    it('is parsing a simple for statement', () => {
        resetResults();
        parseBody(parseCode('for(x = 0; x < 5; x++){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'for statement', name: '', condition: 'x = 0; x < 5; x++', value: ''}]
        );
    });

    it('is parsing a simple for statement', () => {
        resetResults();
        parseBody(parseCode('for(x = 0; x < 5; ++x){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'for statement', name: '', condition: 'x = 0; x < 5; ++x', value: ''}]
        );
    });
});

describe('The javascript for statement parser continue', () => {
    it('is parsing a simple for statement', () => {
        resetResults();
        parseBody(parseCode('for(x = 0; x < 5; x = x + 2){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'for statement', name: '', condition: 'x = 0; x < 5; x = x + 2', value: ''}]
        );
    });
});