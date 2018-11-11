import $ from 'jquery';
import {parsingResults} from './parser';

function createTable(){
    const ResultsList = $('#ResultsList');
    let content = '<table align="center" class="table table-bordered" id="parsing_table">';
    content += '<thead class="thead-dark" align="center"><tr>';
    content += '<th>Line</th><th>Type</th><th>Name</th><th>Condition</th><th>Value</th>';
    content += '</tr></thead><tbody>';
    $.each(parsingResults, function () {
        content += '<tr align="center">';
        content += '<td>' + this.line + '</td>';
        content += '<td>' + this.type + '</td>';
        content += '<td>' + this.name + '</td>';
        content += '<td>' + this.condition + '</td>';
        content += '<td>' + this.value + '</td>';
        content += '</tr>';
    });
    content += '</tbody></table>';
    ResultsList.append(content);
}
export {createTable};