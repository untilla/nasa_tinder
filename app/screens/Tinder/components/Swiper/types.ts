import { INasaPhoto } from '../../../../types/global';

export interface ISwiperProps {
  cards: INasaPhoto[],
  onLike?: (card: INasaPhoto) => void,
  onUndoLastLike?: (card: INasaPhoto) => void,
  onFinish?: () => void,
  undoEnableCallback?: (enabled: boolean) => void,
}

export const CARD_WIDTH = 328;
export const CARD_HEIGHT = 484;
