let parsingResults = [];
export {parsingResults};

function resetResults(){
    parsingResults = [];
}
export {resetResults};

function parseSmallExpressionHelp(binExp){
    if(binExp.type === 'UpdateExpression'){
        return binExp.prefix ? binExp.operator + '' + binExp.argument.name : binExp.argument.name + '' + binExp.operator;
    }
    else{
        return parseSmallExpression(binExp.left) + ' ' + binExp.operator + ' ' + parseSmallExpression(binExp.right);
    }
}

function parseSmallExpression(binExp) {
    if (binExp.type === 'Literal') {
        return binExp.value + '';
    }
    else if (binExp.type === 'Identifier') {
        return binExp.name + '';
    }
    else if (binExp.type === 'MemberExpression') {
        return parseSmallExpression(binExp.object) + '[' + parseSmallExpression(binExp.property) + ']';
    }
    else if(binExp.type === 'UnaryExpression') {
        return binExp.operator + '' + parseSmallExpression(binExp.argument);
    }
    else{
        return parseSmallExpressionHelp(binExp);
    }
}

function handleFunctionDeclaration(exp){
    const functionDeclaration = { line: exp.loc.start.line, type: 'function declaration', name: exp.id.name, condition: '', value: '' };
    parsingResults.push(functionDeclaration);
    for (let param of exp.params) {
        const parsedParam = { line: exp.loc.start.line, type: 'variable declaration', name: param.name, condition: '', value: '' };
        parsingResults.push(parsedParam);
    }
    parseExp(exp.body, false);
}

function handleBlockStatement(exp){
    for(let bodyElement of exp.body) {
        parseExp(bodyElement, false);
    }
}

function handleVariableDeclaration(exp){
    for(let bodyElement of exp.declarations){
        parseExp(bodyElement, false);
    }
}

function handleVariableDeclarator(exp){
    let value = exp.init == null ? '' : exp.init.value;
    let variableDeclaration = { line: exp.loc.start.line, type: 'variable declaration', name: exp.id.name, condition: '', value: value };
    parsingResults.push(variableDeclaration);
}

function handleExpressionStatement(exp){
    if(exp.expression.type === 'AssignmentExpression') {
        const variableAssignment = {
            line: exp.loc.start.line,
            type: 'assignment expression',
            name: parseSmallExpression(exp.expression.left),
            condition: '',
            value: parseSmallExpression(exp.expression.right)
        };
        parsingResults.push(variableAssignment);
    }
}

function handleWhileStatement(exp){
    const whileStatement = { line: exp.loc.start.line, type: 'while statement', name: '', condition: parseSmallExpression(exp.test), value: '' };
    parsingResults.push(whileStatement);
    parseExp(exp.body, false);
}

function handleForStatement(exp){
    const init = exp.init.left.name + ' ' + exp.init.operator + ' ' + exp.init.right.value;
    const test = exp.test.left.name + ' ' + exp.test.operator + ' ' + parseSmallExpression(exp.test.right);
    const condition = init + '; ' + test + '; ' + parseSmallExpression(exp.update);
    const forStatement = { line: exp.loc.start.line, type: 'for statement', name: '', condition: condition, value: '' };
    parsingResults.push(forStatement);
}

function handleIfStatement(exp, alternate){
    let typeExpression = alternate? 'else if statement' : 'if statement';
    let ifStatement = { line: exp.loc.start.line, type: typeExpression, name: '', condition: parseSmallExpression(exp.test), value: ''};
    parsingResults.push(ifStatement);
    parseExp(exp.consequent);
    if(exp.alternate != null && exp.alternate.type !== 'BlockStatement'){
        parseExp(exp.alternate, true);
    }
    else if(exp.alternate != null){
        let elseStatement = { line: exp.loc.start.line, type: 'else statement', name: '', condition: '', value: ''};
        parsingResults.push(elseStatement);
        parseExp(exp.alternate);
    }
}

function handleReturnStatement(exp){
    const returnStatement = {
        line: exp.loc.start.line,
        type: 'return statement',
        name: '',
        condition: '',
        value: parseSmallExpression(exp.argument)
    };
    parsingResults.push(returnStatement);
}

function parseExpHelpFunc2(exp, alternate){
    switch(exp.type){
    case 'WhileStatement': handleWhileStatement(exp); break;
    case 'ForStatement' : handleForStatement(exp); break;
    case 'IfStatement': handleIfStatement(exp, alternate); break;
    case 'ReturnStatement': handleReturnStatement(exp); break;
    }
}

function parseExpHelpFunc(exp, alternate){
    switch(exp.type){
    case 'BlockStatement': handleBlockStatement(exp); break;
    case 'FunctionDeclaration': handleFunctionDeclaration(exp); break;
    case 'ExpressionStatement': handleExpressionStatement(exp); break;
    default: parseExpHelpFunc2(exp, alternate);
    }
}

function parseExp (exp, alternate) {
    switch (exp.type) {
    case 'VariableDeclaration': handleVariableDeclaration(exp); break;
    case 'VariableDeclarator': handleVariableDeclarator(exp); break;
    default: parseExpHelpFunc(exp, alternate);
    }
}

function parseBody(parsedCode){
    for(let bodyElement of parsedCode.body){
        parseExp(bodyElement, false);
    }
}
export {parseBody};