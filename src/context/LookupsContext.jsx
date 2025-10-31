/* eslint-disable react-refresh/only-export-components */
import { supabase } from "@/lib/supabase-client";
import { createContext, useEffect, useState } from "react";

export const LookupsContext = createContext();

export default function LookupsProvider({ children }) {
  const [ready, setReady] = useState(false);

  async function fetchLookupsAndCountries() {
    try {
      const { data: lookupsData, error: lErr } = await supabase
        .from("lookups")
        .select("*");

      if (lErr) console.error("Lookups fetch error:", lErr);
      if (lookupsData) {
        localStorage.setItem("lookups", JSON.stringify(lookupsData));
      }

      const { data: countryData, error: cErr } = await supabase
        .from("countries")
        .select("*")
        .order("label");

      if (cErr) console.error("Countries fetch error:", cErr);
      if (countryData) {
        localStorage.setItem("countries", JSON.stringify(countryData));
      }

      localStorage.setItem("lookups_updated_at", Date.now());
    } catch (e) {
      console.error("Lookups/Countries fetch failure:", e);
    }

    setReady(true);
  }

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (!session) {
        setReady(true);
        return;
      }

      // ⚠️ Always fetch once on portal load
      await fetchLookupsAndCountries();
    }

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      init();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!ready) return null;

  return (
    <LookupsContext.Provider value={{}}>{children}</LookupsContext.Provider>
  );
}
