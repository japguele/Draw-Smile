module.exports = {
	getGoogleApi: function getGoogleApi() {



	var googleapis = require('googleapis');  

    var OAuth2 = googleapis.auth.OAuth2;  

    var folderID                    = '0ByBlhvMTqsYafmh1dlQwcEgzeHp1TW91TWhaYVIzMnpmT3lTMkNiRDhsQUlFR2dKM1YzdU0';

    var SERVICE_ACCOUNT_EMAIL       = '154170383487-575b5vrcbbq0n1fca42hqunhibskpjlt@developer.gserviceaccount.com';  
    var CLIENT_ID                   = '154170383487-575b5vrcbbq0n1fca42hqunhibskpjlt.apps.googleusercontent.com';  
    var SERVICE_ACCOUNT_KEY_FILE    = 'drawme-0121e0201c86.json';  
    var SCOPE = ['https://www.googleapis.com/auth/drive'];

    var jwt = new googleapis.auth.JWT(  
        SERVICE_ACCOUNT_EMAIL,    
        SERVICE_ACCOUNT_KEY_FILE,       
        null,
        SCOPE
    );
    return googleapis;
		
	}
}
