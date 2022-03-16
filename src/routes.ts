const ROOT = process.env.NODE_ENV === 'development' ? '' : '/react-drag';

const routes = {
  root: ROOT,
  grid: ROOT + '/grid',
};

export const getWashedPathname = (pathname: string) => {
  return process.env.NODE_ENV === 'development' ? pathname : pathname.replace(ROOT, '');
};

export default routes;
