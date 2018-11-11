import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {parseExp, resetResults} from './parser';
import {createTable} from './tableCreator';


$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        $('#parsing_table').remove();
        resetResults();
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
        for(let bodyElement of parsedCode.body){
            parseExp(bodyElement, false);
        }
        createTable();
    });
});