import { HSLColor } from 'react-color';

export class IconColorProvider {
  public static readonly SATURATION = 60;

  public static readonly LIGHTNESS = 50;

  static getHSLString(hue: number): string {
    const { SATURATION: s, LIGHTNESS: l } = IconColorProvider;

    return `hsl(${hue}, ${s}%, ${l}%)`;
  }

  static hslToString = ({ h, s, l }: HSLColor): string => `hsl(${h}, ${s}%, ${l}%)`;

  static toHslColor = (hue: number): HSLColor => ({
    h: hue,
    s: IconColorProvider.SATURATION,
    l: IconColorProvider.LIGHTNESS,
  });


  static getUserHue(id: string): number {
    return IconColorProvider.getHashCode(id) % 360;
  }

  private static getHashCode(param: string) {
    let hash = 0;
    for (let i = 0, len = param.length; i < len; i++) {
      hash = param.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
}
