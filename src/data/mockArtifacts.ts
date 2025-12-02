import type { Artifact } from '../types/artifact';
import defaultImg from '../assets/default.png';

export const mockArtifacts: Artifact[] = [
  {
    id: 1,
    created_at: '2024-01-15T10:00:00Z',
    name: 'Древняя керамическая чаша',
    description: 'Керамическая чаша раннего средневековья, найденная при раскопках в Великом Новгороде. Датируется X-XI веком.',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Новгород'
  },
  {


    id: 2,
    created_at: '2024-02-10T10:00:00Z',
    name: 'Бронзовое украшение',
    description: 'Бронзовая подвеска X-XI века с изображением солярного символа',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Киев'
  },
  {
    id: 3,
    created_at: '2024-03-05T10:00:00Z',
    name: 'Железный наконечник стрелы',
    description: 'Наконечник стрелы периода татаро-монгольского нашествия',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Владимир'
  },
  {
    id: 4,
    created_at: '2024-01-20T10:00:00Z',
    name: 'Стеклянный браслет',
    description: 'Фрагмент стеклянного браслета XII века синего цвета',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Новгород'
  },
  {
    id: 5,
    created_at: '2024-04-12T10:00:00Z',
    name: 'Монета серебряная',
    description: 'Серебряная монета периода правления Ивана III',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Москва'
  },
  {
    id: 6,
    created_at: '2024-02-28T10:00:00Z',
    name: 'Деревянная ложка',
    description: 'Деревянная ложка XI века с резным орнаментом',
    is_active: true,
    image_url: defaultImg,
    production_center: 'Новгород'
  }
];