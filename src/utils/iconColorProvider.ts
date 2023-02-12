export class IconColorProvider {
  private static colors = ['#235433', '#34cfeb', '#7a34eb', '#b66c29', '#317014', '#b5193e', '#c4bb39', '#3955c4', '#78b053', '#cc5858', '#9658cc'];

  static getColor(id: string, name: string): string {
    const { colors, colors: { length }, getHashCode } = IconColorProvider;

    console.log(id, name, getHashCode(id), getHashCode(id) % length);

    return colors[getHashCode(id) % length];
  }

  static getHSLColor(id: string, saturation: number, lightness: number): string {
    return `hsl(${IconColorProvider.getHashCode(id) % 360}, ${saturation}%, ${lightness}%)`;
  }

  private static getHashCode(param: string) {
    let hash = 0;
    for (let i = 0, len = param.length; i < len; i++) {
      hash = param.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }
}
