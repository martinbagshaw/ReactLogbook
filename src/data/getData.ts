interface ResponseObject {
  status: number;
  json: any;
}
const checkResponse = (response: ResponseObject): any => {
  if (response.status !== 200) {
    console.log(`Error with the request! ${response.status}`);
    return;
  }
  return response.json();
};

// get user data
export const climbData = (): object | string => {
  return fetch("mb-logbook")
    .then(checkResponse)
    .catch(err => {
      throw new Error(`fetch climbsData failed ${err}`);
    });
};
