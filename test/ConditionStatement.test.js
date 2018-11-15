import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript condition statement parser', () => {
    it('is parsing a simple condition expression with single if statement', () => {
        resetResults();
        parseBody(parseCode('if(x){}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'if statement', name: '', condition: 'x', value: ''}]
        );
    });
    it('is parsing a simple condition expression if and else if statements', () => {
        resetResults();
        parseBody(parseCode('if(x){}\nelse if(y){}\nelse{}'));
        assert.deepEqual(
            parsingResults,
            [{line: 1, type: 'if statement', name: '', condition: 'x', value: ''},
                {line: 2, type: 'else if statement', name: '', condition: 'y', value: ''}
            ]
        );
    });
});