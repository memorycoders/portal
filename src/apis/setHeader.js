export const setHeaderByToken = () => {
  const accessToken = localStorage.getItem('access_token') || '';
  const timeToken = localStorage.getItem('time_access_token') || '';
  if((timeToken-Date.now())>0){
    return {token:accessToken}
  }else{
    localStorage.clear();
    window.location.href = `${window.location.origin}/login`
  }
  return ''
}