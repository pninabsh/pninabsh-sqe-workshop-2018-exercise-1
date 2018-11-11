let parsingResults = [];
export {parsingResults};

function resetResults(){
    parsingResults = [];
}
export {resetResults};

function parseBinaryExpression(binExp) {
    if (binExp.type === 'Literal') {
        return binExp.value + '';
    }
    else if (binExp.type === 'Identifier') {
        return binExp.name + '';
    }
    else if (binExp.type === 'MemberExpression') {
        return parseBinaryExpression(binExp.object) + '[' + parseBinaryExpression(binExp.property) + ']';
    }
    else if(binExp.type === 'UnaryExpression') {
        return binExp.operator + '' + parseBinaryExpression(binExp.argument);
    }
    else{
        return parseBinaryExpression(binExp.left) + ' ' + binExp.operator + ' ' + parseBinaryExpression(binExp.right);
    }
}

function handleFunctionDeclaration(exp){
    const functionDeclaration = { line: exp.loc.start.line, type: 'function declaration', name: exp.id.name, condition: '', value: '' };
    parsingResults.push(functionDeclaration);
    for (let param of exp.params) {
        const parsedParam = {line: exp.loc.start.line, type: 'variable declaration', name: param.name, condition: '', value: '' };
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
    let variableDeclaration;
    if(exp.init == null){
        variableDeclaration = {line: exp.loc.start.line, type: 'variable declaration', name: exp.id.name, condition: '', value: ''};
    }
    else{
        variableDeclaration = {line: exp.loc.start.line, type: 'variable declaration', name: exp.id.name, condition: '', value: exp.init.value};
    }
    parsingResults.push(variableDeclaration);
}

function handleExpressionStatement(exp){
    const variableAssignment = {
        line: exp.loc.start.line,
        type: 'assignment expression',
        name: parseBinaryExpression(exp.expression.left),
        condition: '',
        value: parseBinaryExpression(exp.expression.right)
    };
    parsingResults.push(variableAssignment);
}

function handleWhileStatement(exp){
    const whileStatement = { line: exp.loc.start.line, type: 'while statement', name: '', condition: parseBinaryExpression(exp.test), value: '' };
    parsingResults.push(whileStatement);
    parseExp(exp.body, false);
}

function handleIfStatement(exp, alternate){
    let ifStatement;
    if(alternate){
        ifStatement = { line: exp.loc.start.line, type: 'else if statement', name: '', condition: parseBinaryExpression(exp.test), value: ''};
    }
    else{
        ifStatement = { line: exp.loc.start.line, type: 'if statement', name: '', condition: parseBinaryExpression(exp.test), value: ''};
    }
    parsingResults.push(ifStatement);
    parseExp(exp.consequent);
    if(exp.alternate != null){
        parseExp(exp.alternate, true);
    }
}

function handleReturnStatement(exp){
    const returnStatement = {
        line: exp.loc.start.line,
        type: 'return statement',
        name: '',
        condition: '',
        value: parseBinaryExpression(exp.argument)
    };
    parsingResults.push(returnStatement);
}

function parseExpHelpFunc2(exp, alternate){
    switch(exp.type){
    case 'WhileStatement': handleWhileStatement(exp); break;
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
    if(exp === undefined || exp === ''){
        return;
    }
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