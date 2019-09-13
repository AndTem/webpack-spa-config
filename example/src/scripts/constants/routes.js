import { MainPage, SecondaryPage } from '../pages';

const MAIN_PAGE_ROUTE = { path: '/main', component: MainPage };
const SECONDARY_PAGE_ROUTE = { path: '/secondary', component: SecondaryPage };

const MAIN_ROUTES = [MAIN_PAGE_ROUTE, SECONDARY_PAGE_ROUTE];

export { MAIN_ROUTES };
