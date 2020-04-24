import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { createGlobalStyle, ThemeProvider } from "./design-system/styled";
import theme from "./design-system/theme";
import { ScrollToTopControlller } from "./components/ScrollToTopController";
import { NotImplemented } from "./screens/NotImplemented";
import { Medication } from "./screens/Medication";
import { TodaysSchedule } from "./screens/TodaysSchedule";
import { MedicationDetail } from "./screens/MedicationDetail";
import { MedicationRequestDetail } from "./screens/MedicationRequestDetail";
import { Notifications } from "./screens/Notifications";
import { NotificationDetail } from "./screens/NotificationDetail";
import { Help } from "./screens/Help";
import { Settings } from "./screens/Settings";
import { SettingsPatient } from "./screens/SettingsPatient";
import { SettingsPatientPersonalInformation } from "./screens/SettingsPatientPersonalInformation";
import { RequestPrescriptionStart } from "./screens/RequestPrescriptionStart";
import { RequestPrescriptionSelectMedication } from "./screens/RequestPrescriptionSelectMedication";
import { RequestPrescriptionSelectAddress } from "./screens/RequestPrescriptionSelectAddress";
import { RequestPrescriptionSelectPayment } from "./screens/RequestPrescriptionSelectPayment";
import { RequestPrescriptionReview } from "./screens/RequestPrescriptionReview";
import { RequestPrescriptionSuccess } from "./screens/RequestPrescriptionSuccess";
import { ProtoSetup } from "./screens/ProtoSetup";
import { SendAvailableItemsStart } from "./screens/SendAvailableItemsStart";
import { SendAvailableItemsReview } from "./screens/SendAvailableItemsReview";
import { SendAvailableItemsSuccess } from "./screens/SendAvailableItemsSuccess";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Echo Icons';
    src: url('/fonts/Echo Icons.woff2') format('woff2'), url('/fonts/Echo Icons.woff') format('woff'), url('/fonts/Echo Icons.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    padding: 0;
    margin: 0;
  }

  *, *:before, *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(p) => p.theme.colors.gray10};
    font-family: ${theme.fonts.body};
    font-weight: 400;
    font-size: 16px;
    color: ${(p) => p.theme.colors.gray90};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyles />
          <Router>
            <ScrollToTopControlller />
            <Switch>
              <Route path="/" component={ProtoSetup} exact={true} />
              <Route path="/medication" component={Medication} exact={true} />
              <Route path="/help" component={Help} exact={true} />
              <Route path="/settings" component={Settings} exact={true} />
              <Route
                path="/notifications"
                component={Notifications}
                exact={true}
              />
              <Route
                path="/medication/schedule"
                component={TodaysSchedule}
                exact={true}
              />
              <Route
                path="/medication/:medicationId"
                component={MedicationDetail}
                exact={true}
              />
              <Route
                path="/medication/:medicationId/request"
                component={MedicationRequestDetail}
                exact={true}
              />
              <Route
                path="/notifications/:notificationId"
                component={NotificationDetail}
                exact={true}
              />
              <Route
                path="/settings/patient/:patientId"
                component={SettingsPatient}
                exact={true}
              />
              <Route
                path="/settings/patient/:patientId/personal-information"
                component={SettingsPatientPersonalInformation}
                exact={true}
              />
              <Route
                path="/request-prescription"
                component={RequestPrescriptionStart}
                exact={true}
              />
              <Route
                path="/request-prescription/select-medication"
                component={RequestPrescriptionSelectMedication}
                exact={true}
              />
              <Route
                path="/request-prescription/select-address"
                component={RequestPrescriptionSelectAddress}
                exact={true}
              />
              <Route
                path="/request-prescription/select-payment"
                component={RequestPrescriptionSelectPayment}
                exact={true}
              />
              <Route
                path="/request-prescription/review"
                component={RequestPrescriptionReview}
                exact={true}
              />
              <Route
                path="/request-prescription/success"
                component={RequestPrescriptionSuccess}
                exact={true}
              />
              <Route
                path="/request-partial"
                component={SendAvailableItemsStart}
                exact={true}
              />
              <Route
                path="/request-partial/review"
                component={SendAvailableItemsReview}
                exact={true}
              />
              <Route
                path="/request-partial/success"
                component={SendAvailableItemsSuccess}
                exact={true}
              />
              <Route path="*" component={NotImplemented} exact={true} />
            </Switch>
          </Router>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
