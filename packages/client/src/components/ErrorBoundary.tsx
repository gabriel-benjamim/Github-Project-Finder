import React, { Component, ErrorInfo } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import ErrorPage from '../pages/ErrorPage';

type StateT = {
  hasError: boolean;
};

type Props = {
  fallbackJsx?: any; //ReactNode;
} & WithTranslation;

class ErrorBoundary extends Component<Props, StateT> {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    //TODO: Send errorInfo to an Error Tracking Tool, ex: Sentry or Rollbar
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      const { t, fallbackJsx } = this.props;
      if (fallbackJsx != null) {
        return fallbackJsx;
      }
      return <ErrorPage title={t('ERROR_BOUNDARY__TITLE')}>{t('ERROR_BOUNDARY__TEXT')}</ErrorPage>;
    }
    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
