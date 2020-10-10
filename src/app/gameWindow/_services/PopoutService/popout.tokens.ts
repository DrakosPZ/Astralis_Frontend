import { InjectionToken } from '@angular/core';

export interface PopoutData {
  id: string;
  name: string;
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>('POPOUT_MODAL_DATA');

export let POPOUT_MODALS = {
};

