window.LanguagePackages= {
	"zh":{
		
	},
	"en":{
		"COM_MSG00": "Back",
		"COM_MSG01": "Save",
		"COM_MSG02": "Submit",
		"COM_MSG03": "Yes",
		"COM_MSG04": "No",
		"COM_MSG05": "Start",	
		"COM_MSG06": "Finish",		
		"COM_MSG07": "No photo",
		"COM_MSG08": "View photo",
		"COM_MSG09": "Checklist is empty",
		"COM_MSG10": "Next",
		"COM_MSG11": "Accept",
		"COM_MSG12": "Loading...",
		"COM_MSG13": "Search",
		"COM_MSG14": "OK",
		"COM_MSG15": "Take Photo",
		"COM_MSG16": "Upload Photo",
		"COM_MSG17": "Cancel",
		"COM_MSG18": "Edit Image",


		"PROMPT_MSG000": "Activate this option if you are currently driver of selected asset",
		"PROMPT_MSG001": "Quit from this checklist?",
		"PROMPT_MSG002": "At the end of the trip, please go to the home screen and close the current trip.",
		"PROMPT_MSG003": "IMPORTANT: You will not be able to start a new trip if you do not close the previous one.",
		"PROMPT_MSG004": "Select Trip Type, please.",
		"PROMPT_MSG005": "You have no Trips yet.",
		"PROMPT_MSG006": "Are you sure you want to close the application?",
		"PROMPT_MSG007": "The login(email) or password you entered is incorrect.",
		"PROMPT_MSG008": "An issue has been detected, please try again later or contact our support team",
		"PROMPT_MSG009": "Nothing found",
		"PROMPT_MSG010": "Select Checklist, please",
		"PROMPT_MSG011": "Select Vehicle, please",
		"PROMPT_MSG012": "Error",
		"PROMPT_MSG013": "Camera API not supported",
		"PROMPT_MSG014": "Error taking picture",
		"PROMPT_MSG015": "Method Not Found",

		"PROMPT_MSG023": "Data not saved.",


		"HOME_MSG00": "Home",
		"HOME_MSG01": "Select Vehicle", 
		"HOME_MSG02": "Select Checklist",
		"HOME_MSG03": "Driving This Car",
		"HOME_MSG04": "Do not start trip",
		"HOME_MSG05": "Current Trip",
		"HOME_MSG06": "Vehicle Name",
		"HOME_MSG07": "Started",

		"LOGIN_MSG01": "The login(email) or password you entered is incorrect.",
		"LOGIN_MSG02": "Login Name / Email",
		"LOGIN_MSG03": "Password",
		"LOGIN_MSG04": "Sign In",
		"LOGIN_MSG05": "Forgot password?",
		"LOGIN_MSG06": "QT User",
		"LOGIN_MSG07": "Other",

		"PASSWORD_RESET_MSG00": "Please, enter your registered E-mail address",
		"PASSWORD_RESET_MSG01": "Please, enter E-mail",
		"PASSWORD_RESET_MSG02": "Please, enter Verification Code that we have sent to your Email address",
		"PASSWORD_RESET_MSG03": "Verification Code",
		"PASSWORD_RESET_MSG04": "Please, enter Verification Code",
		"PASSWORD_RESET_MSG05": "Please, enter New Password(minimum 6 characters)",
		"PASSWORD_RESET_MSG06": "New Password",
		"PASSWORD_RESET_MSG07": "Incorrect E-mail",
		"PASSWORD_RESET_MSG08": "Incorrect Verification Code",
		"PASSWORD_RESET_MSG09": "Repeat Password",
		"PASSWORD_RESET_MSG10": "Passwords do not match",		
		"PASSWORD_RESET_MSG11": "Incorrect Password, please use another",	
		"PASSWORD_RESET_MSG12": "Success! Password changed",	
		"PASSWORD_RESET_MSG13": "E-mail address",		
		"PASSWORD_RESET_MSG14": "Code",	
		"PASSWORD_RESET_MSG15": "Password",

		"MENU_MSG00": "Home",
		"MENU_MSG01": "My Trips",
		"MENU_MSG02": "Fault History",
		"MENU_MSG03": "User Settings",
		"MENU_MSG04": "Logout",
		"MENU_MSG06": "",
		"MENU_MSG07": "",

		"QUESTIONS_MSG00": "Fail",
		"QUESTIONS_MSG01": "N/A",
		"QUESTIONS_MSG02": "Pass",
		"QUESTIONS_MSG03": "Select Fail Reason",
		"QUESTIONS_MSG04": "Notes",
		"QUESTIONS_MSG05": "Step",
		"QUESTIONS_MSG06": "of",
		"QUESTIONS_MSG07": "Summary",
		"QUESTIONS_MSG08": "Failed Items",
		"QUESTIONS_MSG09": "N/A Items",
		"QUESTIONS_MSG10": "Passed Items",
		"QUESTIONS_MSG11": "Personal Trip",
		"QUESTIONS_MSG12": "Business Trip",
		"QUESTIONS_MSG13": "Diagnostic",

		"TRIPS_MSG00": "Your Trip Raiting",
		"TRIPS_MSG01": "Distance",
		"TRIPS_MSG02": "Time",
		"TRIPS_MSG03": "Max Speed",
		"TRIPS_MSG04": "Average Speed",
		"TRIPS_MSG05": "Fuel Used",
		"TRIPS_MSG06": "Info",
		"TRIPS_MSG07": "PlayBack",
		"TRIPS_MSG08": "Start",
		"TRIPS_MSG09": "Finish",
		"TRIPS_MSG10": "Slow",
		"TRIPS_MSG11": "Fast",

		"FAULTS_MSG00": "Fault Details",
		"FAULTS_MSG01": "Date",
		"FAULTS_MSG02": "Fail Reason",
		"FAULTS_MSG03": "Type",
		"FAULTS_MSG04": "Notes",

		"USER_SETTINGS_MSG00": "Profile",
		"USER_SETTINGS_MSG01": "Password",
		"USER_SETTINGS_MSG02": "First name",
		"USER_SETTINGS_MSG03": "Last name",
		"USER_SETTINGS_MSG04": "E-mail",
		"USER_SETTINGS_MSG05": "Phone number",
		"USER_SETTINGS_MSG06": "Current Password",
		"USER_SETTINGS_MSG07": "New Password",
		"USER_SETTINGS_MSG08": "Confirm Password",

		
	},
	"ua":{
		
	},
	"ru":{
		
	},
	"es":{
		
	}
};
var lang = navigator.browserLanguage ? navigator.browserLanguage.toLowerCase() : navigator.language.toLowerCase();
if(lang.indexOf("en") >= 0) {
	lang = "en";
}
else if(lang.indexOf("es") >= 0) {
	lang = "en";
}
else if(lang.indexOf("zh") >= 0) {
	lang = "en";
}	
else if(lang.indexOf("ua") >= 0 || lang.indexOf("uk") >= 0) {
	//lang = "ua";
	lang = "en";	
}
else if(lang.indexOf("ru") >= 0) {
	//lang = "ru";
	lang = "en";	
}	
else {
	lang = "en";		
}
window.LANGUAGE = LanguagePackages[lang];
if(!Template7.global)
{
	Template7.global = {};
}

Template7.global.LANGUAGE = window.LANGUAGE;