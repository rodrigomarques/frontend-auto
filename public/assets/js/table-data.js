$(function(e) {
	
	//______Basic Data Table
	$('#basic-datatable').DataTable({
		language: {
			searchPlaceholder: 'Busca...',
			sSearch: '',
		}
	});
	

	//______Basic Data Table
	$('#responsive-datatable').DataTable({
		scrollX: "100%",
		language: {
			searchPlaceholder: 'Busca...',
			sSearch: '',
		}
	});

	//______File-Export Data Table
	var table = $('#file-datatable').DataTable({
		buttons: [ 'copy', 'excel', 'pdf', 'colvis' ],
		scrollX: "100%",
		language: {
			searchPlaceholder: 'Busca...',
			sSearch: '',
		}
	});
	table.buttons().container()
	.appendTo( '#file-datatable_wrapper .col-md-6:eq(0)' );	

	//______Delete Data Table
	var table = $('#delete-datatable').DataTable({
		language: {
			searchPlaceholder: 'Busca...',
			sSearch: '',
		}
	}); 
    $('#delete-datatable tbody').on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );
    $('#button').click( function () {
        table.row('.selected').remove().draw( false );
    } );

	//______Select2 
	$('.select2').select2({
		minimumResultsForSearch: Infinity
	});

});