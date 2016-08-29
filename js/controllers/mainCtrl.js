myApp.controller('ProjectMinderController', ['$scope','CRUD','Mailto',
	function($scope,CRUD,Mailto) {
      
    	var ref = CRUD.projectsInit();
	      $scope.projectItems = CRUD.setToArray(ref);
	      $scope.currentProjectItem = {};
	      $scope.newProject = {};
	      $scope.emailform = {email:'',content:''}

	      $scope.newStudents = [{name:'',num:'',email:''}];

	      $scope.alerts = 
		      [
		        { type: '', msg: '' }
		        
		      ];

	      $scope.copyrightAlert = {
	        type:'warning', msg:'This system is for IFN701 demonstration only,NOT FOR BUSINESS PURPOSE. All the QUT-LIKE styles are referenced from QUT website.'
	      	}

	      $scope.sendMail = function(mailto,subject){
	     	 var link = "mailto:"+ mailto
	             		+ "?subject=" + escape(subject)
	             		+ "&body=" + escape(document.getElementById('emailcontent').value);
		    console.log(link);
		    window.location.href = link;
     		}

	      $scope.setEmailAddress = function(originPlace,newPlace) {
	     	newPlace.email = originPlace.email;
	     	newPlace.name = originPlace.name;
	     	}

     	  $scope.addStudent = function(){
     		CRUD.addOneStudentSet($scope.newStudents);
     		}

	      $scope.addProject = function() {
	      	CRUD.addProject($scope.projectItems,$scope.newProject,$scope.newStudents);
	        $scope.alerts.type = 'success'
	        $scope.alerts.msg = 'Project record has been created successfully!'
	      };

	      $scope.clearForm = function() {
	      	CRUD.clearForm($scope);
	      };

      	  $scope.setSelectedProjectItem = function(projectId) {
    		var projectRecord = $scope.projectItems.$getRecord(projectId);
    		console.log(projectRecord);
    		CRUD.setSelectedProjectItem(projectRecord,$scope.currentProjectItem);
      	  };


      	  $scope.saveItem = function(currentProjectItem) {
		    var projectRecord = $scope.projectItems.$getRecord(currentProjectItem.id);
	      	CRUD.saveItem(projectRecord,currentProjectItem,$scope.projectItems);
	        $scope.alerts.type = 'success'
	        $scope.alerts.msg = 'Item saved successfully!'
      	
      		};

          $scope.deleteItem = function(currentProjectItem) {
		    var projectRecord = $scope.projectItems.$getRecord(currentProjectItem.id);
	      	$scope.projectItems.$remove(projectRecord)
	        $scope.alerts.type = 'danger'
	        $scope.alerts.msg = 'The project record has been successfully removed!'
      	
      		};

      // datePicker
	       $scope.today = function() {
		    $scope.startDate = new Date();
		  	};
		  	$scope.today();

		  $scope.showWeeks = true;
		  // $scope.toggleWeeks = function () {
		  //   $scope.showWeeks = ! $scope.showWeeks;
		  // };

		  $scope.clear = function () {
		    $scope.startDate = null;
		  };

	  // Disable weekend selection
		  $scope.disabled = function(date, mode) {
		    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		  };

		  $scope.toggleMin = function() {
		    $scope.minDate = ( $scope.minDate ) ? null : new Date();
		  };
		  $scope.toggleMin();

		  $scope.isOpen ={
		  	startDate:false,
		  	endDate:false //to trigger which calendar to open
		  };

		  $scope.open = function($event,opened) {
		    $event.preventDefault();
		    $event.stopPropagation();

		    $scope.isOpen[opened] = true; //click to set isOpen property of specific calendar to true, thus only this specific calendar will be opened.
		  };

		  $scope.dateOptions = {
		    'year-format': "'yy'",
		    'starting-day': 1
		  };

		  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'];
		  $scope.format = $scope.formats[0];

		  // mail-to


	      $scope.closeAlert = function(alertObject) {
		      alertObject.type = '';
		      alertObject.msg = '';
	    
	  		};

  }]);