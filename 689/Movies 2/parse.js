var trs = document.querySelectorAll('tr');

var cols = ['Rank', 'Movie', 'Release date', 'Distributor', 'Genre', 'MPAA', '2015 Gross', 'Tickets sold'];
var indicesWithInnerTags = [1, 2, 3, 4, 5];

var movies = [];

for (var i in trs) {
	var movieObj = {};
	if (i > 0 && i < trs.length - 2) {
		var tr = trs[i];
		var tds = tr.getElementsByTagName('td');

		for (var j in tds) {
			var td = tds[j];
			var text;
			if (indicesWithInnerTags.indexOf(parseInt(j)) !== -1) {
				var innerAnchor = td.getElementsByTagName('a');
				text = innerAnchor[0].innerHTML
			} else {
				text = td.innerHTML;
			}
			if (parseInt(j)) {
				movieObj[cols[parseInt(j)]] = text;
			}
		}
		movies.push(movieObj);
	}

	
}

console.log(JSON.stringify(movies))