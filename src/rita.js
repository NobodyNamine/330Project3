function madLib(text) {
	// Get settings
	const checkBoxes = document.querySelectorAll("input[type=checkbox]");
	const radioButtons = document.querySelectorAll("input[type=radio][name=interactiontype]");

	// Get the checked radio button
	let checkedRB;
	for(let i = 0; i < radioButtons.length; i++) {
		if(radioButtons[i].checked) {
			checkedRB = radioButtons[i];
		}
	}
	
    if (text.length == 0) return;
	let rs = RiString(text);

	let words = rs.words();

	// Split words with dashes (RiTa wouldn't recognize "golden-haired" as two words)
	tokenizeHyphens(words);

	console.log(words);

	let s = "";
	let posToReplace = [];

	if(checkedRB.value == "generate_words") {
		posToReplace = ["nn", "nns", "jj", "jjr", "jjs", "vb", "vbd", "vbg", "vbn", "vbp", "vbz"];
	}
	else if(checkedRB.value == "replace_words") {
		for(let i = 0; i < checkBoxes.length; i++){
			if(checkBoxes[i].checked) {
				posToReplace.push(checkBoxes[i].value);
			}
		}

		if (posToReplace.includes("nn")) {
			posToReplace.push("nns");
		}
		if(posToReplace.includes("jj")) {
			posToReplace.push("jjr");
			posToReplace.push("jjs");
		}
		if(posToReplace.includes("vb")) {
			posToReplace.push("vbd");
			posToReplace.push("vbg");
			posToReplace.push("vbn");
			posToReplace.push("vbp");
			posToReplace.push("vbz");
		}
	}

	for(let i = 0; i < words.length; i++) {
		let w = words[i];
		let pos = rs.posAt(i);
		if(posToReplace.includes(pos)) {
			w = RiTa.randomWord(pos);
		}

		s += w + " ";
	}
	
	s = cleanText(s);
    
    return s;
}

function tokenizeHyphens(words) {
	for (let i = 0; i < words.length; i++) {
		if(words[i].includes("-")) {
			let arr = words[i].split("-");
			
			words[i] = arr[1];
			words.insert(i, "-");
			words.insert(i, arr[0]);

			i += 3;
		}
	}
}

// Cleans up unwanted spaces between punctuation
function cleanText(text) {
	let strA = text.replace(/ +(\W)/g, "$1");
	let strB = strA.replace(/-+(\W)/g, "-");

	return strB;
}

Array.prototype.insert = function ( index, item ) {
    this.splice( index, 0, item );
};

Array.prototype.remove = function ( index ) {
	this.splice( index, 1 );
}

export {madLib};