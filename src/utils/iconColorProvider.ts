export class IconColorProvider {
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
