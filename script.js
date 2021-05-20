$(function() {
	var datakeys = ['name', 'phone', 'email'];

	$('a').each(function(i, el) {
		var urlobj = new URL($(el).attr('href'));
		datakeys.forEach(key => {
			if ($(el).attr('data-' + key)) {
				urlobj.searchParams.set(
					$(el).attr('data-' + key),
					localStorage.getItem('data-' + key)
				);
			}
		});
		if ($(el).attr('data-count')) {
			urlobj.searchParams.set(
				$(el).attr('data-count'),
				'1'
			);
		}
		$(el).attr('href', urlobj.href);
	});

	datakeys.forEach(key => {
		$('#data-' + key).val(localStorage.getItem('data-' + key));
	});

	$('#savedata').on('click', function() {
		datakeys.forEach(key => {
			localStorage.setItem('data-' + key, $('#data-' + key).val());
		});
		$('#saveinfo').show();
		$('#saveinfo').fadeOut(3000);
	});
});
