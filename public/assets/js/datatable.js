$(function(e) {
	'use strict';
	$('#datatable1').DataTable({
		responsive: true,
		language: {
			searchPlaceholder: 'Busca...',
			sSearch: '',
			lengthMenu: '_MENU_ items/page',
		}
	});
	$('#datatable2').DataTable({
		bLengthChange: false,
		searching: false,
		responsive: true
	});
	// Select2
	$('.dataTables_length select').select2({
		minimumResultsForSearch: Infinity
	});
});