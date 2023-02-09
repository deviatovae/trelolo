export class IconColorProvider {
  private static colors = ['#235433', '#34cfeb', '#7a34eb', '#b66c29', '#317014', '#b5193e', '#c4bb39', '#3955c4', '#78b053', '#cc5858', '#9658cc'];

  private static i = 0;

  static getColor(): string {
    return IconColorProvider.colors[IconColorProvider.i++ % IconColorProvider.colors.length];
  }
}
