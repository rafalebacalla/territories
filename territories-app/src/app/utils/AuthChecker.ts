export function isLoggedIn() {
  let user = localStorage.getItem('user');
  return !!user ? true : false;
}
