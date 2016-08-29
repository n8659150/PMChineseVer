myApp.factory('CRUD', 
  ['$wilddogArray','WILDDOG_URL',
  function($wilddogArray, WILDDOG_URL) {

  var ref = new Wilddog(WILDDOG_URL + "projects");
  return {

    projectsInit: function() {
      return ref;
    }, //init project db
    setToArray: function(ref) {
      var projectItems = $wilddogArray(ref);
      return projectItems;
    },
    addProject: function(projectArray,newProject,studentArray){
    	projectArray.$add({
      		name: newProject.name,
      		unit: newProject.unit,
      		supervisorFirstName: newProject.supervisorFirstName,
      		supervisorLastName: newProject.supervisorLastName,
      		students: studentArray,
      		startDate: newProject.startDate.toString(),
      		endDate: newProject.endDate.toString(),
      		status: newProject.status,
      		description: newProject.description
      	}).then(function(ref){
      		var id = ref.key();
  			console.log("added record with id " + id);
  			// console.log(projectArray.$indexFor(id)); 
  			// projectIndex = projectArray.$indexFor(id);
      	});
    },

    addOneStudentSet: function(newStudents) {
	 	newStudents.push({name:'',num:'',email:''});
    },
    setSelectedProjectItem: function(serverItem,localItem) {
    	localItem.id = serverItem.$id;
		localItem.name = serverItem.name;
		localItem.unit = serverItem.unit;
		localItem.supervisorFirstName = serverItem.supervisorFirstName;
		localItem.supervisorLastName = serverItem.supervisorLastName;
		localItem.students = serverItem.students;
		localItem.startDate = serverItem.startDate;
		localItem.endDate = serverItem.endDate;
		localItem.status = serverItem.status;
		localItem.description = serverItem.description;

    },
    saveItem: function(serverItem,localItem,projectArray) {
    	serverItem.name = localItem.name;
      	serverItem.unit = localItem.unit;
      	serverItem.supervisorFirstName = localItem.supervisorFirstName;
      	serverItem.supervisorLastName = localItem.supervisorLastName;
		serverItem.students = localItem.students;
		serverItem.startDate = localItem.startDate.toString();
		serverItem.endDate = localItem.endDate.toString();
		serverItem.status = localItem.status;
		serverItem.description = localItem.description;
		projectArray.$save(serverItem).then(function(){
		console.log(serverItem);
		});
    },
    clearForm: function(scope){
    	scope.newProject = {};
      	scope.newStudents = [{name:'',num:'',email:''}];
    } 

    

  };

}]); //factory

