import http from 'k6/http';
import { check, sleep } from 'k6';



// Function for POST operation
export function testPostUser() {
  const payload = JSON.stringify({
    name: 'John Doe',
    job: 'Software Engineer',
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  let response = http.post('https://reqres.in/api/users', payload, { headers: headers });

  check(response, {
    'POST Status is 201': (r) => r.status === 201,
    'POST Contains Expected Field': (r) => JSON.parse(r.body).hasOwnProperty('id'),
    'POST Contains Expected Name Field': (r) => JSON.parse(r.body).hasOwnProperty('name'),
    'POST Contains Expected Job Field': (r) => JSON.parse(r.body).hasOwnProperty('job'),
  });

  sleep(1);
}

// Function for PUT operation
export function testPutUser() {

  const payload = JSON.stringify({
    name: 'Updated Name',
    job: 'Senior Software Engineer',
  });

  const headers = {
    'Content-Type': 'application/json',
  };

  let response = http.put(`https://reqres.in/api/users/2`, payload, { headers: headers });

  check(response, {
    'PUT Status is 200': (r) => r.status === 200,
    'PUT Contains Expected Field': (r) => JSON.parse(r.body).hasOwnProperty('updatedAt'),
    'PUT Contains Expected Name Field': (r) => JSON.parse(r.body).hasOwnProperty('name'),
    'PUT Contains Expected Job Field': (r) => JSON.parse(r.body).hasOwnProperty('job'),
  });

  sleep(1);
}

// Default export function, which orchestrates the test
export default function () {
  // Call your test functions here
  testPostUser();
  testPutUser();
}