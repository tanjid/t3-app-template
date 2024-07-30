import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
export function useSetUrlQuery(queryKey: string) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setUrlQuery = useCallback(
    (value: string | undefined) => {
      const params = new URLSearchParams(searchParams?.toString() ?? "");

      if (value !== undefined) {
        if (value !== "") {
          params.set(queryKey, value);
        } else {
          params.delete(queryKey);
        }
      } else {
        params.delete(queryKey);
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams, queryKey]
  );

  return setUrlQuery;
}

export function useGetUrlQuery(queryKey: string) {
  const searchParams = useSearchParams();

  const getUrlQuery = useCallback(() => {
    return searchParams?.get(queryKey) ?? undefined;
  }, [searchParams, queryKey]);

  return getUrlQuery;
}
