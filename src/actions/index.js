import {query} from '../services/getData.js';

export const getData = (data) =>{
    url = 'rewards?PageNumber=' + data.pageNumber + '&PageSize=' + data.pageSize +
          '&CreatedAfter=' + data.startDate + '&CreatedBefore=' + data.endDate;
  return dispatch => {
		query(url, "GET", {})
		.then(res => {
			dispatch({ type: 'REQUESTED_FETCH_SUCCEEDED', listData: {data:res.Rewards,status:true}});
		})
		.catch(error => {
			dispatch({ type: 'REQUESTED_FETCH_REJECTED' })
			console.log(error)
		})
	}
}