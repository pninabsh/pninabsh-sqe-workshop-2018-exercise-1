import assert from 'assert';
import {parseBody, parsingResults, resetResults} from '../src/js/parser';
import {parseCode} from '../src/js/code-analyzer';

describe('The javascript parser', () => {
    it('is parsing an empty expression correctly', () => {
        resetResults();
        parseBody(parseCode(''));
        assert.deepEqual(
            parsingResults,
            []
        );
    });
});

