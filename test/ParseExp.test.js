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

    it('is parsing an literal expression correctly', () => {
        resetResults();
        parseBody(parseCode('5'));
        assert.deepEqual(
            parsingResults,
            []
        );
    });
});


describe('The javascript parser', () => {
    it('is parsing a class expression that we dont handle', () => {
        resetResults();
        parseBody(parseCode('class name{}'));
        assert.deepEqual(
            parsingResults,
            []
        );
    });
});