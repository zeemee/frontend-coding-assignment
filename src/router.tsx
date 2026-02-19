import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import Header from './components/Header';
import SearchView from './components/SearchView';
import DetailView from './components/DetailView';
import bgImage from './assets/bg.jpg';

const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen flex flex-col bg-black/80">
        <div className="">
          <Header />
          <div className="max-w-[906px] mx-auto mt-16]">
          <Outlet />
          </div>
        </div>
      </div>
    </div>
  ),
});

const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || '',
  }),
  component: function SearchPage() {
    const { q } = searchRoute.useSearch();
    return <SearchView query={q} />;
  },
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/drink/$drinkId',
  component: function DetailPage() {
    const { drinkId } = detailRoute.useParams();
    return <DetailView drinkId={Number(drinkId)} />;
  },
});

export const routeTree = rootRoute.addChildren([searchRoute, detailRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
