function madLib(text) {
    if (text.length == 0) return;
    // let cleanedText = cleanInput(text);
	let rs = RiString(text);

	let words = rs.words();

	// Split words with dashes (RiTa wouldn't recognize "golden-haired" as two words)
	tokenizeHyphens(words);

	console.log(words);

	let s = "";

	let posToReplace = ["nn", "nns", "jj", "jjr", "jjs", "vb", "vbd", "vbg", "vbn", "vbp", "vbz"];

	for(let i = 0; i < words.length; i++) {
		let w = words[i];
		
		if(posToReplace.includes(rs.posAt(i))) {
			let similarWords = RiTa.similarBySound(w);

			if(similarWords.length > 0) {
				w = similarWords[Math.floor(Math.random() * similarWords.length)];
			}
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