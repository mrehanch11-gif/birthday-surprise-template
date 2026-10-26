import { TEMPLATE_CONFIG } from '../config';
import type { LongDistanceInfo } from '../types';

export const INITIAL_LD_INFO: LongDistanceInfo = {
  herName: TEMPLATE_CONFIG.recipientName,
  hisName: TEMPLATE_CONFIG.senderName,
  herCity: TEMPLATE_CONFIG.recipientCity,
  hisCity: TEMPLATE_CONFIG.senderCity,
  distanceKm: 0,
  age: TEMPLATE_CONFIG.recipientAge,
  yearsTogether: TEMPLATE_CONFIG.yearsTogether,
};
