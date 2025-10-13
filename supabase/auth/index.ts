import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";
import { getSession, setupAuthListener, setupUser } from "./functions";
import { keys } from "./keys";
import { AuthStateChangeTypes } from "./types";

export function useGetSession() {
  const { data: session, isPending, isError} = useQuery({
    queryKey: keys.session(),
    queryFn: getSession,
  });
  return{ session, isPending, isError };
}

export function useSetupUser() {
  const queryClient = useQueryClient();

  const { mutate, data, isPending, isError } = useMutation({
    mutationFn: setupUser,
    onSuccess: (data) => {
        console.log('successed:', data);
        queryClient.invalidateQueries({ queryKey: keys.session() });
    },
    onError: (error) => {
        Alert.alert(error.message);
    },
  });
  return{ mutate, data, isPending, isError }
}

export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleAuthStateChange: AuthStateChangeTypes = (event, _session) => {
      if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
        queryClient.invalidateQueries({ queryKey: keys.session() });
      }
    };

    const { unsubscribe } = setupAuthListener(handleAuthStateChange);

    return () => {
      unsubscribe();
    };
  }, [queryClient]);
}

export function useProtectedRoute() {
  const { session, isPending } = useGetSession();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isPending) {
      return;
    }

    const inOnboardingGroup = segments[0] === "modal";

    if (session && inOnboardingGroup) {
      router.replace("/(tabs)");
    }
    else if (!session && !inOnboardingGroup) {
      router.replace("/modal");
    }
  }, [session, isPending, segments, router]);

  return { isPending };
}