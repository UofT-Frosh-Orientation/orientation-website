import { Text } from './Text';

export const TextParagraph = () => (
  <Text type={'paragraph'}>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore libero officiis quibusdam. Ad
    doloremque eos ipsa labore laborum obcaecati ratione.
  </Text>
);
export const TextInfo = () => <Text type={'info'}>Lorem ipsum dolor sit amet.</Text>;
export const TextAccent = () => <Text type={'accent'}>Lorem ipsum dolor sit amet.</Text>;
export const TextAccentSmall = () => <Text type={'accent-small'}>Lorem ipsum dolor sit amet.</Text>;
export const TextAccentSecondary = () => (
  <Text type={'accent-secondary'}>Lorem ipsum dolor sit amet.</Text>
);
export const TextAccentSmallSecondary = () => (
  <Text type={'accent-small-secondary'}>Lorem ipsum dolor sit amet.</Text>
);
export const TextLink = () => (
  <Text type={'link'} onClick={() => alert('Clicked!')} href={'https://www.google.com'}>
    Google
  </Text>
);
