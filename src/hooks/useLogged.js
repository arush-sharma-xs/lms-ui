const useLogged = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user ? true : false;
};

export default useLogged;
