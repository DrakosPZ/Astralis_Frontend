import { InjectionToken } from '@angular/core';

export interface PopoutData {
  game_id: string;
  user_id: string;
  game_name: string;
}

export const POPOUT_MODAL_DATA = new InjectionToken<PopoutData>('POPOUT_MODAL_DATA');

export let POPOUT_MODALS = {
};

