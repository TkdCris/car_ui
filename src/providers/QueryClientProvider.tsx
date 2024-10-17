"use client";

import { queryClient } from "@/services/react-query";
import { QueryClientProvider as Provider } from "@tanstack/react-query";
import React, { ReactNode } from "react";

export const QueryClientProviders = ({ children }: { children: ReactNode }) => {
  return <Provider client={queryClient}>{children}</Provider>;
};
