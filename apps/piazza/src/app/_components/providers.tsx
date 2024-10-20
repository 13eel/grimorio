import { Provider } from "jotai";

import { TRPCReactProvider } from "~/trpc/react";

const Providers = (props: { children: React.ReactNode }) => {
  return (
    <TRPCReactProvider>
      <Provider>{props.children}</Provider>
    </TRPCReactProvider>
  );
};

export { Providers };
