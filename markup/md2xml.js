import { argv } from 'node:process';
import fs from 'fs';
import { marked } from 'marked';

let annex = false;
let depth = 0;
let result = "";
const stack = [];

function cr(depth) {
	result += "\n" + "  ".repeat(depth);
}

function popStack(depth) {
	while (stack.length > 0) {
		let token = stack.at(-1);
		if (token.depth < depth)
			return (token.depth > 1) ? token.id : annex ? "alg" : "";
		cr(token.depth);
		let text = token.text;
		if (annex) {
			if (text == "Notes")
				result += `</emu-note>`
			else
				result += `</emu-annex>`
		}
		else {
  			if ((text == "Introduction") || text.startsWith("Changes"))	
 				result += `</emu-intro>`
 			else
				result += `</emu-clause>`
		}
		stack.pop();
	}
	return annex ? "alg" : "";
}

function textToID(text) {
	let result = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
	if (result.startsWith("-"))
		result = result.slice(1);
	if (result.endsWith("-"))
		result = result.slice(0, -1);
	return result;
}

function writeCode(token, depth) {
	cr(depth + 1);
	result += `<pre><code class="javascript">`;
	cr(0);
	result += token.text;
	cr(depth + 1);
	result += `</code></pre>`;
}

function writeItem(item, depth) {
	for (let token of item.tokens) {
		if (token.type == 'code') {
			writeCode(token, depth);
		}
		else if (token.type == 'list') {
			cr(depth);
  			result += `<ul>`
			writeItems(token, depth + 1);
 			cr(depth);
 			result += `</ul>`
		}
		else if (token.type == 'space') {
		}
		else if (token.type == 'text') {
			writeText(token.tokens);
		}
		else
			console.log(token);
	}
}

function writeItems(token, depth) {
	for (let item of token.items) {
		cr(depth);
		result += `<li>`;
		writeItem(item, depth);
		result += `</li>`;
	}
}

function writeSignature(tokens, depth, id) {
	let name = tokens[0].text;
	if (name == "constructor")
		id += "-constructor";
	else
		id += "-prototype-" + textToID(name);
// 	console.log(id);
 	result += `<emu-annex id="${id}">`
	cr(depth + 1);
	result += `<h1>`
	result += name;
	for (let i = 1 ; i < tokens.length; i++) {
		let token = tokens[i];
		if (token.type == 'text') {
			switch(token.text) {
			case '()': result += ' ( )'; break;
			case '(': result += ' ( '; break;
			case ')':  result += ' )'; break;
			case '])': result += ' ] )'; break;
			case '([':  result += ' ( [ '; break;
			case '[, ':  result += ' [, '; break;
			case '][, ': result += ' ] [, '; break;
			default: result += token.text;
			}
		}
		else if (token.type == 'em') {
			result += '_' + token.text + '_';
		}
	}
	result += `</h1>`;
}

function writeStructuredSignature(tokens, depth, id) {
	let name = tokens[0].text;
	id += "-" + textToID(name);
// 	console.log(id);
 	result += `<emu-annex id="${id}" type="abstract operation">`
	cr(depth + 1);
	result += `<h1>`
	cr(depth + 2);
	result += name;
	for (let i = 1 ; i < tokens.length; i++) {
		let token = tokens[i];
		if (token.type == 'text') {
			switch(token.text) {
			case '()': result += ' ( )'; break;
			case '(': result += ' ('; cr(depth + 3); break;
			case ')': 
			case '])': cr(depth + 2); result += ')'; break;
			case ', ': result += ','; cr(depth + 3);  break;
			
			case '([':  result += ' ('; cr(depth + 3); result += 'optional '; break;
			case '[, ': 
			case '][, ': result += ','; cr(depth + 3);  result += 'optional '; break;
			default: result += token.text;
			}
		}
		else if (token.type == 'em') {
			result += '_' + token.text + '_: a value';
		}
	}
	cr(depth + 1);
	result += `</h1>`;
	cr(depth + 1);
	result += `<dl class="header"></dl>`;
}

function writeStep(item, depth) {
	const tokens = item.tokens;
	for (let i = 0 ; i < tokens.length; i++) {
		let token = tokens[i];
		if (token.type == 'list') {
			writeSteps(token, depth + 1);
		}
		else if (token.type == 'text') {
			let offset = result.length;
			writeText(token.tokens);
			let substeps = (i + 1) < tokens.length;
			let line = result.slice(offset);
			if (substeps) {
				if (line.startsWith("If") ||line.startsWith("Else if") ) {
					result += ", then";
				}
				else if (line.startsWith("Else")) {
					result += ",";
				}
				else if (line.startsWith("For each")) {
					result += ", do";
				}
				else {
					result += ':';
				}
			}
			else if (!line.endsWith("."))
				result += '.';
		}
		else
			console.log(token);
	}	
}

function writeSteps(token, depth) {
	for (let item of token.items) {
		cr(depth);
		result += '1. ';
		writeStep(item, depth);
	}
}

function writeText(tokens, code=true) {
	for (let i = 0 ; i < tokens.length; i++) {
		let token = tokens[i];
		if (token.type == 'codespan') {
			if (code) {
				if (annex)
					result += '*' + token.text + '*';
				else
					result += '`' + token.text + '`';
			}
			else
				result += token.text;
		}
		else if (token.type == 'em') {
			if (code) {
				if (annex)
					result += '_' + token.text + '_';
				else
					result += '<i>' + token.text + '</i>';
			}
			else
				result += token.text;
		}
		else if (token.type == 'html') {
			if (token.text == "<br>")
	  			result += `<br/>`;
	  		else if (!token.text.startsWith("<!--"))
	  			console.log(token);
		}
		else if (token.type == 'link') {
			if (token.href.startsWith('#'))
				result += `<emu-xref href="${token.href}">${token.text}</emu-xref>`;
			else
				result += `<a href="${token.href}">${token.text}</a>`;
		}
		else if (token.type == 'strong') {
			if (code) {
				if (annex)
					result += token.text;
				else
					result += '<b>' + token.text + '</b>';
			}
			else
				result += token.text;
		}
		else if (token.type == 'text') {
			if (token.tokens)
				writeText(token.tokens, code);
			else
				result += token.text;
		}
		else
			console.log(token);
	}
}

let anchor = undefined;

function writeToken(token) {
	if (token.type == 'blockquote') {
 		if (annex) {
 		}
 		else {
			cr(depth);
	
			let tokens = token.tokens[0].tokens;
			if (tokens[0].text == "WARNING")
				result += `<emu-note type="editor">`
			else
				result += `<emu-note>`
			tokens = tokens.slice(1);
			tokens[0].text = tokens[0].text.slice(2);
			
			cr(depth + 1);
			result += `<p>`
			writeText(tokens);
			result += `</p>`
			cr(depth + 1);
			result += `</emu-note>`
  		}
	}
	else if (token.type == 'code') {
    	writeCode(token, depth);
	}
	else if (token.type == 'heading') {
  		depth = token.depth;
		let id = popStack(depth);
		cr(depth);
		if (annex) {
			if ((token.tokens[0].type == 'codespan') && (token.tokens.length > 1) && (token.tokens[1].text.startsWith('('))) {
				writeSignature(token.tokens, depth, id);
			}
			else if (token.tokens[0].type == 'strong') {
				writeStructuredSignature(token.tokens, depth, id);
			}
			else if (token.text == "Notes") {
				result += `<emu-note>`
			}
			else {
				let text = token.text;
				if (anchor) {
					id = anchor;
					anchor = undefined;
				}
				else
					id += "-" + textToID(text);
// 	 			console.log(id);
				result += `<emu-annex id="${ id }">`
				cr(depth + 1);
				result += `<h1>`
				writeText(token.tokens, false);
				result += `</h1>`
			}
		}
		else {
			let text = token.text;
			let i = 0;
			let code = text.charCodeAt(i);
			let numbered = false;
			if ((0x30 <= code) && (code <= 0x39)) {
				do {
					i++;
					code = text.charCodeAt(i);
				} while ((0x30 <= code) && (code <= 0x39));
				text = text.slice(i);
				numbered = true;
			}
			if (anchor) {
				id = anchor;
				anchor = undefined;
			}
			else if (id)
				id += "-" + textToID(text);
			else
				id += textToID(text);
			if ((text == "Introduction") || text.startsWith("Changes"))	
				result += `<emu-intro id="${ id }">`
			else
				result += `<emu-clause id="${ id }">`
			cr(depth + 1);
			result += `<h1>`
			if (numbered)
				result += text
			else
				writeText(token.tokens, false);
			result += `</h1>`
		}
		token.id = id;
  		stack.push(token);
  		depth++;
	}
	else if (token.type == 'html') {
		if (!token.text.startsWith("<!--"))
			console.log(token);
	}
	else if (token.type == 'list') {
		if (annex && token.ordered) {
			cr(depth);
  			result += `<emu-alg>`
			writeSteps(token, depth + 1);
			cr(depth);
  			result += `</emu-alg>`
		}
		else {
			cr(depth);
  			result += `<ul>`
			writeItems(token, depth + 1);
 			cr(depth);
 			result += `</ul>`
		}
	}
	else if (token.type == 'paragraph') {
 		let tokens = token.tokens;
 		if (token.text.startsWith('<a id="')) {
 			anchor = token.text.slice(7, token.text.lastIndexOf('"'));
 		}
 		else {
			cr(depth);
  			result += `<p>`
    		writeText(token.tokens);
  			result += `</p>`
		}
	}
	else if (token.type == 'space') {
	}
	else if (token.type == 'table') {
		cr(depth);
  		result += `<emu-table><table><tbody>`
		cr(depth + 1);
    	result += `<tr>`
		for (let column of token.header) {
    		result += `<th>`
    		writeText(column.tokens);
    		result += `</th>`
		}
    	result += `</tr>`
		for (let row of token.rows) {
			cr(depth + 1);
    		result += `<tr>`
			for (let column of row) {
	    		result += `<td>`
    			writeText(column.tokens);
    			result += `</td>`
			}
    		result += `</tr>`
		}
		cr(depth);
  		result += `</tbody></table></emu-table>`
	}
	else  {
		console.log(token);
	}
}


let md = fs.readFileSync(argv[2]).toString()

if (argv[2].indexOf("annex") >= 0) {
	annex = true;
	md = md.replace(/([0-9]+)\.[\s]*\t/g, "$1. ");
}


const tokens = marked.lexer(md);
for (let token of tokens) {
	writeToken(token);
}
popStack(0);

result = result.replaceAll("&amp;", "&");
result = result.replaceAll("&lt;", "<");
result = result.replaceAll("/&gt;", ">");
result = result.replaceAll("&quot;", "\"");
result = result.replaceAll("&#39;", "'");

fs.writeFileSync(argv[3], result)
