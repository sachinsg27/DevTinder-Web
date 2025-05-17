# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Steps

# Ep-03

## NOTE - When we use <strictMode> of react then API calls will be made twice

- When page gets refresh user should not logged out bcoz we'll still have token even if page refreshed.
- in Body => get profile of of loggedinUser via .get(profile/view) APi
- update the store using useDispatch()
- load the user details as soon as component loads i.e. using useEffect()
- If user is not loggedIn or Token gets expire then navigate to login page (using useNavigate())

- If we change urls for calling APIs then it will make an API call instead add <Link> tag to specific part (e.g profile button will lead you to profile page)

- Logout function => create onclick button handler, call /logout API using axious, dispatch action removeUser for clearing redux store, navigate to "/login"

- Add better error handling to login component
