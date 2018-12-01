/* global define */
(function (window) {
	function myLibrary(){
		//var myVar = '';

		let myLibraryObject = {
			fullName
		};

		return myLibraryObject;

		function fullName(firstName, lastName) {
			return alert(firstName + ' ' + lastName + '!');
		}
	}
  
	if (typeof module !== 'undefined' && module.exports) {
		module.exports = myLibrary();
	}
	else if (typeof(window.customWidget) === 'undefined'){
		window.customWidget = myLibrary();
	}
})(window);