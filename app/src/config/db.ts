import * as mysql from 'mysql';


const connection =	mysql.createConnection({
											host     : '127.0.0.1',
											user     : 'root',
											password : '123456',
											database : 'skillup-js'
										})


export default connection;