export const fetchUser = () =>{
  return localStorage.getItem('user')!== undefined ?localStorage.getItem('user'):localStorage.clear()
}

export const fetchUserId = () =>{
  return localStorage.getItem('client_id')!== undefined ?localStorage.getItem('client_id'):localStorage.clear()
}