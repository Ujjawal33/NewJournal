import request from "supertest";
const API_DOMAIN_URL = "http://localhost:3000/api/v1";
import * as Userdal from "../../db/dal/user"
import dbInit from "../../db/init"
import "dotenv/config"
import SequliezeConntions from '../../db/config' 

dbInit()


const content:any ={
	username: "ravi",
	first_name: "teja ",
	last_name: "ravi",
	email: "ravi@gmail.com",
	password: "password",
	confirm_password: "password",
	phone_no: "1144522226789"
}

beforeAll(() => {
	const users:any = Userdal.getByEmail(content.email)
	if (users.length > 0){
		Userdal.deleteById(users[0].id)
	}
  });

//getting the all user
test("Test all User", async () => {
	const response = await request(API_DOMAIN_URL)
		.get("/users")
		.send();

	expect(response.statusCode).toBe(200);
});

// adding user 
test("signup", async () => {
	
	let response = await request(API_DOMAIN_URL)
		.post("/auth/signup")
		.send(content)
	expect(response.statusCode).toBe(201);
	

})

test("login", async () => {
	const content:any ={
		email: "smith@gmail.com",
		password: "password",
	}
	let response = await request(API_DOMAIN_URL)
		.post("/auth/login")
		.send(content)
	expect(response.statusCode).toBe(200);
	

})


afterAll(() => {
	const users:any = Userdal.getByEmail(content.email)
	if (users.length > 0){
		Userdal.deleteById(users[0].id)
	}
  });