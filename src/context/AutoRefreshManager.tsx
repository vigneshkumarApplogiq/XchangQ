import React, { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { useRates } from './RatesContext';

/** Periodically refresh rates when auto-refresh is enabled */
export function AutoRefreshManager() {
  const { settings, isReady } = useApp();
  const { refresh, isOnline } = useRates();
  const refreshRef = useRef(refresh);
  refreshRef.current = refresh;

  useEffect(() => {
    if (!isReady || !settings.autoRefresh || !isOnline) return;

    const ms = settings.refreshIntervalMinutes * 60 * 1000;
    const id = setInterval(() => {
      refreshRef.current();
    }, ms);

    return () => clearInterval(id);
  }, [
    isReady,
    settings.autoRefresh,
    settings.refreshIntervalMinutes,
    isOnline,
  ]);

  return null;
}
