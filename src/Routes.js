import AppliedRoute from "./components/PrivateRoute";
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

function NotFound() {
  return <h3>Not found!</h3>
}

export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={HomePage} props={childProps} />
    <AppliedRoute path="/login" exact component={LoginPage} props={childProps} />
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;