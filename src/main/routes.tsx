import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import IndexPage from '../pages/home';
import Header from '../components/layout/Header';
import { CountryIndicator } from '../pages/countryIndicator/countryIndicator';
import { RecordView } from '../pages/recordView/recordView';
import { SearchView } from '../pages/search/searchView';
import { parseRouteUrl } from '../utils/routeUrl/parseRouteUrl';
import { routeRequestToOptions } from '../utils/routeUrl/routeRequestToOptions';
import { ExampleLinks } from '../pages/exampleLinks/exampleLinks';

const Routes = (props: any) => (
  <div>
    <Header title="World Bank DataBank UI client" />
    <HashRouter>
      <Switch>
        <Route exact path="/" component={IndexPage} />
        <Route path="/countryIndicator/:options" component={CountryIndicator} />
        <Route path="/recordView/:type/:id/:options" component={RecordView} />
        <Route path="/exampleLinks" component={ExampleLinks} />
        <Route component={() => <div>Not Found</div>} />
      </Switch>
    </HashRouter>
  </div>
)
export default Routes
