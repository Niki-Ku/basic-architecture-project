import React, { ReactElement, PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { HeroUIProvider } from '@heroui/system';
import { AuthContextProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import i18n from './testI18n';
import { I18nextProvider } from 'react-i18next';
import ErrorBoundary from "./context/ErrorBoundary";

const queryClient = new QueryClient();
// AuthContextProvider gives an error because of firebase
const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <HeroUIProvider>
          <MemoryRouter>
            {/* <AuthContextProvider> */}
              <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18n}>
                  {children}
                </I18nextProvider>
              </QueryClientProvider>
            {/* </AuthContextProvider> */}
          </MemoryRouter>
        </HeroUIProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
