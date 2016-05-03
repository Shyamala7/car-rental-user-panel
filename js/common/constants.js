(function() {
    'use strict'

    var Constants = angular.module('Constants', []);

	Constants.constant('Config', {
		angUrl: 'http://localhost/car-rental-admin-login/',
        apiUrl: 'http://localhost:8000/',
        dateFormat: 'yyyy-MM-dd',
        timeFormat: 'hh:mm a',
        timeFormatForComparison: 'HH:mm'
    });
	
	
    Constants.constant('Messages', {
        Authentication: {
            Invalid: 'Invalid Credentials',
            Success: 'Successfully Signed In'
        },
		Sigup: {
            Invalid: 'Mail id Already Exist',
            Success: 'Registered Successfully',
			Error : 'Not Able to Sigup'
        },
        Research: {
            Success: 'Research successfully saved',
			Error: 'Research Not Saved',
			NoData: 'No Research Record Found',
        },
		ResearchEdit: {
            Success: 'Research updated successfully',
			Error: 'Research Not Updated',
        },
		ResearchShare: {
            Success: 'Shared successfully',
			Error: 'No Mail Id Exist',
        },
		ResearchDelete: {
            Success: 'Research Deleted successfully',
			Error: 'Research Not Deleted',
        },
        Product: {
            Success: 'Product successfully saved',
			Error: 'Product Not Saved',
        },
		ImageComment: {
            Success: 'Comment Save Successfully',
			Error: 'Comment Not Saved',
        },
		ProductDelete:{
			Success: 'Product Deleted successfully',
			Error: 'Product Not Deleted',
		},
		ProductDismiss:{
			Success: 'Product Dismissed successfully',
			Error: 'Product Not Dismissed',
		},
		ProductAccepted:{
			Success: 'Product Accepted and Research Completed successfully',
			Error: 'Product Not Accepted successfully',
		},
		ProductUpdated:{
			Success: 'Product Updated successfully',
			Error: 'Product Not Updated',
		},
		Contact:{
			Success: 'Mail has been successfully sent',
			Error: 'Mail has not been sent',
		},
    });
	
	
	Constants.constant('ToastOptions', {
        "timeOut": "4000",
		"positionClass": "toast-top-center",
    });
})();