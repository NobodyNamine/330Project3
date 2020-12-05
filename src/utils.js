function compareRatings(first,second) {
    if (first.score == second.score) {
        return 0;
    }
    if (first.score < second.score) {
        return 1;
    }
    return -1;
}

function madLib(text) {
    if (text.length == 0) return;
    // let cleanedText = cleanInput(text);
	let rs = RiString(text);

	let words = rs.words();

	let s = "";

	let posToReplace = ["nnp", "nn", "nns", "jj", "jjr", "jjs", "vb", "vbd", "vbg", "vbn", "vbp", "vbz"];

	for(let i = 0; i < words.length; i++) {
		let w = words[i];

		if(RiTa.isPunctuation(w)) continue;
		
		if(posToReplace.includes(rs.posAt(i))) {
			let similarWords = RiTa.similarBySound(w);

			if(similarWords.length > 0) {
				w = similarWords[Math.floor(Math.random() * similarWords.length)];
			}
		}

		if(RiTa.isPunctuation(words[i+1])) w += words[i+1];
		s += w + " ";
    }
    
    return s;
}

// Removes the non-letter characters from string and replaces them with a space
function cleanInput(text) {
    text = text.replace(/\W/g," ");

	return text;
}

export {compareRatings, madLib};