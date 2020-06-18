export default function truncate(
  text: string | undefined,
  length: number,
  end: string | undefined = '...'
) {
  if (isNaN(length)) {
    length = 10;
  }

  if (!end) {
    end = '...';
  }

  if (text === null) {
    return '';
  }

  if (text !== undefined && (text.length <= length || text.length - end.length <= length)) {
    return text;
  } else {
    return String(text).substring(0, length - end.length) + end;
  }
}
