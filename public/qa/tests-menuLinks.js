suite('Menu Link Tests', function() {
	test('page should contain links to HowTo, Team, Register & Blog page', function(){
	assert($('a[href="wieesfunktioniert"]').length);
	assert($('a[href="team"]').length);
	assert($('a[href="http://www.guesswhapp.net/#/login"]').length);
	assert($('a[href="http://guesswhapp.blogspot.de/"]').length);
	});
});