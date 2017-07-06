let data ={};
export default (state=data, action) =>{
  switch (action.type) {
    case "REQUESTED_FETCH_SUCCEEDED": return action.listData;
    case "REQUESTED_FETCH_REJECTED": return action.listData;

  }
  return data;
}